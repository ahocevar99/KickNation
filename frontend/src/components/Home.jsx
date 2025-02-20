import {React, useState} from 'react'
import Lineup from './Lineup'
import Buy from './Buy'
import Navigation from './Navigation'
import '../styles/Navigation.css'


const Home = () => {
    const [alreadyReplaced, setAlreadyReplaced] = useState([]);
    return (
        <div className='nav-container'>
            <Lineup setAlreadyReplaced = {setAlreadyReplaced}/>
            <Buy alreadyReplaced ={alreadyReplaced}/>
        </div>
    )
}

export default Home
