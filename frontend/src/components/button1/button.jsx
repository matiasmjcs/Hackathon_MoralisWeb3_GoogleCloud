import React from 'react'
import './button.css'

const Button = ({text, clase, onclick}) => {
  return (
    <button onClick={onclick} className={clase}> {text}
    </button>
  )
}

export default Button