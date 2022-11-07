import { useState } from 'react'
import './specialist.css'
import Button from '../../components/button1/button'
import RegisterSpecialist from '../../components/registerSpecialist/registerSpecialist'
import MedicalRecord from '../../components/medicalRecord/medicalRecord'
import SeeRegister from '../../components/seeRegister/seeRegister'
import SeeSpecialist from '../../components/seeSpecialist/seeSpecialist'
import SeePatient from '../../components/seepatients/seePatient'
import SeeAttentions from '../../components/seeAttentions/seeAttentions'

const Specialist = () => {

    const [registerSpecialist, setRegisterSpecialist] = useState(false)
    const [medicalRecord, setMedicalRecord] = useState(false)
    const [seeRegister, setSeeRegister] = useState(false)
    const [seeSpecialist, setSeeSpecialist] = useState(false)
    const [seePatient, setSeePatient] = useState(false)
    const [seeAttentions, setSeeAttentions] = useState(false)
  
    // Register Specialist
    const openRegisterSpecialist = () => {
        setRegisterSpecialist(true)
    }
    const closeRegisterSpecialist = () => {
        setRegisterSpecialist(false)
    }

    // Medical Record
    const openMedicalRecord = () => {
        setMedicalRecord(true)
    }
    const closeMedicalRecord = () => {
        setMedicalRecord(false)
    }

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

    


    return (
        <main className="mainSpecialist mainSpecialist--2">
        <div className='mainSpecialist__container'>
            <div className="mainSpecialist__div mainSpecialist__div1">
                    <h3 className="mainSpecialist__titulo1">register as a specialist </h3>
                    <p className="mainSpecialist__parrafo1">register your profile as a specialist in order to be able to make medical records</p>
                <Button text='Register' onclick={openRegisterSpecialist}/>
            </div>
            <div className="mainSpecialist__div mainSpecialist__div2">
                    <h3 className="mainSpecialist__titulo1">to perform medical registration</h3>
                    <p className="mainSpecialist__parrafo2">perform a medical record on your patient</p>
                    <Button text='Register' onclick={openMedicalRecord}/>
            </div>
            <div className="mainSpecialist__div mainSpecialist__div3">
                    <h3 className="mainSpecialist__titulo1">See Register</h3>
                    <p className="mainSpecialist__parrafo3">search medical record by ID number</p>
                    <Button onclick={openSeeRegister} text='See register'/>
            </div>
            <div className="mainSpecialist__div mainSpecialist__div4">
                    <h3 className="mainSpecialist__titulo1">See Specialist</h3>
                    <p className="mainSpecialist__parrafo4">find a specialist through your address</p>
                    <Button onclick={openSeeSpecialist} text='See Specialist' />
            </div>
            <div className="mainSpecialist__div mainSpecialist__div3">
                    <h3 className="mainSpecialist__titulo1">see patient</h3>
                    <p className="mainSpecialist__parrafo4">search for patient by address</p>
                    <Button onclick={openSeePatient} text='see patient'  />
            </div>
            <div className="mainSpecialist__div mainSpecialist__div3">
                    <h3 className="mainSpecialist__titulo1">see patient care</h3>
                    <p className="mainSpecialist__parrafo4">view patient care by patient's address</p>
                    <Button onclick={openSeeAttentions} text='See Attentions' />
            </div>
        </div>
            {registerSpecialist && <RegisterSpecialist close={closeRegisterSpecialist}/>}
            {medicalRecord && <MedicalRecord close={closeMedicalRecord}/>}
            {seeRegister && <SeeRegister close={closeSeeRegister}/>}
            {seeSpecialist && <SeeSpecialist close={closeSeeSpecialist} />}
            {seePatient && <SeePatient close={closeSeePatient} />}
            {seeAttentions && <SeeAttentions close={closeSeeAttentions} />}
    </main>)
}

export default Specialist