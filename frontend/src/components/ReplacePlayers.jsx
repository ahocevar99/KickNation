import React from 'react'
import  '../styles/Lineup.css'
import axios from 'axios'
import PropTypes from 'prop-types'



const ReplacePlayers = ({username, bothPlayers}) => {
    const replacePlayerFunction = async () => {
        try {
            const response = await axios.put ("http://localhost:3000/replacePlayer", {
                username: username,
                oldPlayerName: bothPlayers[0].playerName,
                newPlayerName: bothPlayers[1].playerName,
                newPlayerRating: bothPlayers[1].rating,
                newPlayerCountry: bothPlayers[1].country,
                newPlayerPosition: bothPlayers[1].position
            }
            )
            console.log(response.data.message)
        } catch (error){
            console.log("Erroe replacing players: " + error)
        }
    }
  return (
    <div className='replace-players-container'>
      <button onClick={replacePlayerFunction}>Klikni</button>
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
