import client from '../client'

const getToken = () => {
  const token =
    typeof window !== 'undefined' &&
      window.localStorage &&
      localStorage.getItem('x-token')
      ? localStorage.getItem('x-token')
      : ''
  
  return token
}

export const sessionHeader = 'x-session-id'

export const getSessionValues = () => {
  return client.get(`/session`)
}

export const checkSession = (json, sessionId) => {
  const headers = { [sessionHeader]: sessionId, }
  return client.post(`/session`, json, { headers, })
}

export const requestAttestation = (json, sessionId) => {
  const token = getToken()
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    [sessionHeader]: sessionId,
  }
  return client.post(`/request-attestation`, json, { headers, })
}

export const getTerms = (json, sessionId) => {
  const headers = { [sessionHeader]: sessionId, }
  return client.post(`/terms`, json, { headers, })
}