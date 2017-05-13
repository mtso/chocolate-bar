import React from 'react'

export const Home = (props) => (
  <div>
    <button onClick={props.handleLogout}>
      Log Out
    </button>
    <p>Hi, {props.username}~</p>
  </div>
)