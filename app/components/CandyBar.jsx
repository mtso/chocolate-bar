import React from 'react'

const stylesheet = {
  width: 440,
  height: 320,
}

const CandyBar = ({ src }) => (
  <img 
    src={src}
    style={stylesheet}
  />
)

export default CandyBar