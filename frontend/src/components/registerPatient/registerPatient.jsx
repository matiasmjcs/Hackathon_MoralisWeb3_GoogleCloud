import ReactDOM from 'react-dom'
import React, { useState, useContext } from "react";
import Swal from 'sweetalert2'
import Abi from '../../utils/medicalCenter.json';
import { ethers } from "ethers";
import Input from '../input/input';
import Loading2 from '../loading2/loading2';
import { UserContext } from '../../context/userProvider';
import ButtonClose from '../buttonClose/buttonClose';

const RegisterPatient = ({close}) => {

    const { active } = useContext(UserContext)

    // direccion del contrato
    const address = "0x2891BA44A9105C0F66b514A3655deef3587d70fC";
    // abi
    const abi = Abi.abi;

    // useState para almacenar nombre
    const [Name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    // onChange para obtener nombre
    const onNameChange = (event) => {
        setName(event.target.value);
    }

    // funcion poara registrar paciente
    const registerPatient = async () => {
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

                const tx = await contract.registerPatient(
                    Name
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

        if (!Name.trim()) {
            e.target.Name.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Do not leave the name field empty',
            })
        }
        registerPatient()

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


return ReactDOM.createPortal (
      <div className='registerDiv'>
        <form onSubmit={validacionRed} className="registrarEspecialista registrarEspecialista--patient">
            {loading ? <Loading2/> :
                <div className='registerDiv__divForm'>
            <h4>Register Patient</h4>

              <label>
                  name
              </label>
              <Input
                name='Name'
                  type='text'
                  placeholder='name'
                  onChange={onNameChange}
              >
              </Input>

              <button
                  type="submit"
                    >register Patient</button>
                    <ButtonClose close={close}/>
                      </div>
}
          </form>
    </div>,
    document.getElementById('registerPatient')
  )
}

export default RegisterPatient