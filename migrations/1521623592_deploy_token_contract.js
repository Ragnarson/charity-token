const CharityToken = artifacts.require('CharityToken')

module.exports = function (deployer, network) {
  if (network === 'testrpc') return
  deployer.deploy(CharityToken)
}
