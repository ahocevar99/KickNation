import React from 'react';
import playerShirt from '../assets/shirt-player.png';
import '../styles/Player.css';
import PropTypes from 'prop-types';

const Player = ({playerInfo, index}) => {
  return (
    <div className = {`player-container pc-${index}`}>
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
    index: PropTypes.number.isRequired
}

export default Player;

