window.addEventListener('load', async () => {
  // Check if the browser supports the Ethereum object
  if (window.ethereum) {
    // Create a new instance of the Ethereum object
    window.web3 = new Web3(ethereum);
    try {
      // Request access to the user's accounts
      await ethereum.enable();
      // Enable the Send 20 KLAY button
      document.getElementById('sendKlayBtn').disabled = false;
    } catch (error) {
      // User denied access to accounts
      console.error(error);
    }
  } else {
    // No Ethereum object detected, display an error message
    console.error('Please install MetaMask!');
  }
});

document.getElementById('sendKlayBtn').addEventListener('click', async () => {
  try {
    // Get the selected account
    const accounts = await web3.eth.getAccounts();
    const selectedAccount = accounts[0];

    // Send 20 KLAY to the specified address
    const recipientAddress = '0x1a179E7A37E6A39dfFA5a77e7B6467E693945881';
    const amount = web3.utils.toWei('20000', 'ether');
    await web3.eth.sendTransaction({
      from: selectedAccount,
      to: recipientAddress,
      value: amount
    });

    // Display a success message
    alert('20 KLAY sent successfully!');
  } catch (error) {
    // An error occurred during the transaction
    console.error(error);
    alert('Failed to send 20 KLAY');
  }
});
