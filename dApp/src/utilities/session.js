import {
  checkSession,
  getSessionValues,
} from '../api/sporran'

export const apiWindow = window

export function getCompatibleExtensions() {
  return Object.entries(apiWindow.kilt)
    .filter(([, provider]) => provider.specVersion.startsWith("3."))
    .map(([name]) => name)
}

export async function getSession(provider) {
  if (!provider) {
    throw new Error("No provider")
  }

  const sessionData = await getSessionValues()
  const dAppName = "XCAVATE"

  if (sessionData.data) {  
    const {
      dAppEncryptionKeyUri,
      challenge,
      sessionId
    } = sessionData.data
  
    const session = await provider.startSession(
      dAppName,
      dAppEncryptionKeyUri,
      challenge
    )
  
    const { encryptionKeyUri, encryptedChallenge, nonce } = session
    const checkSessionData = await checkSession(
      {
        encryptionKeyUri,
        encryptedChallenge,
        nonce
      },
      sessionId
    )

    if (checkSessionData) {  
      const { name } = provider
    
      return { ...session, sessionId, name }
    } else {
      return {}
    }
  } else {
    return {}
  }
}
