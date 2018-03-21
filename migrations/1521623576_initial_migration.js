const Migrations = artifacts.require('./Migrations.sol')

module.exports = function(deployer, network) {
  if (network === 'testrpc') return
  deployer.deploy(Migrations)
}
