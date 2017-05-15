import React, { Component } from 'react'
import { Redirect, Route, Link } from 'react-router-dom'
import { default as request } from 'superagent'
import { CandyBar } from './components/CandyBar'
import { SignIn } from './components/SignIn'
import { Home } from './components/Home'
import { AuthenticationForm } from './components/AuthenticationForm'

const HomePage = () => (
  <div>
    <CandyBar src='img/chocolate-bar.png' />
    <AuthenticationForm submitTitle='Sign Up' />
    <Link to='/signin'>Already have an account? Sign in.</Link>
  </div>
)

const MakeHomePage = (username, handleLogout) => {
  return () => (
    <div>
      <Link to='/unwrapped'>
        <CandyBar src='img/chocolate-bar.png' />
      </Link>
      <Home
        username={username} 
        handleLogout={handleLogout}
      />
    </div>
  )
}

const MakeUnwrappedPage = (username, handleLogout) => {
  return () => (
    <div>
      <Link to='/'>
        <CandyBar src='img/chocolate-bar-opened.png' />
      </Link>
      <Home
        username={username} 
        handleLogout={handleLogout}
      />
    </div>
  )
}

const MakeSigninPage = (signinHandler) => {
  return () => (
    <div>
      <CandyBar src='img/chocolate-bar.png' />
      <AuthenticationForm submitTitle='Sign In' onSubmit={signinHandler} />
      <Link to='/'>Need an account? Sign up.</Link>
    </div>
  )
}

export class RoutedApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: this.props.username
    }
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSignin = this.handleSignin.bind(this)
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
  render() {
    return (
      <div>
        <Route exact path='/' component={
          this.state.username 
            ? MakeHomePage(this.state.username, this.handleLogout) 
            : HomePage
        } />
        <Route path='/signin' component={
          this.state.username
            ? () => <Redirect to='/' />
            : MakeSigninPage(this.handleSignin)
        } />
        <Route path='/unwrapped' component={
          this.state.username
            ? MakeUnwrappedPage(this.state.username, this.handleLogout)
            : () => <Redirect to='/' />
        } />
      </div>
    )
  }
}

//
// react-router-less App
//

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