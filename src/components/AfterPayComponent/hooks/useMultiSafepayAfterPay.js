import { useCallback } from 'react';
import { get } from 'lodash';
import { PAYMENT_METHOD_FORM } from '@hyva/react-checkout/config';
import usePerformPlaceOrder from '../../../hooks/usePerformPlaceOrder';

const dateOfBirthField = `${PAYMENT_METHOD_FORM}.multisafepay.afterpay.dateOfBirthField`;
const genderField = `${PAYMENT_METHOD_FORM}.multisafepay.afterpay.genderField`;
const phoneField = `${PAYMENT_METHOD_FORM}.multisafepay.afterpay.phoneField`;

export default function useMultiSafepayAfterPay(paymentMethodCode) {
  const performPlaceOrder = usePerformPlaceOrder(paymentMethodCode);
  const placeOrderWithAfterPay = useCallback(
    async (values) => {
      const dateOfBirth = get(values, dateOfBirthField);
      const gender = get(values, genderField);
      const phone = get(values, phoneField);
      const additionalData = {
        date_of_birth: dateOfBirth,
        gender,
        phone_number: phone,
      };

      await performPlaceOrder(values, additionalData);
    },
    [performPlaceOrder]
  );

  return { placeOrderWithAfterPay };
}
