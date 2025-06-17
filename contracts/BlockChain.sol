// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockChain {
    struct Block {
        uint id;
        string title;
        string message;
        string blockType;
        string previousHash;
        string hash;
    }

    Block[] public blocks;

    constructor() {
        addBlock("Genesis Block", "This is the genesis", "open", "0");
    }

    function addBlock(string memory title, string memory message, string memory blockType, string memory previousHash) public {
        string memory hash = toHex(keccak256(abi.encodePacked(title, message, blockType, previousHash, block.timestamp, blocks.length)));
        blocks.push(Block(blocks.length, title, message, blockType, previousHash, hash));
    }

    function getBlock(uint i) public view returns (Block memory) {
        return blocks[i];
    }

    function getLength() public view returns (uint) {
        return blocks.length;
    }

    function toHex(bytes32 data) private pure returns (string memory) {
        bytes memory alphabet = "0123456789abcdef";
        bytes memory str = new bytes(64);
        for (uint i = 0; i < 32; i++) {
            str[i*2] = alphabet[uint(uint8(data[i] >> 4))];
            str[1+i*2] = alphabet[uint(uint8(data[i] & 0x0f))];
        }
        return string(str);
    }
}
