import React from 'react'

export const SignIn = (props) => {
  const handleSignin = (e) => {
    e.preventDefault()
    let username = document.getElementsByName('username')[0].value
    props.handleSignin(e, username)
  }
  return (
    <form onSubmit={handleSignin} method='POST'>
      <input type='text' name='username' placeholder='Username' />
      <input type='password' name='password' placeholder='Password' />
      <input type='submit' value='Sign In' />
    </form>
  )
}