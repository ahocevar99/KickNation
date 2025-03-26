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
  
  const correctPosition = (position, index) => {
    switch(index) {
      case 0: return position === 'GK'; 
      case 1:
      case 2:
      case 3:
      case 4: return position === 'DEF';
      case 5:
      case 6:
      case 7: return position === 'MID';
      case 8:
      case 9:
      case 10: return position === 'ATT'
    }
  }

  const positionColor = () => {
    if (index === undefined) return 'rgb(243, 243, 243)';
    return correctPosition(playerInfo.position, index) ? 'rgb(179, 241, 179)': 'rgb(236, 164, 164)';
  }

  
  return (
    <div className = {`player-container pc-${index} ${customClass}`} onDrop={dragFunction} onDragOver={allowDrop}>
      <img src={playerShirt} alt="Player Shirt" className='player-shirt'/>
      <p className='player-name'>{playerInfo.playerName}</p>
      <p className='player-rating'>{playerInfo.rating}</p>
      <p className='player-country'>{playerInfo.countryCode}</p>
      <p className='player-position' style={{backgroundColor:positionColor()}}>{playerInfo.position}</p>
    </div>
  );
};

Player.propTypes = {
    playerInfo: PropTypes.shape ({
        playerName: PropTypes.string.isRequired,
        countryCode: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        position: PropTypes.string.isRequired,
    }).isRequired,
    index: PropTypes.number,
    replacedPlayers: PropTypes.func,
    customClass: PropTypes.string
}

export default Player;

