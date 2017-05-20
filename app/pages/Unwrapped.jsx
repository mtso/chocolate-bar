import React from 'react'
import { Link } from 'react-router-dom'
import CandyBar from '../components/CandyBar'
import Home from '../components/Home'

const UnwrappedPage = ({ username, handleLogout }) => (
  <div>
    <Link to='/'>
      <CandyBar src='img/chocolate-bar-unwrapped.png' />
    </Link>
    <Home
      username={username} 
      handleLogout={handleLogout}
    />
  </div>
)

export default UnwrappedPage
