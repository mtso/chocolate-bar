import React from 'react'
import { Link } from 'react-router-dom'
import CandyBar from '../components/CandyBar'
import AuthenticationForm from '../components/AuthenticationForm'

const SignupPage = ({ handleSignup }) => (
  <div>
    <CandyBar src='img/chocolate-bar.png' />
    <AuthenticationForm submitTitle='Sign Up' onSubmit={handleSignup} />
    <Link to='/signin'>Already have an account? Sign in.</Link>
  </div>
)

export default SignupPage
