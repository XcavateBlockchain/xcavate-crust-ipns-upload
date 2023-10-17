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
  return client.post('/user', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const connectDid = (data) => {
  return client.post('/user/connect-did', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const updateRole = (data) => {
  const token = getToken()

  return client.post('/user/update-role', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

export const updateProfileImage = (data) => {
  const token = getToken()

  return client.post('/user/update-profile-image', data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
}
