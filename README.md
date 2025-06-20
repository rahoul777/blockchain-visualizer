# 🧱 Blockchain Visualizer DApp (Next.js + Hardhat + Ethers.js)

This project is a blockchain visualizer web app that lets users connect their MetaMask wallet, view blockchain blocks, and add new blocks containing custom messages.

🚀 Built with:

- **Next.js** (React frontend)
- **Hardhat** (local blockchain + smart contract deployment)
- **Ethers.js** (blockchain interaction)
- **Solidity** (smart contract)

---

## 📂 Folder Structure

```
.
├── contracts/
│   └── BlockChain.sol          # Solidity smart contract
├── scripts/
│   └── deploy.js               # Deployment script
├── frontend/
│   ├── pages/
│   │   └── index.js            # Next.js frontend logic
│   └── package.json
├── hardhat.config.js
└── README.md
```

---

## ⚙️ Prerequisites

✅ **Node.js** (v16+ recommended)  
✅ **npm** (or `yarn`)  
✅ **MetaMask** installed in your browser

---

## 🚀 Installation Steps

### 1️⃣ Clone the repo

```bash
git clone <your-repo-url>
cd <your-repo-folder>
```

---

### 2️⃣ Install dependencies

#### For Hardhat + contract:

```bash
npm install
```

#### For frontend:

```bash
cd frontend
npm install
```

_(or `yarn install`)_

---

### 3️⃣ Start the local Hardhat node

From the root:

```bash
npx hardhat node
```

➡ This runs your local blockchain at:

```
http://127.0.0.1:8545
Chain ID: 31337
```

---

### 4️⃣ Deploy the smart contract

In a new terminal (keep node running):

```bash
npx hardhat run scripts/deploy.js --network localhost
```

➡ **Copy the contract address** printed in the terminal:

```
Contract deployed to: 0xYourDeployedAddress
```

---

### 5️⃣ Update frontend with contract address

Open:

```
frontend/pages/index.js
```

Replace:

```js
const contractAddress = "0xYourDeployedAddress";
```

with your actual deployed address.

---

### 6️⃣ Run the Next.js frontend

From `frontend/`:

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

### 7️⃣ Connect MetaMask

✅ Open MetaMask  
✅ Add **localhost 8545** network if needed:

```
Network Name: Hardhat Localhost
RPC URL: http://127.0.0.1:8545
Chain ID: 31337
```

✅ Import one of the Hardhat accounts:

```
Private key: (from Hardhat node output)
```

✅ Connect wallet on the DApp

---

## ⚡ Features

- ✅ View all blockchain blocks with hash chaining
- ✅ Add new block (title, message, type: open/private)
- ✅ MetaMask wallet connect
- ✅ Proper error handling (user rejection, tx failure)

---

## 🛠 Common Commands

| Action             | Command                                                 |
| ------------------ | ------------------------------------------------------- |
| Start Hardhat node | `npx hardhat node`                                      |
| Deploy contract    | `npx hardhat run scripts/deploy.js --network localhost` |
| Start frontend     | `cd frontend && npm run dev`                            |

---

## 🚀 Future Enhancements

- D3.js or Canvas block link visualization
- IPFS or DB persistence
- Deployment to testnet

---

## 📌 Notes

⚠️ Each time you restart `npx hardhat node`, you'll need to **redeploy the contract** and **update frontend with the new address**.

---

## 🤝 License

MIT License. Feel free to use and extend!

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
