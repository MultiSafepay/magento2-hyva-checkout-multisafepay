import { useContext } from 'react';
import CheckoutFormContext from '@hyva/react-checkout/context/Form/CheckoutFormContext';

export default function useMultiSafepayCheckoutFormContext() {
  return useContext(CheckoutFormContext);
}
