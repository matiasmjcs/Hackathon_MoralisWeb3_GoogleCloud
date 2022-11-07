import ReactDOM from 'react-dom'
import React, { useState, useContext } from "react";
import Swal from 'sweetalert2'
import Abi from '../../utils/medicalCenter.json';
import { ethers } from "ethers";
import Input from '../input/input';
import Loading2 from '../loading2/loading2';
import { UserContext } from '../../context/userProvider';
import ButtonClose from '../buttonClose/buttonClose';

const SignAttention = ({close}) => {


    const { active } = useContext(UserContext)

    // direccion del contrato
    const address = "0x2891BA44A9105C0F66b514A3655deef3587d70fC";
    // abi
    const abi = Abi.abi;

    const [loading, setLoading] = useState(false);
    // useState para almacenar ID
    const [ID, setID] = useState("");

    const onIDChange = (event) => {
        setID(event.target.value);
    }

    // funcion poara firmar atencion
    const signAttention = async () => {
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

                console.log("firmando etencion..")
                const tx = await contract.patientToSignature(
                    ID
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
    };

    const handleSubmit = (e) => {

        if (!ID.trim()) {
            e.target.ID.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Do not leave the name field empty',
            })
        }
        signAttention()

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
                {loading ? <Loading2/> :
                <div className='registerDiv__divForm'> 
                        <h4>sign Attention</h4>

                <label>
                    ID of attention
                </label>
                <Input
                    name='ID'
                    type='text'
                    placeholder='ID '
                    onChange={onIDChange}
                >
                </Input>

                <button
                    type="submit"

                        >sign Attention</button>
                        <ButtonClose close={close}/>
                    </div>}
            </form>
    </div>,
        document.getElementById('signAttention')

  )
}

export default SignAttention