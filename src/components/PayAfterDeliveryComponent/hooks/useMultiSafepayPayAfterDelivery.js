import { useCallback } from 'react';
import { get } from 'lodash';
import { PAYMENT_METHOD_FORM } from '@hyva/react-checkout/config';
import usePerformPlaceOrder from '../../../hooks/usePerformPlaceOrder';

const dateOfBirthField = `${PAYMENT_METHOD_FORM}.multisafepay.payafterdelivery.dateOfBirthField`;
const accountNumberField = `${PAYMENT_METHOD_FORM}.multisafepay.payafterdelivery.accountNumberField`;

export default function useMultiSafepayPayAfterDelivery(paymentMethodCode) {
  const performPlaceOrder = usePerformPlaceOrder(paymentMethodCode);
  const placeOrderWithPayAfterDelivery = useCallback(
    async (values) => {
      const dateOfBirth = get(values, dateOfBirthField);
      const accountNumber = get(values, accountNumberField);
      const additionalData = {
        date_of_birth: dateOfBirth,
        account_number: accountNumber,
      };

      await performPlaceOrder(values, additionalData);
    },
    [performPlaceOrder]
  );

  return { placeOrderWithPayAfterDelivery };
}
