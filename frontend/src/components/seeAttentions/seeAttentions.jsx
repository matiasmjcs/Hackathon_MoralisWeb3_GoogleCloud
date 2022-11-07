import ReactDOM from 'react-dom'
import './seeAttentions.css'
import React, { useState, useContext } from 'react'
import Swal from 'sweetalert2'
import Abi from '../../utils/medicalCenter.json';
import { ethers } from "ethers";
import Input from '../input/input';
import Button from '../button1/button';
import { UserContext } from '../../context/userProvider';
import ButtonClose from '../buttonClose/buttonClose';

const SeeAttentions = ({close}) => {

    const { active } = useContext(UserContext)

    // direccion del contrato
    const address = "0xeA0C4563AC1f33dC1866E9520229fc0a3B1b950D";
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
    const seeAttentions = async (e) => {
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
                const tx = await contract.returnCare(
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

        seeAttentions()
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
            <div className="registerDiv__formMedical">

            {truee ?
                  <>
                  <ul className="atenciones4">
                      {Tx.map(atenciones => (
                        
                              <li className='registerDiv__li registerDiv__li2'>{atenciones}</li>
                          
                          
                      ))
                      }
                      </ul> 
                        <ButtonClose close={close} />
                        </>
                        :
                  

                    <form className='form-atencion' onSubmit={validacionRed} >
                      <div className='registerDiv__divForm'>

                       
                      <h4>See Attentions</h4>

                      <label>
                          address Patient
                      </label>
                      <Input
                          type='text'
                          name='addressPaciente'
                          placeholder='address Patient'
                          onChange={onAddressPacienteChange}
                      >
                      </Input>

                      <Button
                          type="submit"
                          text='See Attentions'
                      />
                      <ButtonClose close={close} />

                      </div>
                  </form>
        }
           
               
              
          </div>
    </div>,
      document.getElementById('seeAttentions')
  )
}

export default SeeAttentions