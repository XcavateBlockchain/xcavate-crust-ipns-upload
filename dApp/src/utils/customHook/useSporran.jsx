import { useState, useEffect } from 'react'
import { getExtensions } from '../getExtention';

export default function useSporran() {
  const [extensionEnabled, setExtensionEnabled] = useState(false)
  const [extensions, setExtensions] = useState();
  useEffect(() => {
    async function doEffect() {
      const allInjected = await getExtensions();
      console.log(allInjected);
      if (allInjected) {
        setExtensions(allInjected)
      }
      setExtensionEnabled(true)
    }
    doEffect()
  }, [])

  useEffect(() => {
    if (extensionEnabled) {
    }
  }, [extensionEnabled, extensions])

  return { extensions }
}