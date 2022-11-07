import React from 'react'
import './input.css'

const Input = ({ placeholder, name, type, onChange }) => {
  return (
      <input type={type} onChange={onChange} name={name} className='input' placeholder={placeholder}>
        </input>
  )
}

export default Input