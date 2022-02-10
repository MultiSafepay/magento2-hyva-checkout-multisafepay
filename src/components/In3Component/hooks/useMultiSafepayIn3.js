import { useCallback } from 'react';
import _get from 'lodash.get';
import { PAYMENT_METHOD_FORM } from '../../../../../../config';
import usePerformPlaceOrder from '../../../hooks/usePerformPlaceOrder';

const dateOfBirthField = `${PAYMENT_METHOD_FORM}.multisafepay.in3.dateOfBirthField`;
const genderField = `${PAYMENT_METHOD_FORM}.multisafepay.in3.genderField`;
const phoneField = `${PAYMENT_METHOD_FORM}.multisafepay.in3.phoneField`;

export default function useMultiSafepayIn3(paymentMethodCode) {
  const performPlaceOrder = usePerformPlaceOrder(paymentMethodCode);
  const placeOrderWithIn3 = useCallback(
    async (values) => {
      const dateOfBirth = _get(values, dateOfBirthField);
      const gender = _get(values, genderField);
      const phone = _get(values, phoneField);
      const additionalData = {
        date_of_birth: dateOfBirth,
        gender,
        phone_number: phone,
      };

      await performPlaceOrder(values, additionalData);
    },
    [performPlaceOrder]
  );

  return { placeOrderWithIn3 };
}
