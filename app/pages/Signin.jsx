import React from 'react'
import { Link } from 'react-router-dom'
import CandyBar from '../components/CandyBar'
import AuthenticationForm from '../components/AuthenticationForm'

const SigninPage = ({ handleSignin }) => (
  <div>
    <CandyBar src='img/chocolate-bar.png' />
    <AuthenticationForm submitTitle='Sign In' onSubmit={handleSignin} />
    <Link to='/'>Need an account? Sign up.</Link>
  </div>
)

export default SigninPage
