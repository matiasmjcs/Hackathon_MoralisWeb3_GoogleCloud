import ReactDOM from 'react-dom'
import './medicalRecord.css'
import React, { useState, useContext } from "react";
import Swal from 'sweetalert2'
import Abi from '../../utils/medicalCenter.json';
import { ethers } from "ethers";
import Input from '../input/input';
import Loading2 from '../loading2/loading2'; 
import ButtonClose from '../buttonClose/buttonClose';
import { UserContext } from '../../context/userProvider';


const MedicalRecord = ({ close }) => {

    const { active } = useContext(UserContext)

    // direccion del contrato
    const address = "0x2891BA44A9105C0F66b514A3655deef3587d70fC";
    // abi
    const abi = Abi.abi;


    const initialState = {
        direccionPaciente: '',
        fecha: '',
        direccion: '',
        tipoDeAtencion: '',
        diagnostico: '',
        observacion: '',
    }

    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState(initialState)

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    // funcion poara registrar atencion
    const medicalRecord = async () => {
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
                const tx = await contract.medicalRecord(
                    input.direccionPaciente,
                    input.fecha,
                    input.direccion,
                    input.tipoDeAtencion,
                    input.diagnostico,
                    input.observacion
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
            console.log(error);
        }
    }
    
    const handleSubmit = (e) => {

        if (!input.direccionPaciente.trim()) {
            e.target.direccionPaciente.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'do not leave the field empty',
            })
        }
        if (!input.fecha.trim()) {
            e.target.fecha.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'do not leave the field empty',
            })
        }
        if (!input.direccion.trim()) {
            e.target.direccion.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'do not leave the field empty',
            })
        }
        if (!input.tipoDeAtencion.trim()) {
            e.target.tipoDeAtencion.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'do not leave the field empty',
            })
        }
        if (!input.diagnostico.trim()) {
            e.target.diagnostico.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'do not leave the field empty',
            })
        }
        if (input.diagnostico.length > 80) {
            e.target.observacion.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'maximum 80 characters',
            })
        }

        if (!input.observacion.trim()) {
            e.target.observacion.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'do not leave the field empty',
            })
        }
        if (input.observacion.length > 80) {
            e.target.observacion.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'maximum 80 characters',
            })
        }

        medicalRecord()
    };

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
            <form onSubmit={validacionRed} className="registerDiv__formMedical">
                {loading ? 
                <Loading2/> : 
                <>
               
                        <h4>Register Attention</h4>
                    <div className='registerDiv__divForm2'>

                        <div className='registerDiv__divInput--2'>
                            <label>
                                Patient Address
                            </label>
                            <Input
                                name='direccionPaciente'
                                type='text'
                                placeholder='Address'
                                onChange={handleChange}
                            >
                            </Input>
                        </div>
                        


                        <div className='registerDiv__divInput--2'>

                            <label>
                                date
                            </label>
                            <Input
                                name='fecha'
                                type='date'
                                onChange={handleChange}
                            >
                            </Input>
                        </div>

                        <div className='registerDiv__divInput--2'>
                            <label>
                                Direction
                            </label>
                            <Input
                                name='direccion'
                                type='text'
                                placeholder='Direction'
                                onChange={handleChange}
                            >
                            </Input>
                        </div>

                        
                        <div className='registerDiv__divInput--2'>
                            <label>
                                type of attention
                            </label>
                            <Input
                                name='tipoDeAtencion'
                                type='text'
                                placeholder='type of attention'
                                onChange={handleChange}
                            >
                            </Input>
                        </div>
                        
                        <div className='registerDiv__divInput--2'>
                            <label>
                                diagnostic
                            </label>
                            <Input
                                name='diagnostico'
                                type='text'
                                placeholder='diagnostic'
                                onChange={handleChange}
                            >
                            </Input>
                        </div>  
                            <div className='registerDiv__divInput--2'>
                                <label>
                                    observation
                                </label>
                                <Input
                                    name='observacion'
                                    type='text'
                                    placeholder='observation'
                                    onChange={handleChange}
                                >
                                </Input>
                            </div>      
                    </div>
                        <div className='registerDiv__divInput registerDiv__divInput2'>
                            <button clase='boton'
                            type='submit'
                            >Register</button>
                                <ButtonClose close={close} />
                        </div>
                    </>
                }



            </form>
            
        </div>,
        document.getElementById('medicalRecord')
    )
} 

export default MedicalRecord