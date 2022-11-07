import React from 'react'
import { useEffect, useContext, useState } from 'react'
import { UserContext } from '../../context/userProvider'
import './history.css'
import { API_KEY } from '../../key'
const History = () => {

  const { currentAccount } = useContext(UserContext)
  const [dato, setDato] = useState([])

  useEffect(() => {
    window.scroll({ top: 0 })
    apiMoralis(currentAccount)
  }, [currentAccount])

  const apiMoralis = async (currentAccount) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'X-API-Key': API_KEY
        }
      };

      const res = await fetch('https://deep-index.moralis.io/api/v2/0xeA0C4563AC1f33dC1866E9520229fc0a3B1b950D?chain=0x61', options);
      const data = await res.json();
      const resultado = data.result
      const filter = resultado.filter(results => results.from_address === currentAccount)
      setDato(filter)
    
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='divTxs'>
      <h3>my transactions</h3>
      {
        dato.map( Element => (
        
          <div className='divTx'>
            <div className='divTx__divSpan'>
              <span className='title'>
                Transaction Hash:
             </span>
              <span className='.divTx__divSpan--hash'>
                {Element.hash}
              </span>
            </div> 
            <div className='divTx__divSpan'>
              <span className='title'>
                date: 
              </span>
              <span>
                {Element.block_timestamp.split('T')[0]}
              </span>
            </div> 
            <div className='divTx__divSpan'>
              <span className='title'>
                time:
              </span>
              <span>
                {Element.block_timestamp.split('T')[1].split('.')[0] + ' (GMT)'}
              </span>
            </div>
            <div className='divTx__divSpan'>
              <span className='title'>
                  from:
                </span>
                <span className='.divTx__divSpan--hash'>
                  {Element.from_address}
                </span>
            </div> 
              <div className='divTx__divSpan'>
              <span className='title'>
                  contract:
                </span>
                <span className='.divTx__divSpan--hash'>
                  {Element.to_address}
                </span>
              </div> 
            <div className='divTx__divBsc'>
              <a Target="_blank" href='https://testnet.bscscan.com/'>
                View BSC Scan Testnet
              </a>
            </div> 
          </div>
        )
        )
            
      }
    </div>
  )
}

export default History