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

export const create = (data) => {
  const token = getToken()
  return client.post('/loan', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const getLoansByUser = () => {
  const token = getToken()
  return client.get('/loan', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}
