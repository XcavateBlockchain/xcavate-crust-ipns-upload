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
  return client.post('/property', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const getAllPropertiesByUser = () => {
  const token = getToken()
  return client.get('/property/getPropertiesByUser', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const getPropertyById = (propertyId) => {
  return client.get(`/property/getPropertyById/${propertyId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getAllProperties = () => {
  return client.get('/property', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
