import ReactDOM from 'react-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/userProvider'
import { Metamask } from '@web3uikit/icons';
import ButtonClose from '../buttonClose/buttonClose';
import Loading2 from '../loading2/loading2';
import  './BoxMetamask.css'


const BoxMetamask = () => {

    const { connectWallet, closeBoxMetamask, loading } = useContext(UserContext)

    return ReactDOM.createPortal(
        <div className='registerDiv'>
            <div className="registerDiv__formMedical registerDiv__formMedical2" style={{ boxShadow: 'none', width: '250px', height: '250px'}}>
                {loading ? <Loading2/> :
                <>
                        <button className='registerDiv__buttonMetamask'  onClick={connectWallet}>
                            <Metamask className='registerDiv__buttonMetamask--M' />
                </button>
                <strong style={{color: 'gray'}}>MetaMask</strong> 
                </> }
                <ButtonClose close={closeBoxMetamask}/>
            </div>
        </div>,
        document.getElementById('boxMetamask')
    )
}

export default BoxMetamask