import { React, useEffect, useState } from 'react'
import Lineup from './Lineup'
import Buy from './Buy'
import axios from 'axios'
import { useLocation } from 'react-router-dom'


const Home = () => {
    const location = useLocation();
    const { username } = location.state || {};
    const [alreadyReplaced, setAlreadyReplaced] = useState([]);
    const [nationBonus, setNationBonus] = useState(0);
    const [ratingBonus, setRatingBonus] = useState(0);
    useEffect(() => { 
        const fetchBonus = async () => {
            const response = await axios.get(`http://localhost:3000/getData?username=${username}`)
            console.log(response)
            setNationBonus(response.data.nationBonus)
            setRatingBonus(response.data.ratingBonus)
        }
        fetchBonus()
    }, [alreadyReplaced])

    return (
        <div>
            <Lineup setAlreadyReplaced={setAlreadyReplaced} />
            <Buy alreadyReplaced={alreadyReplaced} />
        </div>
    )
}

export default Home
