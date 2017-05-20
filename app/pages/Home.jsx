import React from 'react'
import { Link } from 'react-router-dom'
import CandyBar from '../components/CandyBar'
import Home from '../components/Home'

const HomePage = ({ username, handleLogout }) => (
  <div>
    <Link to='/unwrapped'>
      <CandyBar src='img/chocolate-bar.png' />
    </Link>
    <Home
      username={username} 
      handleLogout={handleLogout}
    />
  </div>
)

export default HomePage
