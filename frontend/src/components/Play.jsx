import React from 'react'
import Navigation from './Navigation'
import { useLocation } from 'react-router-dom'

const Play = () => {
    const location = useLocation()
    const { username } = location.state || {}
    return (
        <>
            <div className='flex flex-row m-auto ml-10 mr-10 mt-[10rem] text-5xl text-gray-200 justify-center 3xl:hidden'>
                This application is currently optimized for desktop screens only.
            </div>


            <div>
                <Navigation active='play' username={username} />
                <div className='hidden text-5xl text-gray-200 3xl:flex flex-row m-auto mt-[10rem] justify-center'>
                    <h1>This website is currently under construction.</h1>
                </div>
            </div>
        </>
    )
}

export default Play
