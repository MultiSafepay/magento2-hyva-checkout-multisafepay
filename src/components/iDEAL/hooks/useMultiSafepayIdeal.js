import { useCallback } from 'react';

import usePerformPlaceOrder from '../../../hooks/usePerformPlaceOrder';

export default function useMultiSafepayIdeal(paymentMethodCode) {
  const performPlaceOrder = usePerformPlaceOrder(paymentMethodCode);
  const placeOrderWithIdeal = useCallback([performPlaceOrder]);

  return { placeOrderWithIdeal };
}
