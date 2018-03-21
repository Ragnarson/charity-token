const { startTime, endTime, rate, wallet } = require('./helpers/deployment_params')
const CharityToken = artifacts.require('CharityToken')
const CharityTokenICO = artifacts.require('CharityTokenICO')

module.exports = async function(deployer, network) {
  if (network === 'testrpc') return
  await deployer.deploy(CharityTokenICO, startTime, endTime, rate, wallet, CharityToken.address)
  await CharityToken.at(CharityToken.address).transferOwnership(CharityTokenICO.address)
}
