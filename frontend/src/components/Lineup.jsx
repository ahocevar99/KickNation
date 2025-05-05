import '../styles/Lineup.css'
import soccerField from '../assets/soccer-field.png';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import Player from './Player';
import ReplacePlayers from './ReplacePlayers';

const Lineup = ({setAlreadyReplaced, nationBonus, ratingBonus, positionBonus}) => {
  const [players, setPlayers] = useState ([]);
  const location = useLocation();
  const {username} = location.state || {};

  const [bothPlayers, setBothPlayers] = useState([])

  useEffect(() => {
    const fetchTeam = async () => {
      const response = await axios.get(`http://localhost:3000/myTeam?username=${username}`);
      setPlayers(response.data.squad);
    }
    fetchTeam()
  });

  const replacedPlayers = (replacedPlayersData) => {
    setBothPlayers(replacedPlayersData)
  }
  const renderPlayers = (players) => {
    return players.slice(0, 11).map((player, index) => (
      <Player key={index} playerInfo={player} index = {index} replacedPlayers = {replacedPlayers}/>
    ));
  };

  //<ReplacePlayers username={username} bothPlayers={bothPlayers}/>

  return (
      <div>
        <img src={soccerField} alt="Soccer Field" className="soccer-image" />
        {renderPlayers(players)}
        {bothPlayers.length>0? 
          <ReplacePlayers username={username} bothPlayers={bothPlayers} setBothPlayers={setBothPlayers} setAlreadyReplaced = {setAlreadyReplaced}
          nationBonus={nationBonus} ratingBonus={ratingBonus} positionBonus={positionBonus}/>:
          <div></div>
        }
      </div>
  )
}

export default Lineup
