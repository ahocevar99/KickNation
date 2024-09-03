import { Router } from "express";
import { User } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import fetch from 'node-fetch';
import * as functions from '../functions.js';
export const router = Router();
import * as gameLogic from '../gameLogic.js'


const protect = asyncHandler (async (req,res,next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith ('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, 'verySecretKey')
      req.user = await User.findOne({ username: decoded.username }).select ('password')
      next()
    } catch (err){
      console.log (err)
      res.status (404)
      throw new Error ('Not authorized')
    }
  }
  if (!token){
    res.status(401)
    throw new Error ('No token')
  }
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username: username }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, response) => {
          if (err) {
            res.json("Wrong username or password");
          } else if (response) {
            const token = jwt.sign ({
                username: user.username
            }, 'verySecretKey', {expiresIn: '2h'})

            req.user = user;
            res.status(202).header('Authorization', `Bearer ${token}`).json({ message: "success", user: { username: user.username, clubName: user.clubName } });
          } else {
            res.json("Wrong username or password");
          }
        });
      } else {
        res.json("Wrong username or password");
      }
    });
  });

router.post("/register", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password || !req.body.clubName) {
      return res.status(400).send("Input all fields");
    }
    if (
      req.body.username.length < 6 ||
      req.body.password.length < 6 ||
      req.body.clubName.length < 6
    ) {
      return res.send("Minimal lentgh of all inputs is 6");
    }
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.send('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const names = [];
    
    while (names.length < 11) {
      const newPlayerData = await functions.newPlayer();
      names.push(newPlayerData);
    }

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    const newUser = {
      username: req.body.username,
      password: hashedPassword,
      clubName: capitalizeFirstLetter(req.body.clubName), 
      squad: [
        {playerName: names[0].name, country: names[0].country, rating: 50, position: "GK"},
        {playerName: names[1].name, country: names[1].country, rating: 50, position: "DEF"},
        {playerName: names[2].name, country: names[2].country, rating: 50, position: "DEF"},
        {playerName: names[3].name, country: names[3].country, rating: 50, position: "DEF"},
        {playerName: names[4].name, country: names[4].country, rating: 50, position: "DEF"},
        {playerName: names[5].name, country: names[5].country, rating: 50, position: "MID"},
        {playerName: names[6].name, country: names[6].country, rating: 50, position: "MID"},
        {playerName: names[7].name, country: names[7].country, rating: 50, position: "MID"},
        {playerName: names[8].name, country: names[8].country, rating: 50, position: "ATT"},
        {playerName: names[9].name, country: names[9].country, rating: 50, position: "ATT"},
        {playerName: names[10].name, country: names[10].country, rating: 50, position: "ATT"},
      ]
    };
    const user = await User.create(newUser);
    if (user) {
      console.log("now")
      return res.status(201).json({message: "Successful signup"});
    } else {
      return res.status(500).json({message: "There was a problem saving your data"});
    }
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

router.get("/myTeam", async (req, res) => {
  try {
    const { username } = req.query; // Uporabimo query parameter
    console.log(req.query)
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    const currentUser = await User.findOne({ username });
    if (!currentUser || !currentUser.squad || currentUser.squad.length === 0) {
      return res.status(404).json({ message: "User's squad not found" });
    }
    
    res.status(200).json({ squad: currentUser.squad });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get ("/profile", async (req,res) => {
  try {
    const currentUser = await User.findOne({ _id: req.user._id });
    if (!currentUser) {
      return res.status(404).json({ message: "User's data not found" });
    }

    res.status(200).json({ data: currentUser});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get ("/buyPack", async (req,res) => {
  try {
    const { username } = req.query; 
    const currentUser = await User.findOne({ username });
    if (!currentUser) {
      return res.status(404).json({ message: "User's data not found" });
    }
    if (currentUser.money < 100) {
      return res.json({ message: "Not enough money" });
    }
    currentUser.money -= 100;
    await currentUser.save();
    const names = [];
    while (names.length < 2) {
      const newPlayerData = await functions.newPlayer();
      names.push(newPlayerData);
    }
    const positions = ["GK", "DEF", "DEF", "DEF", "MID", "MID", "MID", "ATT", "ATT", "ATT"];
    const getRandomPosition = () => {
      const randomIndex = Math.floor(Math.random() * positions.length);
      return positions[randomIndex];
    };
    var rating1 = await functions.playerRating();
    var rating2 = await functions.playerRating()
    var squad = [
      { playerName: names[0].name, country: names[0].country, rating: rating1, position: getRandomPosition() },
      { playerName: names[1].name, country: names[1].country, rating: rating2, position: getRandomPosition() }
    ];
    console.log(squad)
    res.status (200).json({squad: squad})
    
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get('/getData', async (req, res) => {
  try {
    const { username } = req.query;
    const currentUser = await User.findOne({ username });

    if (!currentUser) {
      return res.status(404).json({ message: "User's data not found" });
    }

    // Format the joinDate to 'day.month.year'
    const formattedJoinDate = new Date(currentUser.joinDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '.');

    res.status(200).json({
      clubName: currentUser.clubName,
      money: currentUser.money,
      points: currentUser.points,
      joinDate: formattedJoinDate // Use the formatted date
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.put('/replacePlayer', async (req, res) => {
  try {
    const { username, oldPlayerName, newPlayerName, newPlayerRating, newPlayerCountry, newPlayerPosition } = req.query;
    
    const currentUser = await User.findOne({ username });

    if (!currentUser || !currentUser.squad || currentUser.squad.length === 0) {
      return res.status(404).json({ message: "User's squad not found" });
    }
    console.log(oldPlayerName)
    // Find the index of the player by their name
    const index = currentUser.squad.findIndex(player => player.playerName === oldPlayerName);
    console.log("Player Index: ", index);

    if (index === -1) {
      return res.status(404).json({ message: "Old player not found in squad" });
    }

    // Update the player's details
    currentUser.squad[index].playerName = newPlayerName;
    currentUser.squad[index].rating = newPlayerRating;
    currentUser.squad[index].country = newPlayerCountry;
    currentUser.squad[index].position = newPlayerPosition;
    
    await currentUser.save();

    return res.status(200).json({ message: "Player replaced successfully", squad: currentUser.squad });

  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});


router.get("/getPlayers", async (req, res) => {
  try {
    const { username } = req.query;
    const currentUser = await User.findOne({ username });
    if (!currentUser) {
      return res.status(404).json({ message: "User's data not found" });
    }
    // Preverite, ali vrnete podatke o igralcih
    res.status(200).json({ squad: currentUser.squad });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getTournamentData", async (req, res) => {
  try {
      const { username, tournamentStage } = req.query;

      // Najdi trenutnega uporabnika
      const currentUser = await User.findOne({ username });
      if (!currentUser) {
          return res.status(404).json({ message: "User's data not found" });
      }

      // Najdi vse uporabnike v istem turnirju
      const tournamentUsers = await User.find({ tournament: currentUser.tournament });

      let stageKey;
      switch(tournamentStage) {
          case 'RoundOf16':
              stageKey = 'eighthFinals';
              break;
          case 'QuarterFinals':
              stageKey = 'quarterFinals';
              break;
          case 'SemiFinals':
              stageKey = 'semiFinals';
              break;
          case 'Finale':
              stageKey = 'finale';
              break;
          default:
              return res.status(400).json({ message: "Invalid tournament stage" });
      }

      // Ustvari pare za dano stopnjo
      const stageMatches = tournamentUsers.map(user => ({
          username: user.username,
          score: user[stageKey]
      }));

      // Filtriraj uporabnike z neprazno tabelo rezultatov
      const filteredMatches = stageMatches.filter(match => match.score.length > 0);

      // Ugotovi indeks uporabnika
      const userMatch = filteredMatches.find(match => match.username === username);
      const userIndex = userMatch ? userMatch.score[0] : null;

      // Razvrsti uporabnike po indeksih
      const indexGroups = {};
      filteredMatches.forEach(match => {
          const index = match.score[0]; // Uporabi prvi element za indeks
          if (!indexGroups[index]) {
              indexGroups[index] = [];
          }
          indexGroups[index].push(match);
      });

      // Ustvari končni seznam
      const finalMatches = [];

      // Dodaj par z uporabnikom na vrh
      if (userIndex !== null && indexGroups[userIndex]) {
          const userPairs = indexGroups[userIndex].splice(0, 2); // Dodaj do dva para z enakim indeksom
          finalMatches.push(...userPairs);
          delete indexGroups[userIndex]; // Odstrani ta indeks iz skupin
      }

      // Dodaj ostale pare
      const remainingMatches = Object.values(indexGroups).flat();

      // Ustvari pare po 2
      for (let i = 0; i < remainingMatches.length; i += 2) {
          const pair = remainingMatches.slice(i, i + 2);
          finalMatches.push(...pair);
      }

      // Vrni urejene pare
      return res.json(finalMatches);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
  }
});









export default router;