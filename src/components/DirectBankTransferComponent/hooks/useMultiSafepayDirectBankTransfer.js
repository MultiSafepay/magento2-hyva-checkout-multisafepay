import { useCallback } from 'react';
import _get from 'lodash.get';
import { PAYMENT_METHOD_FORM } from '../../../../../../config';
import usePerformPlaceOrder from '../../../hooks/usePerformPlaceOrder';

const accountIdField = `${PAYMENT_METHOD_FORM}.multisafepay.directbanktransfer.accountIdField`;
const accountHolderNameField = `${PAYMENT_METHOD_FORM}.multisafepay.directbanktransfer.accountHolderNameField`;
const accountHolderCityField = `${PAYMENT_METHOD_FORM}.multisafepay.directbanktransfer.accountHolderCityField`;
const accountHolderCountryField = `${PAYMENT_METHOD_FORM}.multisafepay.directbanktransfer.accountHolderCountryField`;
const accountHolderIbanField = `${PAYMENT_METHOD_FORM}.multisafepay.directbanktransfer.accountHolderIbanField`;
const accountHolderBicField = `${PAYMENT_METHOD_FORM}.multisafepay.directbanktransfer.accountHolderBicField`;

export default function useMultiSafepayDirectBankTransfer(paymentMethodCode) {
  const performPlaceOrder = usePerformPlaceOrder(paymentMethodCode);
  const placeOrderWithDirectBankTransfer = useCallback(
    async (values) => {
      const accountId = _get(values, accountIdField);
      const accountHolderName = _get(values, accountHolderNameField);
      const accountHolderCity = _get(values, accountHolderCityField);
      const accountHolderCountry = _get(values, accountHolderCountryField);
      const accountHolderIban = _get(values, accountHolderIbanField);
      const accountHolderBic = _get(values, accountHolderBicField);
      const additionalData = {
        account_id: accountId,
        account_holder_name: accountHolderName,
        account_holder_city: accountHolderCity,
        account_holder_country: accountHolderCountry,
        account_holder_iban: accountHolderIban,
        account_holder_bic: accountHolderBic,
      };

      await performPlaceOrder(values, additionalData);
    },
    [performPlaceOrder]
  );

  return { placeOrderWithDirectBankTransfer };
}
