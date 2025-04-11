import React from 'react'
import './index.css'
import searchIcon from '../../assets/search.png'

const Weather = () => {
  return (
    <div className='weather'>
      <div className="search-bar">
        <input type="text" placeholder='Search' />
        <img src={searchIcon} alt="search-icon" />
      </div>
      <h1>Weather</h1>
    </div>
  )
}

export default Weather

