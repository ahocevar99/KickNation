import React from 'react';
import playerShirt from '../assets/shirt-player.png';
import '../styles/Player.css';
import PropTypes from 'prop-types';


function allowDrop(event) {
  event.preventDefault();
}

const Player = ({playerInfo, index, replacedPlayers, customClass}) => {

  const dragFunction = (event) => {
    event.preventDefault()
    const bothPlayers = [];
    bothPlayers.push (playerInfo)
    bothPlayers.push (JSON.parse(event.dataTransfer.getData("plain/text")))
    replacedPlayers (bothPlayers)
  }
  
  return (
    <div className = {`player-container pc-${index} ${customClass}`} onDrop={dragFunction} onDragOver={allowDrop}>
      <img src={playerShirt} alt="Player Shirt" className='playerShirt'/>
      <p className='player-name'>{playerInfo.playerName}</p>
      <p className='player-rating'>{playerInfo.rating}</p>
      <p className='player-country'>{playerInfo.country}</p>
      <p className='player-position'>{playerInfo.position}</p>
    </div>
  );
};

Player.propTypes = {
    playerInfo: PropTypes.shape ({
        playerName: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        position: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number,
    replacedPlayers: PropTypes.func,
    customClass: PropTypes.string
}

export default Player;

