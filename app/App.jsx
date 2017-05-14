import React, { Component } from 'react'
import { default as request } from 'superagent'
import { CandyBar } from './components/CandyBar'
import { SignIn } from './components/SignIn'
import { Home } from './components/Home'

import { Route, Link } from 'react-router-dom'
import { AuthenticationForm } from './components/AuthenticationForm'

const HomePage = () => (
  <CandyBar src='img/chocolate-bar.png' />
)

const submitSignin = (e) => {
  console.log('signing in')
  e.preventDefault()
}

export const RoutedApp = () => (
  <div>
    <Link to='/'>Home</Link> <Link to='/signin'>Sign In</Link>

    <Route exact path='/' />
    <Route path='/signin' render={() => (
      <AuthenticationForm submitTitle='Sign In' onSubmit={submitSignin} />
    )} />
  </div>
)

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: this.props.username, 
    }
    this.handleSignin = this.handleSignin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleSignin(e, username, password) {
    e.preventDefault()
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
  render() {
    const img = this.state.username
      ? 'img/chocolate-bar-opened.png' 
      : 'img/chocolate-bar.png'

    return (
      <div id='container'>
        <CandyBar src={img} />
        { this.state.username
          ? <Home 
              username={this.state.username} 
              handleLogout={this.handleLogout} 
            />
          : <SignIn handleSignin={this.handleSignin} />
        }
      </div>
    )
  }
}