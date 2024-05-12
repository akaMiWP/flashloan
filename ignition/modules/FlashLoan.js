const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("FlashLoan", (m) => {
  const token = m.contractAt(
    "Token",
    "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853"
  );

  const flashLoan = m.contract("FlashLoan", [token.address]);
  return { flashLoan };
});
