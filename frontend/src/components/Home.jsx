import {React, useState} from 'react'
import Lineup from './Lineup'
import Buy from './Buy'
import Navigation from './Navigation'
import '../styles/Navigation.css'


const Home = () => {
    const [playerReplaced, setPlayerReplaced] = useState();
    return (
        <div className='nav-container'>
            <Lineup />
            <Buy />
        </div>
    )
}

export default Home
