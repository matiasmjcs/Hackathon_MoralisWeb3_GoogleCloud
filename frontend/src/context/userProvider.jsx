import { createContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import Loading from '../components/loading/loading'

export const UserContext = createContext()

const UserProvider = ({children}) => {

    // useState to store connected wallet
    const [currentAccount, setCurrentAccount] = useState("");
    // useState to store status of the connected account 
    const [active, setActive] = useState(false);
    const [card, setCard] = useState(false);
    const [view, setView] = useState('');
    const [boxMetamask, setBoxMetamask] = useState(false)
    const [loading, setLoading] = useState(false)
    const [red, setRed] = useState(false)
    const [redState, setRedState] = useState('Switch Network')
    const [conectado, setConectado] = useState(false)

    //BoxMetamask
    const openBoxMetamask = () => {
        setBoxMetamask(true)
    }

    const closeBoxMetamask = () => {
        setBoxMetamask(false)
    }

    const Switch = async () => {
        try{
            setRedState(<Loading />)
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x61' }],
            });
            setTimeout(() => {
                setRed(true)
            }, 1500)
        }
        catch {
            setRed(false)
            setRedState('Switch Network')
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: ' connect to the binance smart chain network',
            })

        }
      
    }

    // function to loggin with metamask
    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            setActive(true);
            setView(<Loading />)
            setLoading(true)
            if (!ethereum) {
                console.log("please install MetaMask");
            }
            setTimeout(async ()=> {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts'
                });
                setConectado(true)
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                const binanceTestChainId = '0x61'
                if (chainId === binanceTestChainId) {
                    setRed(true)
                } else {
                    setTimeout(() => {
                        setRed(false)
                    }, 1500)
                    setRedState('Switch Network')


                }

                setTimeout(() => {
                    setCurrentAccount(accounts[0]);
                    setView('view user')
                }, 800);
                setBoxMetamask(false)
                setLoading(false)
            },1000)
            

        } catch (error) {
            console.log(error);
            setView('connect Wallet')
            setLoading(false)
            setActive(false);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'the wallet has not been connected',
            })
        }
    }

    

    const Disconnet = () => {
        setActive(false)
        setCard(false)
        setRed(true)
    }

    const openCard = () => {
        card ? setCard(false) : setCard(true)
    }

    const closeCard = () => {
        setCard(false)
    }

    return (
        <UserContext.Provider 
            value={{ 
                currentAccount,
                active, 
                view, 
                connectWallet, 
                Disconnet, 
                openCard, 
                closeCard, 
                card, 
                boxMetamask, 
                openBoxMetamask, 
                closeBoxMetamask, 
                loading, 
                red,
                Switch,
                redState,
                conectado
            }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider