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
  return client.post('/collection', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const getLastId = () => {
  return client.get('/collection/getLastId', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const createLoanCollection = (data) => {
  const token = getToken()
  return client.post('/collection/createLoanCollection', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}
