import React from 'react'

const Spaces = ({ spaceLength, className }) => {
  const spaceUnit = "_"
  let spaces = ""
  for (let i = 0; i < spaceLength; i++) {
    spaces += spaceUnit
  }
  return (
    <span className={className} style={{opacity: "0"}}>
      {spaces}
    </span>
  )
};

export default Spaces
