import { developerCredentialCtype } from '../cTypes/developerCredentialCType'

export const supportedCTypeKeys = ['developerCredential']

export const supportedCTypes = {
  developerCredential: developerCredentialCtype,
}

export const kiltCost= {
  developerCredential: 5,
}

export function isSupportedCType(cType) {
  return supportedCTypeKeys.includes(cType)
}
