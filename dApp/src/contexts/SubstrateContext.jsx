import React, { useReducer, useContext, useEffect } from 'react'
import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import { ApiPromise, WsProvider } from '@polkadot/api'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import { keyring as Keyring } from '@polkadot/ui-keyring'
import { isTestChain } from '@polkadot/util'
import { TypeRegistry } from '@polkadot/types/create'
import PropTypes from 'prop-types'

import config from '../config'

const parsedQuery = new URLSearchParams(window.location.search)
const connectedSocket = parsedQuery.get('rpc') || config.PROVIDER_SOCKET

// Initialize the state for `useReducer`
const initialState = {
  socket: connectedSocket,
  jsonrpc: {
    ...jsonrpc,
    ...config.CUSTOM_RPC_METHODS,
  },
  keyring: null,
  keyringState: null,
  api: null,
  apiError: null,
  apiState: null,
  currentAccount: null,
  polkadotAccount: null,
}

const registry = new TypeRegistry()

// Reducer function for `useReducer`
const reducer = (state, action) => {
  switch (action.type) {
    case 'CONNECT_INIT':
      return { ...state, apiState: 'CONNECT_INIT' }
    case 'CONNECT':
      return { ...state, api: action.payload, apiState: 'CONNECTING' }
    case 'CONNECT_SUCCESS':
      return { ...state, apiState: 'READY' }
    case 'CONNECT_ERROR':
      return { ...state, apiState: 'ERROR', apiError: action.payload }
    case 'LOAD_KEYRING':
      return { ...state, keyringState: 'LOADING' }
    case 'SET_KEYRING':
      return { ...state, keyring: action.payload, keyringState: 'READY' }
    case 'KEYRING_ERROR':
      return { ...state, keyring: null, keyringState: 'ERROR' }
    case 'SET_CURRENT_ACCOUNT':
      return { ...state, currentAccount: action.payload }
    case 'SET_POLKADOT_ACCOUNT':
      return { ...state, polkadotAccount: action.payload }
    default:
      throw new Error(`Unknown type: ${action.type}`)
  }
}

// Connecting to the substrate node

const connect = (state, dispatch) => {
  const { apiState, socket, jsonrpc } = state

  if (apiState) return // This function `connect()` will be performed only once

  dispatch({ type: 'CONNECT_INIT' })

  console.log('Connected socket :: ', socket)

  const provider = new WsProvider(socket)
  const _api = new ApiPromise({
    provider,
    rpc: jsonrpc,
  })

  // Set listeners for disconnection and reconnection event
  _api.on('connected', () => {
    dispatch({ type: 'CONNECT', payload: _api })

    // `ready` event is not emitted upon reconnection and is checked explicitly here
    _api.isReady.then(_api => dispatch({ type: 'CONNECT_SUCCESS' }))
  })
  _api.on('ready', () => dispatch({ type: 'CONNECT_SUCCESS' }))
  _api.on('error', err => dispatch({ type: 'CONNECT_ERROR', payload: err }))
}

const retrieveChainInfo = async api => {
  const [systemChain, systemChainType] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.chainType ? api.rpc.system.chainType() : Promise.resolve(registry.createType('ChainType', 'Live')),
  ])

  return {
    systemChain: (systemChain || '<unknown>').toString(),
    systemChainType,
  }
}

// Loading accounts from dev and polkadot-js extension
const loadAccounts = (state, dispatch) => {
  const { api } = state
  dispatch({ type: 'LOAD_KEYRING' })

  const asyncLoadAccounts = async () => {
    try {
      await web3Enable(config.APP_NAME)
      let allAccounts = await web3Accounts()

      let polkadotAccounts = allAccounts.filter(({address, meta}) => {
        return meta.source === 'polkadot-js'
      })

      if (polkadotAccounts.length > 0) {
        dispatch({ type: 'SET_POLKADOT_ACCOUNT', payload: polkadotAccounts[0].address})
      }

      allAccounts = allAccounts.map(({ address, meta }) => ({
        address,
        meta: {
          ...meta,
          name: `${meta.name} (${meta.source})`,
        }
      }))

      // Logics to check if the connecting chain is a dev chain, coming from polkadot-js Apps
      const { systemChain, systemChainType } = await retrieveChainInfo(api)
      const isDevelopment = systemChainType.isDevelopment || systemChainType.isLocal || isTestChain(systemChain)

      Keyring.loadAll({ isDevelopment }, allAccounts)

      dispatch({ type: 'SET_KEYRING', payload: Keyring })
    } catch (error) {
      console.error(error)
      dispatch({ type: 'KEYRING_ERROR' })
    }
  }

  asyncLoadAccounts()
}

const SubstrateContext = React.createContext()

var keyringLoadAll = false

const SubstrateContextProvider = props => {
  const neededPropNames = ['socket']
  neededPropNames.forEach(key => {
    initialState[key] = typeof props[key] === 'undefined' ? initialState[key] : props[key]
  })

  const [state, dispatch] = useReducer(reducer, initialState)
  connect(state, dispatch)

  useEffect(() => {
    const { apiState, keyringState } = state
    if (apiState === 'READY' && !keyringState && !keyringLoadAll) {
      keyringLoadAll = true
      loadAccounts(state, dispatch)
    }
  }, [state, dispatch])

  const setCurrentAccount = (acct) => {
    dispatch({ type: 'SET_CURRENT_ACCOUNT', payload: acct })
  }

  return (
    <SubstrateContext.Provider value={{ state, setCurrentAccount }}>
      {props.children}
    </SubstrateContext.Provider>
  )
}

// checking prop type
SubstrateContextProvider.propTypes = {
  socket: PropTypes.string,
}

const useSubstrate = () => useContext(SubstrateContext)
const useSubstrateState = () => useContext(SubstrateContext).state

export {
  SubstrateContextProvider,
  useSubstrate,
  useSubstrateState,
}