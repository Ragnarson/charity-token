const CharityToken = artifacts.require("CharityToken")

module.exports = async function(deployer, network) {
  deployer.deploy(CharityToken)
}
