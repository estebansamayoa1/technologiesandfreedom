import Web3 from 'web3';

let web3;

async function initWeb3() {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    // MetaMask is available
    web3 = new Web3(window.ethereum);
    try {
      await window.ethereum.enable();
    } catch (error) {
      console.error(error);
    }
  } else {
    // Fallback provider URL (e.g., Infura)
    const providerUrl = 'https://mainnet.infura.io/v3/your-infura-api-key';
    web3 = new Web3(providerUrl);
  }
}

initWeb3();

export default web3;


