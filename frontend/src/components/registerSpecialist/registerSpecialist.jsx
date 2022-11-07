import ReactDOM from 'react-dom'
import React, { useState, useContext } from "react";
import Swal from 'sweetalert2'
import Abi from '../../utils/medicalCenter.json';
import { ethers } from "ethers";
import './registerSpecialist.css'
import Input from '../input/input';
import Loading2 from '../loading2/loading2'; 
import { UserContext } from '../../context/userProvider';
import ButtonClose from '../buttonClose/buttonClose';

const RegisterSpecialist = ({close}) => {

    const { active } = useContext(UserContext)

    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    // direccion del contrato
    const address = "0xeA0C4563AC1f33dC1866E9520229fc0a3B1b950D";
    // abi
    const abi = Abi.abi;

    const initialState = {
        name: '',
        specialty: '',
        contact: ''
    }

    const [input, setInput] = useState(initialState)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    const registerSpecialist = async () => {
         try {

            const { ethereum } = window;

            if (ethereum) {
                setLoading(true)
                const provider = new ethers.providers.Web3Provider(ethereum, "any");
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    address,
                    abi,
                    signer
                );

                console.log("registrando especialista..")
                const tx = await contract.registerSpecialist(
                    input.name,
                    input.specialty,
                    input.contact
                );

                await tx.wait();
                setLoading(false)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `Hash Transactions: ${tx.hash}`,
                    showConfirmButton: true
                })
                close()

                
            }
        } catch (error) {
             setLoading(false)
             Swal.fire({
                 icon: 'error',
                 title: 'Error',
                 text: 'an error has occurred',
             })
             setInput(initialState)
            console.log(error);
        }
    }

    const handleSubmit = (e) => {

        if (!input.name.trim()){
            e.target.name.focus()
           return Swal.fire({
            icon: 'error',
            title: 'Error',
               text: 'Do not leave the name field empty',
           })
        }
        if (!input.specialty.trim()) {
            e.target.specialty.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Do not leave the specialty field empty',
            })        
        }
        if (!input.contact.trim()) {
            e.target.contact.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'do not leave the contact field empty',
            })        
        }
        if (!emailRegex.test(input.contact)) {
            e.target.contact.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'enter a valid email address',
            })
        }

        registerSpecialist()
    
    }

    const validacion = (e) => {
        if (!active) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'you must be connected to a wallet',
            })
        } else {
            handleSubmit(e)
        }
    }

    const validacionRed = async (e) => {
        e.preventDefault()
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const binanceTestChainId = '0x61'
        if (chainId === binanceTestChainId) {
            validacion(e)
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: ' connect to the binance smart chain network',
            })
        }
    }


    return ReactDOM.createPortal(
        <div className='registerDiv'>
            <form onSubmit={validacionRed} className="registrarEspecialista">
                {loading ?
                <Loading2/> :
                <div className='registerDiv__divForm'>
                    <h4>Register Specialist</h4>

                    <div className='registerDiv__divInput'>
                        <label className='label'>
                            Name
                        </label>
                        <Input
                            type='text'
                            name='name'
                            placeholder='Name'
                            onChange={handleChange}
                        >
                        </Input>

                        <label className='label'>
                            Specialty
                        </label>
                        <Input
                            type='text'
                            name='specialty'
                            placeholder='Specialty'
                            onChange={handleChange}
                        >
                        </Input>

                        <label className='label'>
                            Email
                        </label>
                        <Input
                            type='text'
                            name='contact'
                            placeholder='Email'
                            onChange={handleChange}
                        >
                        </Input>
                    </div>
                        <button
                            type="submit"
                            className='registerDiv__button'
                        >register Specialist</button>
                        <ButtonClose close={close}/>
                </div>
            }
            </form>
        </div>,
         document.getElementById('registerSpecialist'))
}

export default RegisterSpecialist