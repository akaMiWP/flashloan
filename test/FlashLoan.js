const { expect } = require("chai");
const { ethers } = require("hardhat");

const convertEtherToWei = (ether) => {
  return ethers.parseEther(ether);
};

const convertWeiToEther = (wei) => {
  return ethers.formatUnits(wei, "ether");
};

describe("FlashLoan", () => {
  let deployer, stranger;
  let token;
  let flashLoan, flashLoanReceiver;

  beforeEach(async () => {
    // Accounts
    let accounts = await ethers.getSigners();
    deployer = accounts[0];
    stranger = accounts[1];

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

    // Deplay Flash Loan Reciever
    flashLoanReceiver = await FlashLoaReceiver.deploy(
      await flashLoan.getAddress()
    );
  });

  describe("Deployment", async () => {
    it("expect the pool to be deposited", async () => {
      expect(await token.balanceOf(await flashLoan.getAddress())).to.equal(
        convertEtherToWei("100")
      );
    });
  });

  describe("Borrow Funds", async () => {
    it("expect the pool to be able to borrow funds", async () => {
      let transaction = await flashLoanReceiver.executeFlashLoan(
        convertEtherToWei("100")
      );

      await expect(transaction)
        .to.emit(flashLoanReceiver, "LoanReceived")
        .withArgs(await token.getAddress(), convertEtherToWei("100"));
    });

    it("expect the pool must not allow others to call executeFlashLoan", async () => {
      await expect(
        flashLoanReceiver
          .connect(stranger)
          .executeFlashLoan(convertEtherToWei("100"))
      ).to.be.reverted;
    });
  });
});
