import assertRevert from 'zeppelin-solidity/test/helpers/assertRevert'
import { increaseTimeTo } from 'zeppelin-solidity/test/helpers/increaseTime'
import buildParams from '../helpers/buildPurchaseParams'

export default ({ investor, beneficiary, weiAmount, rate, wallet, buyWith, description }) => {
  const tokens = weiAmount.mul(rate)
  const params = buildParams({
    investor: investor,
    beneficiary: beneficiary,
    weiAmount: weiAmount,
    buyWith: buyWith
  })

  describe(description, async () => {
    it('should reject transfers before ICO starts', async function () {
      await assertRevert(this.ico[buyWith](...params))
    })

    it('should reject transfers after ICO ends', async function () {
      await increaseTimeTo(this.afterEndTime)
      await assertRevert(this.ico[buyWith](...params))
    })

    context('when ICO is ongoing', async () => {
      beforeEach(async function () { await increaseTimeTo(this.afterStartTime) })

      it('should reject transfers if an amount of ether is 0', async function () {
        const newParams = buildParams({
          investor: investor,
          beneficiary: beneficiary,
          weiAmount: 0,
          buyWith: buyWith
        })
        await assertRevert(this.ico[buyWith](...newParams))
      })

      it('should forward funds', async function () {
        const preWalletBalance = web3.eth.getBalance(wallet)
        await this.ico[buyWith](...params)
        const postWalletBalance = web3.eth.getBalance(wallet)
        assert.equal(preWalletBalance.plus(weiAmount).toNumber(), postWalletBalance.toNumber())
      })

      it('should increment weiRaised variable', async function () {
        const preWeiRaised = await this.ico.weiRaised()
        await this.ico[buyWith](...params)
        const postWeiRaised = await this.ico.weiRaised()
        assert.equal(preWeiRaised.plus(weiAmount).toNumber(), postWeiRaised.toNumber())
      })

      it('should issue tokens', async function () {
        const preBeneficiaryBalance = await this.token.balanceOf(beneficiary)
        await this.ico[buyWith](...params)
        const postBeneficiaryBalance = await this.token.balanceOf(beneficiary)
        assert.equal(preBeneficiaryBalance.plus(tokens).toNumber(), postBeneficiaryBalance.toNumber())
      })

      it('should log a token purchase event', async function () {
        const { logs } = await this.ico[buyWith](...params)
        const event = logs.find(e => e.event === 'TokenPurchase')
        assert.equal(investor, event.args.purchaser)
        assert.equal(beneficiary, event.args.beneficiary)
        assert.equal(weiAmount.toNumber(), event.args.value.toNumber())
        assert.equal(tokens.toNumber(), event.args.amount.toNumber())
      })
    })
  })
}
