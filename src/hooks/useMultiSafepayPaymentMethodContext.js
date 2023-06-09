import { useContext } from 'react';
import { PaymentMethodFormContext } from '@hyva/react-checkout/components/paymentMethod/context';

export default function useMultiSafepayPaymentMethodContext() {
  return useContext(PaymentMethodFormContext);
}
