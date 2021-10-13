import { useContext } from 'react';

import AppContext from '../../../../context/App/AppContext';

export default function useMultiSafepayAppContext() {
  const [
    { isLoggedIn, checkoutAgreements },
    { setErrorMessage, setPageLoader },
  ] = useContext(AppContext);

  return {
    isLoggedIn,
    setPageLoader,
    setErrorMessage,
    checkoutAgreements,
  };
}
