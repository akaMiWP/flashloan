const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FlashLoanReceiver", (m) => {
  const flashLoan = m.contractAt(
    "FlashLoan",
    "0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6"
  );

  const flashLoanReceiver = m.contract("FlashLoanReceiver", [
    flashLoan.address,
  ]);
  //   console.log("FlashLoanReceiver address:", flashLoanReceiver);
  return { flashLoanReceiver };
});
