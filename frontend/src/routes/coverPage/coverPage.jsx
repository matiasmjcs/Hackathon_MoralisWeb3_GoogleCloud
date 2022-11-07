import React, { useEffect } from 'react'
import Button from '../../components/button1/button'
import './coverPage.css'
import { NavLink } from 'react-router-dom'
const img2 = require('../../img/img2.png')
const img4 = require('../../img/img4.png')


const CoverPage = () => {

  useEffect(() => {
    window.scroll({ top: 0 })
  }, [])


  return (
    <main className='main-welcome'>
      <section className='main-welcome__section1'>
        <article className='main-welcome__articulo1'>
          <h1 className='main-welcome__titulo titleOne'>
            Medical Center
          </h1> 

          <span className='main-welcome__parrafo'>keep your medical documents <br /> secure thanks to blockchain technology   <br/> <hr/>
            
            <span style={{ color: '#D0A60A' }}>built on the binance smart chain testnet network </span> </span>
          <div className='main-welcome__divButton'>
            <NavLink to='/center' className='main-welcome__button main-welcome__button1'>
              <span className='main-welcome__start'>start</span>
            </NavLink>
            <Button
              className='main-welcome__button main-welcome__button2'
              onclick={() => window.scroll({ top: 2700, behavior: 'smooth' })}
              text='Go Down'
            />
          </div>
        </article>
        <article className='main-welcome__articulo--img'>
          <div className='main-welcome__container-img'>
            <img className='' src={img4}/>
          </div>
        </article>

      </section>
      <section className='main-welcome__section2'>
        <article className='main-welcome__articulo1--what'>
          <div className='main-welcome__whatDiv'>
            <h1 className='main-welcome__titulo titleOne'>
              What is MedicalCenter?
            </h1>

            <span className='main-welcome__parrafo'>is a decentralized application that uses  <br/> <hr/>

            <span style={{ color: '#D0A60A' }}>blockchain technology to protect medical records.</span></span>
          </div>

          
            <svg className='icon1' viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><title /><path d="M40,47.5H8a3,3,0,0,1-3-3V4.5a3,3,0,0,1,3-3H40a3,3,0,0,1,3,3v40A3,3,0,0,1,40,47.5Zm-31-4H39V5.5H9v38Z" fill="#2161ff" /><rect fill="#a6c7ff" height="10" transform="translate(9 39) rotate(-90)" width="4" x="22" y="10" /><rect fill="#a6c7ff" height="10" transform="translate(48 30) rotate(-180)" width="4" x="22" y="10" /><path d="M30,29.5H18a2,2,0,0,1,0-4H30A2,2,0,0,1,30,29.5Z" fill="#a6c7ff" /><path d="M30,38.5H18a2,2,0,0,1,0-4H30A2,2,0,0,1,30,38.5Z" fill="#a6c7ff" /><rect fill="none" height="48" width="48" /></svg>
        
          
        </article>
        

        <article className='main-welcome__articulo1--what'>
          <div className='main-welcome__whatDiv'>
            <h1 className='main-welcome__titulo titleOne'>
              How this idea was born
            </h1>

            <span className='main-welcome__parrafo'>the idea of this project was born with the intention to improve the protection of medical records  <br /> <hr />
              <span style={{ color: '#D0A60A' }}>to offer the immutability of the data to the service of people in a common service of daily life.</span></span>
          </div>
          <img className='icon2' src={img2}/>
          
        </article>

        <article className='main-welcome__articulo1--what'>
          <div className='main-welcome__whatDiv'>
            <h1 className='main-welcome__titulo titleOne'>
              Start using medical center
            </h1>

            <span className='main-welcome__parrafo'>you do not need to create an account   <br /> <hr />

              <span style={{ color: '#D0A60A' }}>you only need a Metamask wallet to start recording your medical records.</span></span>
          </div>


          <NavLink to='/center' className='main-welcome__button main-welcome__button1 icon3'><span className='main-welcome__start--2'>start</span></NavLink>


        </article>
       
        
      </section>
    </main>
  )
}

export default CoverPage