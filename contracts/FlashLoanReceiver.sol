// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./FlashLoan.sol";
import "./Token.sol";

contract FlashLoanReceiver {
    FlashLoan private pool;
    address private owner;

    event LoanReceived(address token, uint256 amount);

    constructor(address _poolAddress) {
        pool = FlashLoan(_poolAddress);
        owner = msg.sender;
    }

    function executeFlashLoan(uint256 _amount) external {
        require(msg.sender == owner, "Only owner that is able to execute the function");
        pool.flashLoan(_amount);
    }

    function receiveToken(address _tokenAddress, uint256 _amount) external {
        // Do stuff with the money...

        // Restrict only pool can call this function via interface
        require(msg.sender == address(pool), "Restrict only pool can call this function");
        // Require funds received
        require(Token(_tokenAddress).balanceOf(address(this)) == _amount, "Failed to get loan");

        // Emit event
        emit LoanReceived(_tokenAddress, _amount);

        // Pay back funds
        require(Token(_tokenAddress).transfer(msg.sender, _amount), "Transfer of tokens failed");
    }
}