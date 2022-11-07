import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './center.css'
import Button from '../button1/button'

const Center = () => {


  useEffect(() => {
    window.scroll({ top: 0 })
  }, [])

  return (
    <main className='mainCenter'>
      <div className='mainCenter__div'>
        <h3 className='mainCenter__h3'>Are you a specialist or a patient?</h3>
        <div className='mainCenter__div-button'>
          <NavLink className='mainCenter__nav' to={'/specialists'}>
            <Button clase={'mainCenter__button1'} text={'specialist'} />
          </NavLink>
          <NavLink className='mainCenter__nav'  to={'/patients'}>
            <Button clase={'mainCenter__button2'} text={'patient'} />
          </NavLink>
        </div>
      </div>
    </main>
  )
}

export default Center