import React, { Component } from 'react'
import { CandyBar } from './components/CandyBar'
import { SignIn } from './components/SignIn'
import { Home } from './components/Home'

export class App extends Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      username: '', 
    }
    this.handleSignin = this.handleSignin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleSignin(e, username) {
    e.preventDefault()
    this.setState({
      isLoggedIn: true,
      username,
    })
  }
  handleLogout(e) {
    e.preventDefault()
    this.setState({
      isLoggedIn: false,
    })
  }
  render() {
    const img = this.state.isLoggedIn
      ? 'img/chocolate-bar-opened.png' 
      : 'img/chocolate-bar.png'

    console.log('rendering', this.state.username)
    return (
      <div id='container'>
        <CandyBar src={img} />
        { this.state.isLoggedIn
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