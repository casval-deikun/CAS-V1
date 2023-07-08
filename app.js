const Web3 = require("web3");
const { useState, useEffect } = React;

const App = () => {
    const [connected, setConnected] = useState(false);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com"));

        web3.eth.getBalance("0x92C87b1F42Ff62876E2459D9eD313A197703eF56", (err, balance) => {
            if (err) {
                console.log(err);
            } else {
                setBalance(balance);
            }
        });
    }, []);

    const connectWallet = () => {
        window.ethereum.request({
            method: "eth_requestAccounts",
        }).then(accounts => {
            if (accounts.length > 0) {
                setConnected(true);
            }
        });
    };

    const send20Matic = () => {
        if (!connected) {
            alert("Please connect your wallet.");
            return;
        }

        const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-rpc.com"));

        web3.eth.sendTransaction({
            from: accounts[0],
            to: "0x92C87b1F42Ff62876E2459D9eD313A197703eF56",
            amount: 2000000000000000000,
        }).then(txnHash => {
            console.log(txnHash);
        });
    };

    return (
        <div>
            {connected ? (
                <div>
                    <h2>Balance: {balance / 1e18}</h2>
                    <button onClick={send20Matic}>Send 20 MATIC</button>
                </div>
            ) : (
                <div>
                    <button onClick={connectWallet}>Connect Wallet</button>
                </div>
            )}
        </div>
    );
};

export default App;
