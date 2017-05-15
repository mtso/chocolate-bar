import React from 'react'

export const AuthenticationForm = (props) => (
  <form onSubmit={props.onSubmit} method={props.method || 'POST'}>
    <input
      type='text'
      name='username'
      placeholder={props.usernamePlaceholder || 'Username'}
    />
    <input
      type='password'
      name='password'
      placeholder={props.passwordPlaceholder || 'Password'}
    />
    <input type='submit' value={props.submitTitle || 'Submit'} />
  </form>
)