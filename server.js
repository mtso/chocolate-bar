const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')
const client = redis.createClient(process.env.REDIS_URL)
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const passport = require('passport')
const Strategy = require('passport-local').Strategy

import React from 'react'
import { renderToString } from 'react-dom/server'

const port = process.env.PORT || 3750
import { App } from './app/App.jsx'

// Configure passport.

passport.use(new Strategy(
  (username, password, done) => {
    client.get(username, (err, storedPass) => {
      if (err) { return done(err) }
      if (!storedPass) {
        return client.set(username, password, (err) => done(err, { username }))
      }
      if (storedPass != password) { return done(null, false) }
      return done(null, { username })
    })
  }
))

passport.serializeUser((user, done) => {
  done(null, user.username)
})

passport.deserializeUser((username, done) => {
  client.get(username, (err, pass) => {
    if (err) { return done(err) }
    done(null, { username })
  })
})

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'app'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
  store: new RedisStore({ client, url: process.env.REDIS_URL }),
  secret: process.env.SESSION_SECRET || 'localsecret',
  resave: false,
  saveUninitialized: false,
}))
app.use(express.static(path.resolve(__dirname, 'dist')))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(passport.initialize())
app.use(passport.session())

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) return next(err)
    if (!user) {
      return res.json({success: false})
    }
    req.logIn(user, (err) => {
      if (err) { return next(err) }
      res.json({
        success: true,
        username: user.username,
      })
    })
  })(req, res, next)
})

app.get('/', (req, res) => {
  const markup = renderToString(<App />)
  res.render('index', { markup })
})

// Render client on startup

webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.error(err)
  }
  app.listen(port, () => console.log('listening on', port))
})

module.exports = app