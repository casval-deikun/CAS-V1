const contractAddress = '0x92C87b1F42Ff62876E2459D9eD313A197703eF56';
const maticAmount = '20';

let web3;
let contract;

// Check if MetaMask is installed
function checkMetaMask() {
  if (typeof window.ethereum === 'undefined') {
    alert('Please install MetaMask to use this DApp.');
    return false;
  }
  return true;
}

// Connect the wallet
async function connectWallet() {
  if (!checkMetaMask()) return;

  try {
    // Request access to the user's MetaMask accounts
    await ethereum.request({ method: 'eth_requestAccounts' });

    web3 = new Web3(ethereum);
    contract = new web3.eth.Contract(contractAbi, contractAddress);

    document.getElementById('connectWalletButton').disabled = true;
    document.getElementById('sendMaticButton').disabled = false;

    console.log('Wallet connected!');
  } catch (error) {
    console.error(error);
    alert('Failed to connect wallet.');
  }
}

// Send Matic
async function sendMatic() {
  if (!checkMetaMask() || !web3) return;

  try {
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    const sender = accounts[0];

    await contract.methods.sendMatic(contractAddress, maticAmount).send({ from: sender });

    console.log(`Sent ${maticAmount} Matic from ${sender} to ${contractAddress}`);
    alert(`Sent ${maticAmount} Matic successfully!`);
  } catch (error) {
    console.error(error);
    alert('Failed to send Matic.');
  }
}

// Load web3 and contract ABI
window.addEventListener('DOMContentLoaded', () => {
  if (!checkMetaMask()) return;

  // Load web3 and contract ABI asynchronously
  Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js'),
    loadScript('contract_abi.js'),
  ])
    .then(() => {
      console.log('Web3 and contract ABI loaded!');
    })
    .catch((error) => {
      console.error('Failed to load web3 or contract ABI:', error);
      alert('Failed to load web3 or contract ABI.');
    });
});

// Load external script dynamically
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
