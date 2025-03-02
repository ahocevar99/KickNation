import React from 'react'
import '../styles/DisplayBonuses.css'

const DisplayBonuses = ({nationBonus, ratingBonus, positionBonus}) => {
    console.log(nationBonus, ratingBonus, positionBonus)

  return (
    <div className='bonuses-container'>
      <p>Nation Bonus: {nationBonus}</p>
      <p>Rating Bonus: {ratingBonus}</p>
      <p>Position Bonus: {positionBonus}</p>
    </div>
  )
}

export default DisplayBonuses
