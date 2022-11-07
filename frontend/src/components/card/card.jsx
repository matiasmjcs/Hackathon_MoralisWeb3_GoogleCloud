import ReactDOM from 'react-dom'
import React from 'react'
import { NavLink } from 'react-router-dom'
import './card.css'
import Button from '../button1/button'
import { Metamask } from '@web3uikit/icons';

 const Card = ({accounts, Disconnet, close}) => {

    return ReactDOM.createPortal(
        <div className="card">
            <div className='card__containerBalance'>
                <Metamask className='metamask' fontSize="50px" />
                <div className='card__span card__spanAccounts'>
                    <p>
                        <span className='blue'>Account</span>  <br/>
                        {accounts}
                    </p>
                        <hr/>
                </div>
            </div>
            <div className='containerButton'>
                <NavLink to='/transactions' onClick={close} style={{textDecoration: 'none'}}>
                    <Button text='history' clase='card__button1' />
                </NavLink>
                <Button onclick={Disconnet} text='sign out' clase='card__button2' />
            </div>
        </div>,
        document.getElementById('card')
    )
}

export default Card