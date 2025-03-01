import React from 'react'
import  '../styles/Lineup.css'
import axios from 'axios'
import PropTypes from 'prop-types'
import Player from './Player'


const ReplacePlayers = ({username, bothPlayers, setBothPlayers, setAlreadyReplaced}) => {
    const replacePlayerFunction = async () => {
        try {
            const response = await axios.put ("http://localhost:3000/replacePlayer", {
                username: username,
                oldPlayerName: bothPlayers[0].playerName,
                newPlayerName: bothPlayers[1].playerName,
                newPlayerRating: bothPlayers[1].rating,
                newPlayerCountry: bothPlayers[1].country,
                newPlayerCountryCode: bothPlayers[1].countryCode,
                newPlayerPosition: bothPlayers[1].position
            }
            )
            setAlreadyReplaced(bothPlayers[1])
            setBothPlayers([])
            
        } catch (error){
            console.log("Erroe replacing players: " + error)
        }
    }
  return (
    <div className='replace-players-container'>
        <div className='replace-players-flex'>
            <Player playerInfo={bothPlayers[0]} customClass={"replace-player-0"}/>
            <Player playerInfo={bothPlayers[1]} customClass={"replace-player-1"}/>
        </div>
        <button onClick={replacePlayerFunction} className='replace-players-button'>Replace Players</button>
    </div>
  )
}

ReplacePlayers.propTypes = {
    username: PropTypes.string.isRequired,
    bothPlayers: PropTypes.arrayOf(PropTypes.shape ({
        playerName: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        position: PropTypes.string.isRequired,
    })).isRequired,
}

export default ReplacePlayers
