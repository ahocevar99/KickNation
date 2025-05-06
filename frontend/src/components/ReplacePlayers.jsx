import React, { useState, useEffect } from 'react';
import '../styles/Lineup.css'
import axios from 'axios'
import PropTypes from 'prop-types'



const ReplacePlayers = ({ username, bothPlayers, setBothPlayers, setAlreadyReplaced, nationBonus, ratingBonus, positionBonus }) => {
    const [newNationBonus, setNewNationBonus] = useState(0);
    const [newRatingBonus, setNewRatingBonus] = useState(0);
    const [newPositionBonus, setNewPositionBonus] = useState(0);
    const replacePlayerFunction = async () => {
        try {
            const response = await axios.put("http://localhost:3000/replacePlayer", {
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

        } catch (error) {
            console.log("Erroe replacing players: " + error)
        }
    }

    useEffect(() => {
        const getNewBonuses = async () => {
            const response = await axios.get(`http://localhost:3000/calculateBonusesWhenReplacing?username=${username}&oldPlayer=${bothPlayers[0]._id}&newPlayer=${encodeURIComponent(JSON.stringify(bothPlayers[1]))}`)
            setNewNationBonus(response.data.nationBonus[0]);
            setNewRatingBonus(response.data.ratingBonus);
            setNewPositionBonus(response.data.positionBonus);
            console.log(newNationBonus)
        }
        getNewBonuses()
    }, [])

    const closeReplaceWindow = () => {
        setBothPlayers([])
    }
    return (
        <div className='replace-players-container bg-gray-950'>
            <span className='replace-title'>Choose 1 player</span>
            <div className='replace-underline'></div>
            <div className='replace-players-flex'>
                <div className='old-player'>
                    <span className='player-name-replace'>{bothPlayers[0].playerName}</span>
                    <span className='player-rating-replace'>Rating: {bothPlayers[0].rating}</span>
                    <span className='player-country-replace'>{bothPlayers[0].country} ({bothPlayers[0].countryCode})</span>
                    <span className='player-position-replace'>Position: {bothPlayers[0].position}</span>
                </div>
                <div className='new-player'>
                    <span className='player-name-replace'>{bothPlayers[1].playerName}</span>
                    <span className='player-rating-replace'>Rating: {bothPlayers[1].rating}</span>
                    <span className='player-country-replace'>{bothPlayers[1].country} ({bothPlayers[1].countryCode})</span>
                    <span className='player-position-replace'>Position: {bothPlayers[1].position}</span>
                </div>
            </div>
            <div className='display-bonuses'>
            <div className='old-bonuses'>
                <span>{nationBonus}</span>
                <span>{positionBonus}</span>
                <span>{ratingBonus}</span>
            </div>
            <div className='text-bonuses'>
                <span>Nation Bonus</span>
                <span>Positiona Bonus</span>
                <span>Rating Bonus</span>
            </div>
            <div className='new-bonuses'>
                <span>{newNationBonus}</span>
                <span>{newPositionBonus}</span>
                <span>{newRatingBonus}</span>
            </div>
            </div>
            <div className='replace-buttons'>
                <button onClick={replacePlayerFunction} className='replace-old-player'>{bothPlayers[1].playerName}</button>
                <button onClick={closeReplaceWindow} className='keep-old-player'>{bothPlayers[0].playerName}</button>
            </div>
        </div>
    )
}

ReplacePlayers.propTypes = {
    username: PropTypes.string.isRequired,
    bothPlayers: PropTypes.arrayOf(PropTypes.shape({
        playerName: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        position: PropTypes.string.isRequired,
    })).isRequired,
}

ReplacePlayers.defaultProps = {
    bothPlayers: PropTypes.arrayOf(PropTypes.shape({
        playerName: "PlayerName",
        country: "Country",
        rating: 0,
        position: "Position",
    }))
}

export default ReplacePlayers
