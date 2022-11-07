import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import './seeRegister.css'
import Swal from 'sweetalert2'
import Abi from '../../utils/medicalCenter.json';
import { ethers } from "ethers";
import Input from '../input/input';
import Button from '../button1/button';
import { UserContext } from '../../context/userProvider';
import ButtonClose from '../buttonClose/buttonClose';
import { jsPDF } from 'jspdf'
import img from '../../img/img5.png'


const SeeRegister = ({close}) => {

    const { active } = useContext(UserContext)

    // direccion del contrato
    const address = "0x2891BA44A9105C0F66b514A3655deef3587d70fC";
    // abi
    const abi = Abi.abi;

    // useState para almacenar ID
    const [ID, setID] = useState("");
    const [truee, setTruee] = useState(false);
    const [Tx, setTx] = useState({});

    const [verPdf, setVerPdf] = useState(false);


    // onChange para obtener diagnostico
    const onIDChange = (event) => {
        setID(event.target.value);
    }

    // funcion pora ver paciente
    const seeRegister = async () => {
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
                const tx = await contract.seeMedicalAttention(
                    ID
                );
                    setTruee(true);
                    setTx(tx);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {

        if(!ID.trim()) {
            e.target.ID.focus()
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'do not leave the input empty'
            })
        }

        seeRegister()
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

    let signed = '';

    if (Tx[8] === true){
        signed = 'Signed'
    }
    else {
        signed = 'Unsigned'
    }

    // console.log(Tx)
    const doc = new jsPDF()
    doc.setFontSize(25);
    doc.addImage(img, 'PNG', 150, 230, 50, 50)
    doc.setFont('courier')
    doc.text('Medical Center', 67, 25)
    doc.setFontSize(13);
    doc.setTextColor('black')
    doc.text(`Specialist's address:`, 10, 50)
    doc.text(`Patient's address:`, 10, 70,)
    doc.text(`Attention id:`, 10, 87)
    doc.text(`Date:`, 10, 110)
    doc.text(`Direction:`, 10, 130)
    doc.text(`Type of attention:`, 10, 150)
    doc.text(`Diagnostic:`, 10, 170)
    doc.text(`Observations:`, 10, 190)
    doc.text(`Patient signature:`, 10, 275)
    
    doc.setTextColor('#666')
    doc.text(`${Tx[0]}`, 70, 50)
    doc.text(`${Tx[1]}`, 60, 70,)
    doc.text(`${Tx[2]}`, 10, 95)
    doc.text(`${Tx[3]}`, 30, 110)
    doc.text(`${Tx[4]}`, 42, 130)
    doc.text(`${Tx[5]}`, 65, 150)
    doc.setFontSize(10);
    doc.text(`${Tx[6]}`, 10, 180)
    doc.text(`${Tx[7]}`, 10, 202)
    doc.setFontSize(13);
    doc.text( `${signed}` , 62, 275)
    

    const save = () => {
        doc.save('MedicalCenter.pdf')
    }

  return ReactDOM.createPortal(
      <div className='registerDiv'>
          <div className="registerDiv__formMedical registerDiv__formMedical--2">

              
                {truee ?                 
                 <>
                  
                  <ul className="atencion">
                      <h3>Medical Register</h3> 
                      <li className='registerDiv__li registerDiv__li--scroll'> <strong>specialist's address: </strong>  {Tx[0]}</li>
                      <li className='registerDiv__li registerDiv__li--scroll'><strong>patient's address: </strong>  {Tx[1]}</li>
                      <li className='registerDiv__li registerDiv__li--scroll'><strong>attention id: </strong>  {Tx[2]}</li>
                      <li className='registerDiv__li'><strong>Date: </strong>  {Tx[3]}</li>
                      <li className='registerDiv__li'><strong>Direction: </strong>  {Tx[4]}</li>
                      <li className='registerDiv__li'><strong>type of attention: </strong>  {Tx[5]}</li>
                      <li className='registerDiv__li'><strong>Diagnostic: </strong>  {Tx[6]}</li>
                          <li className='registerDiv__li'><strong>observations: </strong>  {Tx[7]}</li>
                          <li className='registerDiv__li'><strong>patient signature: </strong>  {Tx[8] === true ? 'signed' : 'unsigned' }</li>
                  </ul>
                      <button style={{ margin: '15px' }} onClick={save}>download  PDF</button>
                      {verPdf === false && <ButtonClose className={'container-icon'} close={close}/>}
                      {verPdf === true && <ButtonClose close={close} className='inactive'/>}
                  </> : 

                  <>
                      <form className='form-atencion' onSubmit={validacionRed}>

                          <div className='registerDiv__divForm'>
                            <h4>See Register</h4>

                            <label>
                                id of attention
                            </label>
                            <Input
                                type='text'
                                name='ID'
                                placeholder='id of attention'
                                onChange={onIDChange}
                            >
                            </Input>

                            <Button
                                type='submit'
                                text='See Register'
                            />
                            <ButtonClose close={close} />
                        </div>


                          </form>
                  </>

                }

             
          </div>
    </div>,
    document.getElementById('seeRegister')
  )
}

export default SeeRegister