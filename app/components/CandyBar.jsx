import React from 'react'

const stylesheet = {
  width: 440,
  height: 320, //'auto',
}

export const CandyBar = (props) => (
  <img 
    src={props.src}
    style={stylesheet}
  />
)