const { expect } = require("chai");
const { ethers } = require("hardhat");

const convertEtherToWei = (ether) => {
  return ethers.parseEther(ether);
};

const convertWeiToEther = (wei) => {
  return ethers.formatUnits(wei, "ether");
};

describe("FlashLoan", () => {
  let deployer;
  let token;
  let flashLoan;

  beforeEach(async () => {
    // Accounts
    let accounts = await ethers.getSigners();
    deployer = accounts[0];

    // Contracts
    let FlashLoan = await ethers.getContractFactory("FlashLoan");
    let FlashLoaReceiver = await ethers.getContractFactory("FlashLoanReceiver");
    let Token = await ethers.getContractFactory("Token");

    // Deploy Token
    token = await Token.deploy("Token X", "TKX", 1000000);

    // Deploy Flash Loan Pool
    flashLoan = await FlashLoan.deploy(await token.getAddress());

    // Deposit tokens into the pool
    await token
      .connect(deployer)
      .approve(await flashLoan.getAddress(), convertEtherToWei("100"));

    await flashLoan.connect(deployer).depositTokens(convertEtherToWei("100"));
  });

  describe("Deployment", async () => {
    it("expect the pool to be deposited", async () => {
      expect(await token.balanceOf(await flashLoan.getAddress())).to.equal(
        convertEtherToWei("100")
      );
    });
  });
});
