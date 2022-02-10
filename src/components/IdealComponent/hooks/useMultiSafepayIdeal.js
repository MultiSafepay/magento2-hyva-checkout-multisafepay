import { useCallback } from 'react';
import _get from 'lodash.get';
import { PAYMENT_METHOD_FORM } from '../../../../../../config';
import usePerformPlaceOrder from '../../../hooks/usePerformPlaceOrder';

const issuersField = `${PAYMENT_METHOD_FORM}.multisafepay.ideal.issuersField`;

export default function useMultiSafepayIdeal(paymentMethodCode) {
  const performPlaceOrder = usePerformPlaceOrder(paymentMethodCode);
  const placeOrderWithIdeal = useCallback(
    async (values) => {
      const issuerId = _get(values, issuersField);
      const additionalData = { issuer_id: issuerId };

      await performPlaceOrder(values, additionalData);
    },
    [performPlaceOrder]
  );

  return { placeOrderWithIdeal };
}
