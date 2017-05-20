import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { default as request } from 'superagent'

import SignupPage from './pages/Signup'
import SigninPage from './pages/Signin'
import HomePage from './pages/Home'
import UnwrappedPage from './pages/Unwrapped'

export class RoutedApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: this.props.username
    }
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSignin = this.handleSignin.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
  }
  handleLogout(e) {
    e.preventDefault()
    request
      .get('/logout')
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.body) { return console.error(err) }
        if (res.body.success) {
          this.setState({
            username: null,
          })
        } else {
          console.error('could not logout', res.body)
        }
      })
  }
  handleSignin(e) {
    e.preventDefault()
    let username = e.target.elements['username'].value
    let password = e.target.elements['password'].value
    request
      .post('/login')
      .send({ username, password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.body) { return console.error(err) }
        if (res.body.success) {
          this.setState({
            username,
          })
        } else {
          // invalid password for username
        }
      })
  }
  handleSignup(e) {
    e.preventDefault()
    let username = e.target.elements['username'].value
    let password = e.target.elements['password'].value
    request
      .post('/signup')
      .send({ username, password })
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err || !res.body) { return console.error(err) }
        if (res.body.success) {
          this.setState({
            username,
          })
        }
      })
  }
  render() {
    return (
      <div>
        <Route exact path='/' component={
          this.state.username 
            ? () => <HomePage 
                      username={this.state.username}
                      handleLogout={this.handleLogout}
                    />
            : () => <SignupPage handleSignup={this.handleSignup} />
        } />
        <Route path='/signin' component={
          this.state.username
            ? () => <Redirect to='/' />
            : () => <SigninPage handleSignin={this.handleSignin} />
        } />
        <Route path='/unwrapped' component={
          this.state.username
            ? () => <UnwrappedPage
                      username={this.state.username}
                      handleLogout={this.handleLogout}
                    />
            : () => <Redirect to='/' />
        } />
      </div>
    )
  }
}
