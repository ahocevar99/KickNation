import { React, useEffect, useState } from 'react'
import Lineup from './Lineup'
import Buy from './Buy'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import DisplayBonuses from './DisplayBonuses'
import Navigation from './Navigation'


const Home = () => {
    const location = useLocation();
    const { username } = location.state || {};
    const [alreadyReplaced, setAlreadyReplaced] = useState([]);
    const [nationBonus, setNationBonus] = useState(0);
    const [ratingBonus, setRatingBonus] = useState(0);
    const [positionBonus, setPositionBonus] = useState(0);
    const [nations, setNations] = useState({})
    useEffect(() => {
        const fetchBonus = async () => {
            const response = await axios.get(`http://localhost:3000/getData?username=${username}`)
            setNationBonus(response.data.nationBonus)
            setRatingBonus(response.data.ratingBonus)
            setPositionBonus(response.data.positionBonus)
            setNations(response.data.nations)
        }
        fetchBonus()
    }, [alreadyReplaced])

    return (
        <>
            <div className='flex flex-row m-auto ml-10 mr-10 mt-[10rem] text-5xl text-gray-200 justify-center 3xl:hidden'>
                This application is currently optimized for desktop screens only.
            </div>
            <div className='hidden 3xl:flex flex-col'>
                <Navigation active='home' username={username} />
                <Lineup setAlreadyReplaced={setAlreadyReplaced} nationBonus={nationBonus} ratingBonus={ratingBonus} positionBonus={positionBonus} />
                <DisplayBonuses nationBonus={nationBonus} ratingBonus={ratingBonus} positionBonus={positionBonus} nations={nations} />
                <Buy alreadyReplaced={alreadyReplaced} username={username} />
            </div>
        </>
                )
}

                export default Home
