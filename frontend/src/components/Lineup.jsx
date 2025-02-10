import '../styles/Lineup.css'
import soccerField from '../assets/soccer-field.png';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import Player from './Player';
import PropTypes from 'prop-types';

const Lineup = () => {
  const [players, setPlayers] = useState ([]);
  const location = useLocation();
  const {username} = location.state || {};

  useEffect(() => {
    const fetchTeam = async () => {
      const response = await axios.get(`http://localhost:3000/myTeam?username=${username}`);
      setPlayers(response.data.squad);
    }
    fetchTeam()
  }, []);
  const renderPlayers = (players) => {
    return players.slice(0, 11).map((player, index) => (
      <Player key={index} playerInfo={player} index = {index}/>
    ));
  };

  return (
      <div>
        <img src={soccerField} alt="Soccer Field" className="soccer-image" />
        {renderPlayers(players)}
      </div>
  )
}

export default Lineup
