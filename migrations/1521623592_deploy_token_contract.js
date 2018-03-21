const CharityToken = artifacts.require('CharityToken')

module.exports = function(deployer, network) {
  deployer.deploy(CharityToken)
}
