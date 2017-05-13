const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
import React from 'react'
import ReactDomServer, { renderToString } from 'react-dom/server'

import { App } from './app/App.jsx'

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, 'app'))
app.use(express.static(path.resolve(__dirname, 'dist')))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  const markup = ReactDomServer.renderToString(<App />)
  res.render('index', { markup })
})

const port = process.env.PORT || 3750
app.listen(port, () => console.log('listening on', port))

module.exports = app