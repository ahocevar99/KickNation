import React, { useState, useEffect } from 'react'
import '../styles/Buy.css'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import NewPlayer from './NewPlayer';


const Buy = () => {
    const [money, setMoney] = useState();
    const [newPlayers, setNewPlayers] = useState([]);
    const location = useLocation();
    const { username } = location.state || {};

    const buyPack = async () => {
        const response = await axios.get(`http://localhost:3000/buyPack?username=${username}`);
        console.log(response.data.squad)
        setNewPlayers(response.data.squad)

    }

    useEffect(() => {
        const getMoney = async () => {
            const response = (await axios.get(`http://localhost:3000/getData?username=${username}`));
            setMoney(response.data.money)
        }
        getMoney();
    }, [buyPack])


    return (
        <div className='buy-container'>
            <div className='money-counter'>
                <p>Money: {money} $</p>
            </div>
            <div className='new-pack'>
                <button onClick={buyPack}>New Pack</button>
                <p>(100 $)</p>
            </div>
            <div className='player-list'>
                {newPlayers.slice(0, 2).map((player, index) => (
                    <NewPlayer key={index} newPlayerInfo={player} index={index} />
                ))}
            </div>
            <div className='new-player-arrows'>
                <i className="fa-solid fa-arrow-left"></i>
                <i className="fa-solid fa-arrow-right"></i>
            </div>
        </div>
    )
}

export default Buy
