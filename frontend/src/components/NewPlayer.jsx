import React from 'react'
import '../styles/Buy.css'
import playerShirt from '../assets/shirt-player.png';
import PropTypes from 'prop-types';

const NewPlayer = ({newPlayerInfo}) => {

    const handleDrag = (event) =>  {
        event.dataTransfer.setData("plain/text", JSON.stringify(newPlayerInfo))
        event.dataTransfer.effectAllowed = "move";
    }
    return (
        <div>
            <div className="new-player-container" draggable="true" onDragStart={handleDrag}>
                <img src={playerShirt} alt="" />
                <p className='new-player-name'>{newPlayerInfo.playerName}</p>
                <p className='new-player-rating'>{newPlayerInfo.rating}</p>
                <p className='new-player-position'>{newPlayerInfo.position}</p>
                <p className='new-player-country'>{newPlayerInfo.countryCode}</p>
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
}


export default NewPlayer
