import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; 
import './style.css';

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [sepoliaETHBalance, setSepoliaETHBalance] = useState(0);
  const [vandidocoinBalance, setVandidocoinBalance] = useState(0);
  const [pendingClaim, setPendingClaim] = useState(0);
  const [icoStatus, setICOStatus] = useState({});
  const [amount, setAmount] = useState(0);


  useEffect(() => {
    async function loadWeb3() {
      if (typeof window !== 'undefined' && window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        try {
          // Request user permission to connect
          await window.ethereum.enable();
          
          // Get accounts
          const accounts = await web3Instance.eth.getAccounts();
  
          if (accounts.length > 0) {
            // Account available
            setWeb3(web3Instance);
            setAccount(accounts[0]);
          } else {
            console.error("No Ethereum accounts available.");
          }
        } catch (error) {
          console.error("Error while enabling MetaMask:", error);
        }
      } else {
        console.error("MetaMask not detected.");
      }
    }
  
    loadWeb3();
  }, []);
  

  useEffect(() => {
    if (web3) {
      // Load Ethereum wallet balance
      const loadEthBalance = async () => {
        const balanceWei = await web3.eth.getBalance(account);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        setSepoliaETHBalance(balanceEth);
      };

      loadEthBalance();
    }
  }, [web3, account]);

  const investInICO = async (amount) => {
    // Implement the function to invest in the ICO
  };

  const claimVandidocoin = async () => {
    // Implement the function to claim Vandidocoin tokens
  };

  return (
    <div className="center-container">
      <h1>VANDIDOCOIN INTERFACE</h1>
      <h2>Current Wallet: {account}</h2>
      <div className="hovered-box">
        <p><strong>1 SEPOLIA = 90 VANDIDOCOINS</strong></p>
        <p>Sepolia-ETH Balance: {sepoliaETHBalance} ETH</p>
        <p>Vandidocoin Balance: {vandidocoinBalance} Vandidocoin</p>
        <p>Pending Claim: {pendingClaim} Vandidocoin</p>
        <p>ICO Status:</p>
        {/* Display ICO status details */}
      </div>
      <div>
        <h2>Invest in ICO</h2>
        <input type="number" placeholder="Amount in ETH" />
        <button onClick={() => investInICO(amount)}>Invest</button>
      </div>
      <div>
        <h2>Claim Vandidocoin</h2>
        <button onClick={claimVandidocoin}>Claim</button>
      </div>
    </div>
  );
};

export default App;






