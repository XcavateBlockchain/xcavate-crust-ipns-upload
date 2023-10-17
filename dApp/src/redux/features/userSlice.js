import { createSlice } from '@reduxjs/toolkit'

const getDid = () => {
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    localStorage.getItem('sporran-did')
  ) {
    return localStorage.getItem('sporran-did')
  } else {
    return ''
  }
}

const getUserData = () => {
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    localStorage.getItem('user-data')
  ) {
    return JSON.parse(localStorage.getItem('user-data') || '')
  } else {
    return null
  }
}

const getToken = () => {
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    localStorage.getItem('x-token')
  ) {
    return localStorage.getItem('x-token')
  } else {
    return ''
  }
}

const initialState = {
  addWalletModal: false,
  successWalletModal: false,
  sporranSession: {},
  did: getDid(),
  userData: getUserData(),
  token: getToken(),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddWalletModal: (state, action) => {
      state.addWalletModal = action.payload
    },
    setSuccessWalletModal: (state, action) => {
      state.successWalletModal = action.payload
    },
    setSporranSession: (state, action) => {
      state.sporranSession = action.payload
    },
    setDid: (state, action) => {
      state.did = action.payload
      localStorage.setItem('sporran-did', action.payload)
    },
    setUserData: (state, action) => {
      state.userData = action.payload
      localStorage.setItem('user-data', JSON.stringify(action.payload))
    },
    setToken: (state, action) => {
      state.token = action.payload
      localStorage.setItem('x-token', action.payload)
    }
  },
})

export const {
  setAddWalletModal,
  setSuccessWalletModal,
  setSporranSession,
  setDid,
  setUserData,
  setToken,
} = userSlice.actions

export default userSlice.reducer
