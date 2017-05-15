import React from 'react'
import ReactDom, { render } from 'react-dom'
import { default as request } from 'superagent'
import { RoutedApp } from './app/App'
import { BrowserRouter } from 'react-router-dom'

const RoutedClient = () => (
  <BrowserRouter>
    <RoutedApp />
  </BrowserRouter>
)

request
  .post('/')
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) { return console.error(err) }
    render(
      <BrowserRouter>
        <RoutedApp username={res.body.username} />
      </BrowserRouter>,
      document.getElementById('app')
    )
  })
