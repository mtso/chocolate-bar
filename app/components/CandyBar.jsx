import React from 'react'

const stylesheet = {
  width: 440,
  height: 'auto',
}

export const CandyBar = (props) => (
  <img 
    src={props.src}
    style={stylesheet}
  />
)