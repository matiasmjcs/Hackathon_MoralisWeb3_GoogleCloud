import './patient.css';
import React from 'react'
import { useState } from 'react'
import Button from '../../components/button1/button'
import SeeRegister from '../../components/seeRegister/seeRegister'
import SeeSpecialist from '../../components/seeSpecialist/seeSpecialist'
import SeePatient from '../../components/seepatients/seePatient'
import SeeAttentions from '../../components/seeAttentions/seeAttentions'
import RegisterPatient from '../../components/registerPatient/registerPatient';
import SignAttention from '../../components/signAttention/signAttention';


const Patient = () => {

    const [seeRegister, setSeeRegister] = useState(false)
    const [seeSpecialist, setSeeSpecialist] = useState(false)
    const [seePatient, setSeePatient] = useState(false)
    const [seeAttentions, setSeeAttentions] = useState(false)
    const [registerPatient, setRegisterPatient] = useState(false)
    const [signAttention, setSignAttention] = useState(false)


    // SeeRegister
    const openSeeRegister = () => {
        setSeeRegister(true)
    }

    const closeSeeRegister = () => {
        setSeeRegister(false)
    }

    // SeeSpecialist
    const openSeeSpecialist = () => {
        setSeeSpecialist(true)
    }

    const closeSeeSpecialist = () => {
        setSeeSpecialist(false)
    }

    // Seepatient
    const openSeePatient = () => {
        setSeePatient(true)
    }

    const closeSeePatient = () => {
        setSeePatient(false)
    }

    // seeAttentions
    const openSeeAttentions = () => {
        setSeeAttentions(true)
    }

    const closeSeeAttentions = () => {
        setSeeAttentions(false)
    }

    const openRegisterPatient = () => {
        setRegisterPatient(true)
    }

    const closeRegisterPatient = () => {
        setRegisterPatient(false)
    }

    
    const openSignAttention = () => {
        setSignAttention(true)
    }

    const closeSignAttention = () => {
        setSignAttention(false)
    }

    return (
        <main className="mainSpecialist mainSpecialist--2">
            <div className='mainSpecialist__container'>
                <div className="mainSpecialist__div mainSpecialist__div1">
                    <h3 className="mainSpecialist__titulo1">register as a Patient </h3>
                    <p className="mainSpecialist__parrafo1">register your profile as a patient to be able to store medical records</p>
                    <Button text='Register' onclick={openRegisterPatient} />
                </div>
                <div className="mainSpecialist__div mainSpecialist__div2">
                    <h3 className="mainSpecialist__titulo1">sign for medical attention</h3>
                    <p className="mainSpecialist__parrafo2">sign a medical attention to indicate that you agree with the stipulations of the document. </p>
                    <Button text='Sign' onclick={openSignAttention}  />
                </div>
                <div className="mainSpecialist__div mainSpecialist__div3">
                    <h3 className="mainSpecialist__titulo1">See Register</h3>
                    <p className="mainSpecialist__parrafo3">search medical record by ID number</p>
                    <Button onclick={openSeeRegister} text='See register' />
                </div>
                <div className="mainSpecialist__div mainSpecialist__div4">
                    <h3 className="mainSpecialist__titulo1">See Specialist</h3>
                    <p className="mainSpecialist__parrafo4">find a specialist through your address</p>
                    <Button onclick={openSeeSpecialist} text='See Specialist' />
                </div>
                <div className="mainSpecialist__div mainSpecialist__div3">
                    <h3 className="mainSpecialist__titulo1">see patient</h3>
                    <p className="mainSpecialist__parrafo4">search for patient by address</p>
                    <Button onclick={openSeePatient} text='see patient' />
                </div>
                <div className="mainSpecialist__div mainSpecialist__div3">
                    <h3 className="mainSpecialist__titulo1">see patient care</h3>
                    <p className="mainSpecialist__parrafo4">view patient care by patient's address</p>
                    <Button onclick={openSeeAttentions} text='See Attentions' />
                </div>
            </div>
            {seeRegister && <SeeRegister close={closeSeeRegister} />}
            {seeSpecialist && <SeeSpecialist close={closeSeeSpecialist} />}
            {seePatient && <SeePatient close={closeSeePatient} />}
            {seeAttentions && <SeeAttentions close={closeSeeAttentions} />}
            {registerPatient && <RegisterPatient close={closeRegisterPatient} />}
            {signAttention && <SignAttention close={closeSignAttention} />}


        </main>)
        
}

export default Patient