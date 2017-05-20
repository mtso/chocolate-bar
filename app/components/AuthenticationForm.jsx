import React from 'react'

const AuthenticationForm = ({ 
  onSubmit, 
  usernamePlaceholder, 
  passwordPlaceholder,
  submitTitle,
  method,
}) => (
  <form onSubmit={onSubmit} method={method || 'POST'}>
    <input
      type='text'
      name='username'
      placeholder={usernamePlaceholder || 'Username'}
    />
    <input
      type='password'
      name='password'
      placeholder={passwordPlaceholder || 'Password'}
    />
    <input type='submit' value={submitTitle || 'Submit'} />
  </form>
)

export default AuthenticationForm