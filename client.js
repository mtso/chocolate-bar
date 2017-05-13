import React from 'react'
import ReactDom, { render } from 'react-dom'
import { default as request } from 'superagent'
import { App } from './app/App'

request
  .post('/')
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) { return console.error(err) }
    render(
      <App username={res.body.username} />,
      document.getElementById('app')
    )
  })
