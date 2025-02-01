import React, { useState } from 'react'
import '../styles/Navigation.css'
const Navigation = () => {

    return (
        <div>
            <div className='nav-main'>
                <div className='nav-item-main nav-item-home'>
                    Home
                    <div className='nav-item-main-underline'></div>
                </div>
                <div className='nav-item-main nav-item-play'>
                    Play
                    <div className='nav-item-main-underline'></div>
                </div>
            </div>
            <nav className='nav-side'>
                <div className='nav-item-side'>
                    Profile
                </div>
                <div className='nav-item-side'>
                    About
                    
                </div>
                <div className='nav-item-side'>
                    Log Out
                    
                </div>
            </nav>
        </div>
    )
}

export default Navigation
