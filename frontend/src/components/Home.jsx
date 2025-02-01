import React from 'react'
import Lineup from './Lineup'
import Navigation from './Navigation'
import '../styles/Navigation.css'


const Home = () => {
    return (
        <div className='nav-container'>
            <Navigation />
            <Lineup />
        </div>
    )
}

export default Home
