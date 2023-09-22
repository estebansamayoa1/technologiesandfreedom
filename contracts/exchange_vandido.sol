// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract VandidocoinICO is ERC20, Ownable {
    uint256 public icoEndTime;
    uint256 public icoRate;
    address public wallet;

    constructor() ERC20("Vandidocoin", "VNC") {
        icoEndTime = block.timestamp + 7 days; 
        wallet = msg.sender; 

        // Establecer la tasa de conversión deseada
        icoRate = 90; 

        _mint(msg.sender, 200000);
    }

    modifier duringICO() {
        require(block.timestamp <= icoEndTime, "ICO finalizada");
        _;
    }

    modifier onlyOwnerOrWallet() {
        require(msg.sender == owner() || msg.sender == wallet, "No eres el propietario ni el wallet");
        _;
    }

    function setICOEndTime(uint256 _endTime) external onlyOwner {
        icoEndTime = _endTime;
    }

    function setICORate(uint256 _rate) external onlyOwner {
        icoRate = _rate;
    }

    receive() external payable duringICO {
        require(msg.value > 0, "La inversion debe ser mayor que 0");
        uint256 tokenAmount = msg.value * icoRate;
        _mint(msg.sender, tokenAmount);
    }

    function claimTokens() external {
        uint256 tokenBalance = balanceOf(msg.sender);
        require(tokenBalance > 0, "No tienes tokens para reclamar");
        _burn(msg.sender, tokenBalance);
        payable(msg.sender).transfer(tokenBalance / icoRate);
    }
}