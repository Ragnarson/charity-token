import ether from 'zeppelin-solidity/test/helpers/ether'

export default (min = 0.002, max = 2) => {
  return ether(Math.random() * (max - min) + min)
}
