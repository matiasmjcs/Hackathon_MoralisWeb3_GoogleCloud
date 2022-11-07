import ReactDOM from 'react-dom'
import './seeSpecialist.css'
import React, { useState, useContext } from 'react'
import Swal from 'sweetalert2'
import Abi from '../../utils/medicalCenter.json';
import { ethers } from "ethers";
import Input from '../input/input';
import Button from '../button1/button';
import { UserContext } from '../../context/userProvider';
import ButtonClose from '../buttonClose/buttonClose';


const SeeSpecialist = ({ close }) => {

    const { active } = useContext(UserContext)

    // direccion del contrato
    const address = "0xeA0C4563AC1f33dC1866E9520229fc0a3B1b950D";
    // abi
    const abi = Abi.abi;

    const [truee, setTruee] = useState(false);
    const [Tx, setTx] = useState({});

    // useState para almacenar ID
    const [addressEpecialista, setAddressEpecialista] = useState("");

    // onChange para obtener address
    const onAddressChange = (event) => {
        setAddressEpecialista(event.target.value);
    }

    // funcion pora ver especialista
    const seeSpecialist = async (e) => {
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
                const tx = await contract.seeSpecialist(
                    addressEpecialista
                );

                console.log(tx);
                setTruee(true)
                setTx(tx);

            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {

        if (!addressEpecialista.trim()) {
            e.target.addressEpecialista.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'do not leave the input empty'
            })
        }

        seeSpecialist()
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
                  <ul className="atencion2">

                
                      {<>
                          <h3>See Specialist</h3>
                          <li className='registerDiv__li '> <strong>name: </strong> {Tx[0]}</li>
                          <li className='registerDiv__li '> <strong>specialty: </strong> {Tx[1]}</li>
                          <li className='registerDiv__li '> <strong>Pacientes Seen: </strong> {Tx[2].toString()}</li>
                          <li className='registerDiv__li registerDiv__li--scroll'> <strong>Address: </strong> {Tx[3]}</li>
                          <li className='registerDiv__li '> <strong>contact: </strong> {Tx[4]}</li>
                          <ButtonClose close={close} />

                      </>}
                  </ul> :
                  <form className='form-atencion' onSubmit={validacionRed}>
                      <div className='registerDiv__divForm'>
                      <h4>See Specialist</h4>

                      <label>
                          address Specialist
                      </label>
                      <Input
                          name='addressEpecialista'
                          type='text'
                              placeholder='address Specialist'
                          onChange={onAddressChange}
                      >
                      </Input>

                      <Button
                          type='submit'
                          text='See Specialist'
                      />
                      <ButtonClose close={close}/>
                      </div>
                  </form>
        }
             
            
          </div>
    </div>,
      document.getElementById('seeSpecialist')
  )
}

export default SeeSpecialist