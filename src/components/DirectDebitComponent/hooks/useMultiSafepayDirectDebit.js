import { useCallback } from 'react';
import { get } from 'lodash';
import { PAYMENT_METHOD_FORM } from '@hyva/react-checkout/config';
import usePerformPlaceOrder from '../../../hooks/usePerformPlaceOrder';

const accountHolderNameField = `${PAYMENT_METHOD_FORM}.multisafepay.directdebit.accountHolderNameField`;
const accountHolderIbanField = `${PAYMENT_METHOD_FORM}.multisafepay.directdebit.accountHolderIbanField`;

export default function useMultiSafepayDirectDebit(paymentMethodCode) {
  const performPlaceOrder = usePerformPlaceOrder(paymentMethodCode);
  const placeOrderWithDirectDebit = useCallback(
    async (values) => {
      const accountHolderName = get(values, accountHolderNameField);
      const accountHolderIban = get(values, accountHolderIbanField);
      const additionalData = {
        account_holder_name: accountHolderName,
        account_holder_iban: accountHolderIban,
      };

      await performPlaceOrder(values, additionalData);
    },
    [performPlaceOrder]
  );

  return { placeOrderWithDirectDebit };
}
