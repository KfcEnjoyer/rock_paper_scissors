const web3 = require('web3');
window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);

        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });

            if (accounts.length > 0) {
                const userAddress = accounts[0];
                document.getElementById('userAddress').textContent = userAddress;

                const balanceWei = await web3.eth.getBalance(userAddress);
                const balanceTBNB = web3.utils.fromWei(balanceWei, 'ether');
                document.getElementById('userBalance').textContent = balanceTBNB + ' tBNB';
            }
        } catch (error) {
            console.error('MetaMask connection error:', error);
        }
    } else {
        console.error('MetaMask not found. Please install MetaMask.');
    }
});

async function playGame(move) {
    if (typeof window.ethereum !== 'undefined') {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const ABI = [
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "internalType": "address",
                        "name": "player",
                        "type": "address"
                    },
                    {
                        "indexed": false,
                        "internalType": "enum RockPaperScissors.Move",
                        "name": "playerMove",
                        "type": "uint8"
                    },
                    {
                        "indexed": false,
                        "internalType": "enum RockPaperScissors.Move",
                        "name": "opponentMove",
                        "type": "uint8"
                    },
                    {
                        "indexed": false,
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "internalType": "bool",
                        "name": "isWin",
                        "type": "bool"
                    }
                ],
                "name": "GameResult",
                "type": "event"
            },
            {
                "inputs": [
                    {
                        "internalType": "enum RockPaperScissors.Move",
                        "name": "_playerMove",
                        "type": "uint8"
                    }
                ],
                "name": "play",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "gameId",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "games",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "player",
                        "type": "address"
                    },
                    {
                        "internalType": "enum RockPaperScissors.Move",
                        "name": "playerMove",
                        "type": "uint8"
                    },
                    {
                        "internalType": "enum RockPaperScissors.Move",
                        "name": "opponentMove",
                        "type": "uint8"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    },
                    {
                        "internalType": "bool",
                        "name": "isFinished",
                        "type": "bool"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getGameCount",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getUserGames",
                "outputs": [
                    {
                        "internalType": "uint256[]",
                        "name": "",
                        "type": "uint256[]"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "userGames",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        const web3 = new Web3(ethereum);
        const contractAddress = '0xc49C9FCe510aF64778A1e0Ec4E9992815522f0E4'; // Replace with your contract address
        const contract = new web3.eth.Contract(ABI, contractAddress);

        try {
            await contract.methods.play(move).send({ from: account });
            alert('Game played successfully!');
        } catch (error) {
            console.error(error);
            alert('An error occurred while playing the game.');
        }
    } else {
        alert('Please install MetaMask to use this app.');
    }
}
