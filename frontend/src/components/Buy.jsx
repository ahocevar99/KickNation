import React, { useState, useEffect } from 'react'
import '../styles/Buy.css'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import NewPlayer from './NewPlayer.jsx';


const Buy = ({alreadyReplaced}) => {
    const [money, setMoney] = useState();
    const [newPlayers, setNewPlayers] = useState([]);
    const [displayedPlayer, switchDisplayedPlayer] = useState(0);
    const [alreadyReplacedPlayer, setAlreadyReplacedPlayer] = useState(alreadyReplaced)
    const location = useLocation();
    const { username } = location.state || {};


    const buyPack = async () => {
        const response = await axios.get(`http://localhost:3000/buyPack?username=${username}`);
        setNewPlayers(response.data.squad)
        renderPlayer(displayedPlayer);
    }

    useEffect(() => {
        const getMoney = async () => {
            const response = (await axios.get(`http://localhost:3000/getData?username=${username}`));
            setMoney(response.data.money)
        }
        getMoney();
    }, [buyPack])

    const changePlayer = () => {
        return (displayedPlayer == 0 ? switchDisplayedPlayer(1) : switchDisplayedPlayer(0))    
    }
    
    useEffect(() => {
        for (player in newPlayers) {
            if (player.playerName === alreadyReplaced.playerName) {player.playerName = "Zamenjan"}
        }
    }, [alreadyReplacedPlayer])

    const renderPlayer = (displayedPlayer) => {
        return newPlayers.length > 0 ? (
        <NewPlayer newPlayerInfo={newPlayers[displayedPlayer]}/>
        ) : <div></div>
    }

    return (
        <div className='buy-container'>
            <div className='money-counter'>
                <p>Money: {money} $</p>
            </div>
            <div className='new-pack'>
                <button onClick={buyPack}>New Pack</button>
                <p>(100 $)</p>
            </div>
            <div>
                {renderPlayer(displayedPlayer)}
            </div>
            <div className="new-player-arrows">
                <i className="fa-solid fa-arrow-left" onClick={() => changePlayer()}></i>
                <i className="fa-solid fa-arrow-right" onClick={() => changePlayer()}></i>
            </div>
        </div>
    )
}

export default Buy
