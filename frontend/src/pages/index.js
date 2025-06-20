import { useEffect, useState } from "react";
import { ethers } from "ethers";
import BlockChain from "../../artifacts/contracts/BlockChain.sol/BlockChain.json";

export default function Home() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    message: "",
    blockType: "open",
  });

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update this after deploy

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const userAccount = await signer.getAddress();
    setAccount(userAccount);

    const contractInstance = new ethers.Contract(
      contractAddress,
      BlockChain.abi,
      signer
    );
    setContract(contractInstance);
  };

  const fetchBlocks = async () => {
    if (!contract) return;
    const length = await contract.getLength();
    const temp = [];
    for (let i = 0; i < length; i++) {
      const block = await contract.getBlock(i);
      temp.push(block);
    }
    setBlocks(temp);
  };

  const addBlock = async (e) => {
    e.preventDefault();
    if (!contract) {
      alert("Contract not ready");
      return;
    }

    try {
      const previousHash =
        blocks.length > 0 ? blocks[blocks.length - 1].hash : "0";
      const tx = await contract.addBlock(
        form.title,
        form.message,
        form.blockType,
        previousHash
      );
      await tx.wait(); // Wait for mining
      setForm({ title: "", message: "", blockType: "open" });
      fetchBlocks();
    } catch (err) {
      if (err.code === "ACTION_REJECTED") {
        alert("❌ Transaction rejected by user.");
      } else {
        console.error("Add block failed", err);
        alert("❌ Transaction failed: " + (err.reason || "unknown error"));
      }
    }
  };

  useEffect(() => {
    if (contract) fetchBlocks();
  }, [contract]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🧱 Blockchain Visualizer</h1>

      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Connect MetaMask
        </button>
      ) : (
        <>
          <p className="mb-4">
            🔗 Connected: <strong>{account}</strong>
          </p>

          {/* Add Block Form */}
          <form onSubmit={addBlock} className="mb-6 space-y-2">
            <input
              type="text"
              placeholder="Block Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              placeholder="Block Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              className="border p-2 rounded w-full"
            />
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="blockType"
                  value="open"
                  checked={form.blockType === "open"}
                  onChange={() => setForm({ ...form, blockType: "open" })}
                />
                Open
              </label>
              <label>
                <input
                  type="radio"
                  name="blockType"
                  value="private"
                  checked={form.blockType === "private"}
                  onChange={() => setForm({ ...form, blockType: "private" })}
                />
                Private
              </label>
            </div>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add Block
            </button>
          </form>

          {/* Block List */}
          <div className="space-y-4">
            {blocks.map((block, index) => (
              <div key={index} className="border p-4 rounded shadow">
                <h2 className="text-xl font-semibold">Block #{block.id}</h2>
                <p>
                  <strong>Title:</strong> {block.title}
                </p>
                <p>
                  <strong>Message:</strong> {block.message}
                </p>
                <p>
                  <strong>Type:</strong> {block.blockType}
                </p>
                <p>
                  <strong>Prev Hash:</strong>{" "}
                  <code className="break-all">{block.previousHash}</code>
                </p>
                <p>
                  <strong>Hash:</strong>{" "}
                  <code className="break-all">{block.hash}</code>
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
