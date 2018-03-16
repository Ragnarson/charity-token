export default ({ investor, beneficiary, weiAmount, buyWith }) => {
  return [
    buyWith === 'buyTokens' ? beneficiary : null,
    { value: weiAmount, from: investor }
  ].filter(el => el)
}
