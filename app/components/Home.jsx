import React from 'react'

const Home = ({ username, handleLogout }) => (
  <div>
    <button onClick={handleLogout}>
      Log Out
    </button>
    <p>Hi, {username}~</p>
  </div>
)

export default Home