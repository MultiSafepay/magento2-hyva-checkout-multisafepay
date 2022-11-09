import { useCallback } from 'react';
import usePerformPlaceOrderWithComponent from '../../../hooks/usePerformPlaceOrderWithComponent';
import { getPayload } from '../utility/multisafepayComponent';

export default function useMultiSafepayCreditCard(paymentMethodCode) {
  const performPlaceOrder =
    usePerformPlaceOrderWithComponent(paymentMethodCode);
  const placeOrderWithCreditCard = useCallback(
    async (values) => {
      const additionalData = {
        payload: getPayload(),
      };

      await performPlaceOrder(values, additionalData);
    },
    [performPlaceOrder]
  );

  return { placeOrderWithCreditCard };
}
