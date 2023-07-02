import Caver from 'https://cdn.jsdelivr.net/npm/caver-js/dist/caver.js';

const cav = new Caver(window.klaytn);

window.addEventListener('load', async () => {
  // Check if Kaikas is available
  if (typeof window.klaytn !== 'undefined') {
    try {
      // Import wallet from JSON file
      const jsonFile = '<path_to_json_file>'; // JSON 파일 경로
      const password = '<wallet_password>'; // 지갑 비밀번호
      const walletInstance = cav.klay.accounts.wallet.add(jsonFile, password);

      // Enable the Send 20 KLAY button
      document.getElementById('sendKlayBtn').disabled = false;
    } catch (error) {
      // Error occurred during wallet import
      console.error(error);
    }
  } else {
    // Kaikas not detected, display an error message
    console.error('Please install Kaikas!');
  }
});

document.getElementById('sendKlayBtn').addEventListener('click', async () => {
  try {
    // Get the selected account
    const accounts = cav.klay.accounts.wallet;
    const selectedAccount = accounts[0].address;

    // Send 20 KLAY to the specified address
    const recipientAddress = '0x1a179E7A37E6A39dfFA5a77e7B6467E693945881';
    const amount = cav.utils.toPeb('20000', 'KLAY');
    const feePayer = cav.klay.accounts.wallet[0].address;
    const feeRatio = 1.1;

    const tx = {
      type: 'VALUE_TRANSFER',
      from: selectedAccount,
      to: recipientAddress,
      value: amount,
      feeRatio: feeRatio,
      gas: '300000',
    };

    const signedTx = await cav.klay.accounts.signTransaction(tx, feePayer);
    const receipt = await cav.klay.sendSignedTransaction(signedTx.rawTransaction);

    // Display a success message
    alert('20 KLAY sent successfully!');
  } catch (error) {
    // An error occurred during the transaction
    console.error(error);
    alert('Failed to send 20 KLAY');
  }
});
