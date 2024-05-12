const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FlashLoan", (m) => {
  const token = m.contractAt(
    "Token",
    "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
  );

  const flashLoan = m.contract("FlashLoan", [token.address]);
  return { flashLoan };
});
