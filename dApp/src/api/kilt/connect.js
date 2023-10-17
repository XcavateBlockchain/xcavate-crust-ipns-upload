import * as Kilt from '@kiltprotocol/sdk-js'

export const kiltConnect = async () => {
  await Kilt.connect(import.meta.env.REACT_APP_KILT_API_URL)
  const api = Kilt.ConfigService.get('api')
  
  return api
}

export const kiltDisconnect = async () => {
  await Kilt.disconnect()
}