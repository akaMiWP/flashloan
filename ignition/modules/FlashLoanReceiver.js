const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FlashLoanReceiver", (m) => {
  const flashLoan = m.contractAt(
    "FlashLoan",
    "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"
  );

  const flashLoanReceiver = m.contract("FlashLoanReceiver", [
    flashLoan.address,
  ]);
  //   console.log("FlashLoanReceiver address:", flashLoanReceiver);
  return { flashLoanReceiver };
});
