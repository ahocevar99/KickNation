import { User } from "./models/UserModel.js";
import countries from './countries.json' with { type: "json" }

const getCountryCode = (country) => {
  const foundCountry = countries.find(c => c.country.toLowerCase() === country.toLowerCase())
  return foundCountry ? foundCountry.abbreviation : "XX"
}

export const newPlayer = async () => {
  while (true) {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const gender = data.results[0].gender;
    const nameLength =
      data.results[0].name.first.length + data.results[0].name.last.length;
    if (gender === "male" && nameLength < 12) {
      const firstName = data.results[0].name.first;
      const lastName = data.results[0].name.last;
      const country = data.results[0].location.country;
      const countryCode = getCountryCode(country);
      const regex = /^[A-Za-zČčĆćĐđŠšŽž\s]+$/;
      if (regex.test(firstName) && regex.test(lastName)) {
        return { name: `${firstName} ${lastName}`, country: country, countryCode: countryCode };
      }
    }
  }
};

export const shuffleArray = async (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const playerRating = async () => {
  const randomNumber = Math.random();
  let playerRating;
  if (randomNumber <= 0.5) {
    playerRating = Math.floor(51 + 10 * Math.random());
  } else if (randomNumber > 0.5 && randomNumber <= 0.7) {
    playerRating = Math.floor(55 + 15 * Math.random());
  } else if (randomNumber > 0.7 && randomNumber <= 0.9) {
    playerRating = Math.floor(65 + 14 * Math.random());
  } else if (randomNumber > 0.9 && randomNumber <= 0.98) {
    playerRating = Math.floor(70 + 20 * Math.random());
  } else {
    playerRating = Math.floor(70 + 25 * Math.random());
  }
  return playerRating;
};

export const createClub = async (name) => {
  try {
    const concatenatedString = name.split(" ").join("");
    const firstLetter = concatenatedString.charAt(0).toLowerCase();
    const restOfWord = concatenatedString.slice(1);
    const username = firstLetter + restOfWord;
    const names = [];
    while (names.length < 11) {
      const newPlayerData = await newPlayer();
      names.push(newPlayerData);
    }
    let squad = [];
    squad.push({
      playerName: names[0].name,
      country: names[0].country,
      countryCode: names[0].countryCode,
      rating: await playerRating(),
      position: "GK",
    });
    for (let i = 1; i <= 4; i++) {
      squad.push({
        playerName: names[i].name,
        country: names[i].country,
        countryCode: names[i].countryCode,
        rating: await playerRating(),
        position: "DEF",
      });
    }
    for (let i = 5; i <= 7; i++) {
      squad.push({
        playerName: names[i].name,
        country: names[i].country,
        countryCode: names[i].countryCode,
        rating: await playerRating(),
        position: "MID",
      });
    }
    for (let i = 8; i <= 10; i++) {
      squad.push({
        playerName: names[i].name,
        country: names[i].country,
        countryCode: names[i].countryCode,
        rating: await playerRating(),
        position: "ATT",
      });
    }
    const newUser = {
      username: username,
      password: "zelovarnogeslo",
      clubName: name,
      index: 0,
      squad: squad,
    };
    const user = await User.create(newUser);
  } catch (error) {
    console.log(error.message);
    return;
  }
};

export const calculateNationBonus =  (squad) => {
  const calculatePartialBonus = (players, percentage) => {
    let bonus = 0;
    let obj = {}

    for (let i = 0; i < players.length; i++) {
      let code = players[i].countryCode;
      if (obj[code]) obj[code] += 1
      else {
        obj[code] = 1;
      }
    }
    let values = Object.values(obj)
    values = values.filter(prev => prev - 1 > 0)
    for (let i = 0; i < values.length; i++) {
      bonus += values[i] * percentage;
    }
    bonus *= 1.1 - values.length / 10
    return bonus
  }
  return Math.trunc(calculatePartialBonus(squad, 4.54545455) + calculatePartialBonus(squad.slice(1, 5), 5) + calculatePartialBonus(squad.slice(5, 8), 5) + calculatePartialBonus(squad.slice(8, 11), 5))
  
}

export const calculateRatingBonus = (squad) => {
  let bonus = 0;
  for (let i = 0; i< squad.length; i++) {
    bonus += squad[i].rating;
  }
  
  return Math.trunc(bonus/11);
}

export const calculatePositionBonus = (squad) => {

}
export default { newPlayer, playerRating, createClub, calculateNationBonus, calculateRatingBonus, calculatePositionBonus };
