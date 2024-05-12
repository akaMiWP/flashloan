const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Token", (m) => {
  const token = m.contract("Token", ["Token X", "TKX", 1000000]);
  return { token };
});
