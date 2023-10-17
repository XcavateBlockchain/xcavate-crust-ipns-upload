export const txResHandler = ({ events = [], status, txHash }) =>{
  let result
  result = status.isFinalized
    ? `😉 Finalized. Block hash: ${status.asFinalized.toString()}`
    : `Current transaction status: ${status.type}`

  // Loop through Vec<EventRecord> to display all events
  events.forEach(({ _, event: { data, method, section } }) => {
    if ((section + ":" + method) === 'system:ExtrinsicFailed' ) {
      // extract the data for this event
      const [dispatchError, dispatchInfo] = data
      console.log(`dispatchinfo: ${dispatchInfo}`)
      let errorInfo
      
      // decode the error
      if (dispatchError.isModule) {
        // for module errors, we have the section indexed, lookup
        // (For specific known errors, we can also do a check against the
        // api.errors.<module>.<ErrorName>.is(dispatchError.asModule) guard)
        const mod = dispatchError.asModule
        const error = api.registry.findMetaError(
            new Uint8Array([mod.index.toNumber(), bnFromHex(mod.error.toHex().slice(0, 4)).toNumber()])
        )
        let message = `${error.section}.${error.name}${
            Array.isArray(error.docs) ? `(${error.docs.join('')})` : error.docs || ''
        }`
        
        errorInfo = `${message}`
        console.log(`Error-info::${JSON.stringify(error)}`)
      } else {
        // Other, CannotLookup, BadOrigin, no extra info
        errorInfo = dispatchError.toString()
      }
      result = `😞 Transaction Failed! ${section}.${method}::${errorInfo}`
    } else if (section + ":" + method === 'system:ExtrinsicSuccess' ) {
      result = `❤️️ Transaction successful! tx hash: ${txHash} , Block hash: ${status.asFinalized.toString()}`
    }
  })

  return result
}

export const txErrHandler = err => {
  return `😞 Transaction Failed: ${err.toString()}`
}