import { getExtensions , getCompatibleExtensions,exceptionToError} from "../getExtention";
import { useCallback, useEffect, useState } from 'react';
function Connect({ onConnect }) {
    const { kilt } = apiWindow;
  
    const [extensions, setExtensions] = useState(getCompatibleExtensions());
  
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState();
  
    useEffect(() => {
      function handler() {
        setExtensions(getCompatibleExtensions());
      }
  
      window.dispatchEvent(new CustomEvent('kilt-dapp#initialized'));
      window.addEventListener('kilt-extension#initialized', handler);
      return () =>
        window.removeEventListener('kilt-extension#initialized', handler);
    }, []);
  
    const handleConnect = useCallback(
      async (extension) => {
        try {
          setProcessing(true);
          setError(undefined);
  
          onConnect(await getSession(kilt[extension]));
        } catch (exception) {
          const { message } = exceptionToError(exception);
          if (message.includes('closed')) {
            setError('closed');
          } else if (message.includes('Not authorized')) {
            setError('unauthorized');
          } else {
            setError('unknown');
            console.error(exception);
          }
          setProcessing(false);
        }
      },
      [onConnect, kilt],
    );
    return (
      <section>
        {extensions.length === 0 && (
          <p>
            Looking for a wallet… To make a claim you need to have e.g. Sporran
            wallet installed and have an identity configured in it.
          </p>
        )}
  
        {extensions.map((extension) => (
          <button
            key={extension}
            type="button"
            onClick={() => handleConnect(extension)}
          >
            Connect to {kilt[extension].name} Wallet
          </button>
        ))}
  
        {processing && <p>Connecting…</p>}
  
        {error && errors[error]}
      </section>
    );
  }
  