import React, { useState, useEffect } from 'react'
import '../styles/Buy.css'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import NewPlayer from './NewPlayer.jsx';
import Player from './Player.jsx';
import { newPlayer } from '../../../backend/functions.js';


const Buy = ({ alreadyReplaced }) => {
    const [money, setMoney] = useState();
    const [newPlayers, setNewPlayers] = useState([]);
    const [displayedPlayer, switchDisplayedPlayer] = useState(0);
    const [isVisible, setVisibility] = useState(false)
    const [hasMoney, setHasMoney] = useState(true)
    const [noMoney, setNoMoney] = useState(false)
    const location = useLocation();
    const { username } = location.state || {};


    const buyPack = async () => {
        if (hasMoney) {
            setNewPlayers([])
            setVisibility(false)
            const response = await axios.get(`http://localhost:3000/buyPack?username=${username}`);
            setNewPlayers(response.data.squad)
            setVisibility(true)
        }
        else {
            setNewPlayers([])
            noMoneyWarning()
        }
    }

    useEffect(() => {
        const getMoney = async () => {
            const response = (await axios.get(`http://localhost:3000/getData?username=${username}`));
            setMoney(response.data.money)
            if (money < 100) setHasMoney(false)
        }
        getMoney();
    }, [buyPack])

    useEffect(() => {
        if (alreadyReplaced && newPlayers.length > 0) {
            setNewPlayers(prevPlayers => prevPlayers.filter(player => player.playerName !== alreadyReplaced.playerName));
        }
        switchDisplayedPlayer(0)
    }, [alreadyReplaced]);

    useEffect(() => {
        if (newPlayers.length == 0) setVisibility(false)
    }, [newPlayers])


    const changePlayer = () => {
        if (newPlayers.length == 2) return (displayedPlayer == 0 ? switchDisplayedPlayer(1) : switchDisplayedPlayer(0))
    }

    const cancelPlayer = () => {
        const updatedPlayers = [...newPlayers];
        updatedPlayers.splice(displayedPlayer, 1);
        console.log(updatedPlayers)
        setNewPlayers(updatedPlayers);
        switchDisplayedPlayer(0)

    }

    const noMoneyWarning = () => {
        setNoMoney(true)
        setTimeout(() => {
            setNoMoney(false)
        }, 100)
        setTimeout(() => {
            setNoMoney(true)
        }, 200)
        setTimeout(() => {
            setNoMoney(false)
        }, 300)
        setTimeout(() => {
            setNoMoney(true)
        }, 400)
        setTimeout(() => {
            setNoMoney(false)
        }, 500)
        setTimeout(() => {
            setNoMoney(true)
        }, 600)
        setTimeout(() => {
            setNoMoney(false)
        }, 700)
    }

    const renderPlayer = (displayedPlayer) => {
        return newPlayers.length > 0 ? (
            <NewPlayer newPlayerInfo={newPlayers[displayedPlayer]} />
        ) : <div></div>
    }

    return (
        <div className='buy-container' style={{ height: isVisible ? "585px" : "230px" }}>
            <div className='money-counter'>
                <p>Money: <span style={{ color: noMoney ? "red" : "rgb(202, 202, 202)" }}>{money} $ </span></p>
            </div>
            <div className='new-pack'>
                <button onClick={buyPack}>New Pack</button>
                <p>(100 $)</p>
            </div>
            <div>
                {renderPlayer(displayedPlayer)}
            </div>
            <div className="new-player-arrows" >
                <i className="fa-solid fa-xmark" style={{ visibility: isVisible ? "visible" : "hidden" }} onClick={() => cancelPlayer()}></i>
                <i className="fa-solid fa-arrow-right" style={{ visibility: isVisible && newPlayers.length === 2 ? "visible" : "hidden" }} onClick={() => changePlayer()}></i>
            </div>
        </div>
    )
}

export default Buy
