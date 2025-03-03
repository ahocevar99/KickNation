import React, { useState, useEffect } from 'react'
import '../styles/Buy.css'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import NewPlayer from './NewPlayer.jsx';
import Player from './Player.jsx';


const Buy = ({alreadyReplaced}) => {
    const [money, setMoney] = useState();
    const [newPlayers, setNewPlayers] = useState([]);
    const [displayedPlayer, switchDisplayedPlayer] = useState(0);
    const [isVisible, setVisibility] = useState(false)
    const location = useLocation();
    const { username } = location.state || {};
    
    
    const buyPack = async () => {
        setNewPlayers([])
        setVisibility(false)
        const response = await axios.get(`http://localhost:3000/buyPack?username=${username}`);
        setNewPlayers(response.data.squad)
        setVisibility(true)
    }

    useEffect(() => {
        const getMoney = async () => {
            const response = (await axios.get(`http://localhost:3000/getData?username=${username}`));
            setMoney(response.data.money)
        }
        getMoney();
    }, [buyPack])

    useEffect(() => {
        if (alreadyReplaced && newPlayers.length > 0) {
            setNewPlayers(prevPlayers => prevPlayers.filter(player => player.playerName !== alreadyReplaced.playerName));
        }
        switchDisplayedPlayer(0)
    }, [alreadyReplaced]);


    const changePlayer = () => {
        if (newPlayers.length == 2) return (displayedPlayer == 0 ? switchDisplayedPlayer(1) : switchDisplayedPlayer(0))    
    }
    

    const renderPlayer = (displayedPlayer) => {
        return newPlayers.length > 0 ? (
        <NewPlayer newPlayerInfo={newPlayers[displayedPlayer]}/>
        ) : <div></div>
    }

    return (
        <div className='buy-container' style={{height : isVisible? "630px" : "230px"}}>
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
            <div className="new-player-arrows" style={{visibility : isVisible? "visible": "hidden"}} >
                <i className="fa-solid fa-arrow-left" onClick={() => changePlayer()}></i>
                <i className="fa-solid fa-arrow-right" onClick={() => changePlayer()}></i>
            </div>
        </div>
    )
}

export default Buy
