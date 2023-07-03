// caver-js 라이브러리 가져오기
const Caver = require('caver-js');

// Klaytn 네트워크에 연결
const caver = new Caver('https://api.baobab.klaytn.net:8651');

// 클라이언트의 Klaytn 지갑 주소
let clientWalletAddress = '';

// 클라이언트가 지갑 연결 버튼을 클릭할 때 실행되는 함수
async function connectWallet() {
  try {
    // Klaytn 지갑 연결
    const accounts = await caver.klay.accounts.wallet.load('your_keystore_file', 'your_keystore_password');
    clientWalletAddress = accounts[0].address;

    // 연결된 지갑 주소 출력 (예시)
    console.log('Connected wallet address:', clientWalletAddress);
  } catch (error) {
    console.error('Error connecting wallet:', error);
  }
}

// 클라이언트가 Klay를 보내는 함수
async function sendKlay() {
  try {
    // 연결된 지갑 주소가 없을 경우, 연결 요청 알림 (예시)
    if (!clientWalletAddress) {
      console.log('Please connect your wallet first.');
      return;
    }

    // Klaytn 지갑 주소로 100 Klay를 보내는 트랜잭션 생성
    const transaction = {
      from: clientWalletAddress,
      to: '0x1a179E7A37E6A39dfFA5a77e7B6467E693945881',
      value: caver.utils.toPeb('100', 'KLAY'),
      gas: '200000',
    };

    // 트랜잭션 전송
    const receipt = await caver.klay.sendTransaction(transaction);

    // 트랜잭션 완료 후 처리
    console.log('Transaction receipt:', receipt);
  } catch (error) {
    console.error('Error sending Klay:', error);
  }
}
