import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'



const Navigation = ({ active, username }) => {

  const [logOutDialog, setLogOutDialog] = useState(false)
  const navigate = useNavigate()
  const changeSite = (site) => {
    if (site === 'home') { navigate('/home', { state: { username: username } }) }
    if (site === 'play') { navigate('/play', { state: { username: username } }) }
  }

  const toggleLogOutDialog = () => {
    if (logOutDialog === false ) setLogOutDialog(true)
    else setLogOutDialog(false)
  }


  return (
    <>
      <div className='hidden 3xl:flex flex-row w-[40rem] m-auto justify-evenly mt-[2rem]'>
        <a onClick={() => changeSite('home')} className={`${active === 'home' ? 'text-gray-400' : 'text-gray-200'} hover:text-gray-600 cursor-pointer`}>Home</a>
        <a onClick={() => changeSite('play')} className={`${active === 'play' ? 'text-gray-400' : 'text-gray-200'} hover:text-gray-600 cursor-pointer`}>Play</a>
      </div>
      <div className='absolute top-[2rem] right-10'>
        <i class="fa-solid fa-arrow-right-from-bracket text-gray-200 text-2xl cursor-pointer hover:text-gray-400" onClick={()=>toggleLogOutDialog()}></i>
      </div>
      <div className={`absolute top-[1.5rem] right-20 border border-gray-200 text-gray-200 p-2 text-center cursor-pointer hover:text-gray-600 ${logOutDialog === true ? 'flex' : 'hidden'}`} onClick={()=>{navigate('/')}}>
        LogOut
      </div>
    </>
  )
}

export default Navigation
