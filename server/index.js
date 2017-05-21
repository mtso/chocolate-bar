const path = require('path')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const redis = require('redis')
const client = redis.createClient(process.env.REDIS_URL)
const passport = require('passport')
const Strategy = require('passport-local').Strategy

import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

const port = process.env.PORT || 3750
import { RoutedApp } from '../app/App.jsx'

// Configure passport.

passport.use(new Strategy(
  (username, password, done) => {
    client.get(username, (err, storedPass) => {
      if (err) { return done(err) }
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
app.set('views', path.resolve(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(session({
  store: new RedisStore({ client, url: process.env.REDIS_URL }),
  secret: process.env.SESSION_SECRET || 'localsecret',
  resave: false,
  saveUninitialized: false,
}))
app.use(express.static(path.resolve(__dirname, '..', 'dist')))
app.use(express.static(path.resolve(__dirname, '..', 'static')))
app.use(passport.initialize())
app.use(passport.session())

app.post('/signup', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) { return next(err) }
    if (user) {
      return res.json({
        success: false,
        message: user.username + ' already exists'
      })
    } else {
      client.set(req.body.username, req.body.password, (err, result) => {
        if (err) { return next(err) }
        req.logIn({ username: req.body.username }, (err) => {
          if (err) { return next(err) }
          res.json({
            success: true,
            message: req.body.username + ' joined'
          })
        })
      })
    }
  })(req, res, next)
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) { return next(err) }
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

app.get('/logout', (req, res) => {
  req.logout()
  res.json({ success: true, isLoggedIn: false })
})

app.post('/', (req, res) => {
  if (req.user) {
    res.json({ isLoggedIn: true, username: req.user.username })
  } else {
    res.json({ isLoggedIn: false })
  }
})

app.get('/*', (req, res) => {
  const context = {}
  const markup = renderToString(
    <StaticRouter location={req.url} context={context}>
      <RoutedApp username={req.user ? req.user.username : null} />
    </StaticRouter>
  )
  if (context.url) {
    res.writeHead(302, { Location: context.url })
    res.end()
  } else {
    res.render('index', { markup })
  }
})

// Render client on startup

app.listen(port, () => console.log('listening on', port))

module.exports = app