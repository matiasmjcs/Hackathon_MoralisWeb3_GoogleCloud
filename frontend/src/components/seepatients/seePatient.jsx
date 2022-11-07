import ReactDOM from 'react-dom'
import React, { useState, useContext } from 'react'
import Swal from 'sweetalert2'
import Abi from '../../utils/medicalCenter.json';
import { ethers } from "ethers";
import Input from '../input/input';
import Button from '../button1/button';
import { UserContext } from '../../context/userProvider';
import ButtonClose from '../buttonClose/buttonClose';
import './seePatient.css'

const SeePatient = ({close}) => {

    const { active } = useContext(UserContext)

    // direccion del contrato
    const address = "0x2891BA44A9105C0F66b514A3655deef3587d70fC";
    // abi
    const abi = Abi.abi;

    const [truee, setTruee] = useState(false);
    const [Tx, setTx] = useState({});
    // useState para almacenar ID
    const [addressPaciente, setAddressPaciente] = useState("");

    // onChange para obtener address
    const onAddressPacienteChange = (event) => {
        setAddressPaciente(event.target.value);
    }

    // funcion pora ver paciente
    const seePatient = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum, "any");
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    address,
                    abi,
                    signer
                );
                const tx = await contract.seePatient(
                    addressPaciente
                );

                console.log(tx);
                setTx(tx);
                setTruee(true);
        

            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {

        if (!addressPaciente.trim()) {
            e.target.addressPaciente.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'do not leave the input empty'
            })
        }

        seePatient()
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
          <div className="registerDiv__formMedical registerDiv__formMedical--2">
              {truee ?
                  <ul className='atencion3'>
                    {<>
                            <h3>See Patient</h3>
                        <li className='registerDiv__li'> <strong>name: </strong> {Tx[0]}</li>
                            <li className='registerDiv__li registerDiv__li--scroll'> <strong>Address: </strong>{Tx[1].toString()}</li>
                    </>}
           </ul> :
                    <form className='form-atencion' onSubmit={validacionRed}>
                      <div className='registerDiv__divForm'>


                          <h4>See Patient</h4>

                          <label>
                              address Patient
                          </label>
                          <Input
                              name='addressPaciente'
                              type='text'
                              placeholder='address patient'
                              onChange={onAddressPacienteChange}
                          />


                          <Button
                              text='See patient'
                              type="button"
                          />
                            <ButtonClose close={close} />

                      </div>
                  </form>
            }
              
              <div className="paciente">

              </div>
                <ButtonClose close={close} />
          </div>
    </div>,
        document.getElementById('seePatient')

  )
}

export default SeePatient