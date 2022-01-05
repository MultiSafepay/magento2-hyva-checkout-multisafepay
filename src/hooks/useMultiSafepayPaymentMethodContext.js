import { useContext } from 'react';
import { PaymentMethodFormContext } from '../../../../components/paymentMethod/context';

export default function useMultiSafepayPaymentMethodContext() {
  return useContext(PaymentMethodFormContext);
}
