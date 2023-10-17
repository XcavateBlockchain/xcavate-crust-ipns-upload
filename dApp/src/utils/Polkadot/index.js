import { ApiPromise, WsProvider, Keyring } from '@polkadot/api'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { stringAmountDecimalDecombiner } from './number-handler'
import { decodeAddress, encodeAddress } from '@polkadot/keyring'
import { hexToU8a, isHex } from '@polkadot/util'
import config from '../../config'

const NODE_URL = config.PROVIDER_SOCKET

const isPolkadotAddress = (address) => {
  try {
    encodeAddress(isHex(address) ? hexToU8a(address) : decodeAddress(address))
    return true
  } catch (error) {
    return false
  }
}

const keyring = new Keyring({ type: 'sr25519' })
// admin phrase
const PHRASE =
  'gesture away assist captain depart skate scrap dolphin that fruit later glow'
var adminPair = null
let api = null

const fundAdmin = async () => {
  // try {
  //   const submitExtrinsic = await api.tx.cex.addFund();
  //   const result = await adminSubmitExtrinsic(submitExtrinsic);
  //   return result;
  // } catch (e) {
  //   return null
  // }
};

const initialize = async () => {
  const wsProvider = new WsProvider(NODE_URL)
  api = await ApiPromise.create({ provider: wsProvider })
  await cryptoWaitReady()
  adminPair = keyring.addFromUri(PHRASE)
  //admin funder
  api.query.system.account(
    adminPair.address,
    ({ data: { free: currentFree } }) => {
      let amount = stringAmountDecimalDecombiner(currentFree.toString(), 18)
      if (amount < 0.5 && amount > 0.1) {
        fundAdmin()
      }
    }
  )
}

async function userSubmitExtrinsic(submitExtrinsic, phrase) {
  const userPair = keyring.addFromUri(phrase)
  let nonce = await api.rpc.system.accountNextIndex(userPair.address)
  return await submitExtrinsic.signAndSend(userPair, {
    nonce,
  })
}

export {
  api,
  adminPair,
  keyring,
  userSubmitExtrinsic,
  isPolkadotAddress,
  initialize,
}
