/**
 * @dev Following warnings appear during the contract compilation:
 * - unused function parameter,
 * - function state mutability can be restricted to pure.
 * These warnings come from OpenZeppelin functions.
 * At the moment, there is no elegant solution to mute such warnings as
 * they appear as fully functional functions without bodies that can be overwritten.
 * The issue should probably be resolved directly in OpenZeppelin.
 * An issue reference: https://github.com/ethereum/solidity/issues/3529
 */
pragma solidity ^0.4.19;

import "zeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "zeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "./CharityToken.sol";

contract CharityTokenICO is Ownable, TimedCrowdsale, MintedCrowdsale {
  /**
   * @param _startTime - time when purchases start
   * @param _endTime - time when purchases end
   * @param _rate - number of token units a buyer gets per wei
   * @param _wallet - address where collected funds will be forwarded to
   * @param _token - address of the token being sold
   */
  function CharityTokenICO(uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet, CharityToken _token) public
    Crowdsale(_rate, _wallet, _token)
    TimedCrowdsale(_startTime, _endTime) {}

  /**
   * @dev It transfers a token contract ownership only when ICO has finished.
   * A transfer can be done only by a token owner.
   * @param _newOwner - address of the new owner
   */
  function transferTokenOwnership(address _newOwner) external onlyOwner {
    require(hasClosed());
    CharityToken(token).transferOwnership(_newOwner);
  }
}
