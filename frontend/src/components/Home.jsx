import React from 'react'
import Lineup from './Lineup'
import Buy from './Buy'
import Navigation from './Navigation'
import '../styles/Navigation.css'


const Home = () => {
    return (
        <div className='nav-container'>
            <Lineup />
            <Buy />
        </div>
    )
}

export default Home
