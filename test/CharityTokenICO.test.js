import assertRevert from 'zeppelin-solidity/test/helpers/assertRevert'
import latestTime from 'zeppelin-solidity/test/helpers/latestTime'
import { advanceBlock } from 'zeppelin-solidity/test/helpers/advanceToBlock'
import { increaseTimeTo, duration } from 'zeppelin-solidity/test/helpers/increaseTime'
import randomEther from './helpers/randomEther'
import purchase from './shared/purchase'

const CharityToken = artifacts.require('CharityToken')
const CharityTokenICO = artifacts.require('CharityTokenICO')

contract('CharityTokenICO', (accounts) => {
  const investor = accounts[1]
  const wallet = accounts[9]
  const rate = 100

  before(async () => { await advanceBlock() })

  beforeEach(async function () {
    this.startTime = latestTime() + duration.days(1)
    this.afterStartTime = this.startTime + duration.days(1)
    this.endTime = this.startTime + duration.days(3)
    this.afterEndTime = this.endTime + duration.seconds(1)
    this.token = await CharityToken.new()
    this.ico = await CharityTokenICO.new(this.startTime, this.endTime, rate, wallet, this.token.address)
    await this.token.transferOwnership(this.ico.address)
  })

  describe('ICO initialization', async () => {
    it('should reject if a start time is in the past', async function () {
      const startTime = latestTime() - duration.days(1)
      await assertRevert(CharityTokenICO.new(startTime, this.endTime, rate, wallet, this.token.address))
    })

    it('should reject if an end time is before a start time', async function () {
      const endTime = this.startTime - duration.days(1)
      await assertRevert(CharityTokenICO.new(this.startTime, endTime, rate, wallet, this.token.address))
    })

    it('should reject if given rate is 0', async function () {
      await assertRevert(CharityTokenICO.new(this.startTime, this.endTime, 0, wallet, this.token.address))
    })
  })

  describe('ICO ownership', async () => {
    it('should disallow a non-owner to transfer ownership', async function () {
      await assertRevert(this.ico.transferOwnership(investor, { from: investor }))
    })

    it('should allow an owner to transfer ownership', async function () {
      await this.ico.transferOwnership(investor)
      assert.equal(investor, await this.ico.owner())
    })
  })

  describe('token ownership', async () => {
    it('should disallow an owner to transfer ownership before ICO ends', async function () {
      await assertRevert(this.ico.transferTokenOwnership(investor))
    })

    context('when ICO ends', async () => {
      beforeEach(async function () { await increaseTimeTo(this.afterEndTime) })

      it('should disallow a non-owner to transfer ownership', async function () {
        await assertRevert(this.ico.transferTokenOwnership(investor, { from: investor }))
      })

      it('should allow an owner to transfer ownership', async function () {
        await this.ico.transferTokenOwnership(investor)
        assert.equal(investor, await this.token.owner())
      })
    })
  })

  describe('ICO duration', async () => {
    it('should be active after a start time', async function () {
      await increaseTimeTo(this.afterStartTime)
      assert.equal(false, await this.ico.hasClosed())
    })

    it('should be inactive after an end time', async function () {
      await increaseTimeTo(this.afterEndTime)
      assert.equal(true, await this.ico.hasClosed())
    })
  })

  purchase({
    investor: investor,
    beneficiary: investor,
    weiAmount: randomEther(),
    rate: rate,
    wallet: wallet,
    buyWith: 'sendTransaction',
    description: 'high-level purchase when a beneficiary is an investor'
  })

  purchase({
    investor: investor,
    beneficiary: accounts[2],
    weiAmount: randomEther(),
    rate: rate,
    wallet: wallet,
    buyWith: 'buyTokens',
    description: 'low-level purchase when a beneficiary is not an investor'
  })
})
