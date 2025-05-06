import React from 'react'
import '../styles/DisplayBonuses.css'

const DisplayBonuses = ({ nationBonus, ratingBonus, positionBonus, nations }) => {
  return (
    <div className='bonuses-container'>
      <div className='bonuses-left-side'>
        <p>Nation Bonus: {nationBonus}</p>
        <div className='nations'>
          <>
            {Object.entries(nations).map(([key, value], index) => (
              <div key={index}>
                <span className='nations-left-side'>{key}</span>
                <span className='nations-right-side'>{Math.round(value)}</span>
              </div>
            ))}
          </>
        </div>
      </div>
      <div className='bonuses-right-side'>
        <p>Position Bonus: {positionBonus}</p>
        <p>Rating Bonus: {ratingBonus}</p>
      </div>
    </div>
  )
}

export default DisplayBonuses