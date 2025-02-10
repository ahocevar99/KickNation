import React from 'react'
import '../styles/Buy.css'
import playerShirt from '../assets/shirt-player.png';
import PropTypes from 'prop-types';

const NewPlayer = (newPlayerInfo, index) => {0
    return (
        <div>
            <div className='new-player-container'>
                <img src={playerShirt} alt="" />
                <p className='new-player-name'>{newPlayerInfo.newPlayerInfo.playerName}</p>
                <p className='new-player-rating'>{newPlayerInfo.newPlayerInfo.rating}</p>
                <p className='new-player-country'>{newPlayerInfo.newPlayerInfo.country}</p>
            </div>
        </div>
    )
}

NewPlayer.propTypes = {
    newPlayerInfo: PropTypes.shape({
        playerName: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired
}


export default NewPlayer
