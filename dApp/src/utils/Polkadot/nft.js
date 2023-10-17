import { api, userSubmitExtrinsic } from './index'

const addNft = async (
  collection,
  item,
  mint_to,
  data,  
  phrase,
) => {
  try {
    const submitExtrinsic = await api.tx.nfts.mint(collection, item, mint_to, data)
    const result = await userSubmitExtrinsic(submitExtrinsic, phrase)
    return result
  } catch (e) {
    console.log(e)
    return null
  }
}

const transferNft = async (
  collection,
  item,
  dest,
  phrase,
) => {
  try {
    const submitExtrinsic = await api.tx.nfts.transfer(collection, item, dest)
    const result = await userSubmitExtrinsic(submitExtrinsic, phrase)
    return result
  } catch (e) {
    console.log(e)
    return null
  }
}

const deleteNftFromCollection = async (
  collection,
  item,
  phrase,
) => {
  try {
    const submitExtrinsic = await api.tx.nfts.burn(collection, item)
    const result = await userSubmitExtrinsic(submitExtrinsic, phrase)
    return result
  } catch (e) {
    console.log(e)
    return null
  }
}

export { addNft, transferNft, deleteNftFromCollection }
