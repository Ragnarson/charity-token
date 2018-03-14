pragma solidity ^0.4.19;

import "zeppelin-solidity/contracts/token/ERC20/MintableToken.sol";

contract CharityToken is MintableToken {
  string public constant name = "CharityToken";
  string public constant symbol = "CHT";
  uint8 public constant decimals = 18;
}
