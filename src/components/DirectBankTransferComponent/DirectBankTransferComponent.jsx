import React, { useEffect, useContext } from 'react';
import { func, shape } from 'prop-types';
import { __ } from '@hyva/react-checkout/i18n';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import TextInput from '@hyva/react-checkout/components/common/Form/TextInput';
import Card from '@hyva/react-checkout/components/common/Card';
import CheckoutFormContext from '@hyva/react-checkout/context/Form/CheckoutFormContext';
import { PAYMENT_METHOD_FORM } from '@hyva/react-checkout/config';
import useMultiSafepayPaymentMethodContext from '../../hooks/useMultiSafepayPaymentMethodContext';
import useMultiSafepayDirectBankTransfer from './hooks/useMultiSafepayDirectBankTransfer';
import directBankTransferConfig from './directBankTransferConfig';
import { paymentMethodShape } from '../../utility';

const accountIdField = `${PAYMENT_METHOD_FORM}.multisafepay.directbanktransfer.accountIdField`;
const accountHolderNameField = `${PAYMENT_METHOD_FORM}.multisafepay.directbanktransfer.accountHolderNameField`;
const accountHolderCityField = `${PAYMENT_METHOD_FORM}.multisafepay.directbanktransfer.accountHolderCityField`;
const accountHolderCountryField = `${PAYMENT_METHOD_FORM}.multisafepay.directbanktransfer.accountHolderCountryField`;
const accountHolderIbanField = `${PAYMENT_METHOD_FORM}.multisafepay.directbanktransfer.accountHolderIbanField`;
const accountHolderBicField = `${PAYMENT_METHOD_FORM}.multisafepay.directbanktransfer.accountHolderBicField`;

function DirectBankTransferComponent({ method, selected, actions }) {
  const { formikData, setFieldValue } = useMultiSafepayPaymentMethodContext();
  const { registerPaymentAction } = useContext(CheckoutFormContext);
  const { placeOrderWithDirectBankTransfer } =
    useMultiSafepayDirectBankTransfer(method.code);
  const isSelected = method.code === selected.code;

  useEffect(() => {
    setFieldValue(accountIdField, '');
    setFieldValue(accountHolderNameField, '');
    setFieldValue(accountHolderCityField, '');
    setFieldValue(accountHolderCountryField, '');
    setFieldValue(accountHolderIbanField, '');
    setFieldValue(accountHolderBicField, '');
  }, [setFieldValue]);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithDirectBankTransfer);
  }, [method, registerPaymentAction, placeOrderWithDirectBankTransfer]);

  const DirectBankTransferRadioInput = (
    <RadioInput
      value={method.code}
      label={method.title}
      name="paymentMethod"
      checked={isSelected}
      onChange={actions.change}
    />
  );

  if (!isSelected || directBankTransferConfig.transaction_type === 'redirect') {
    return DirectBankTransferRadioInput;
  }

  return (
    <div>
      <div>{DirectBankTransferRadioInput}</div>
      <div className="mx-4 my-4">
        <Card bg="darker">
          <div className="container flex flex-col justify-center w-4/5">
            <TextInput
              label={__('Account ID')}
              name={accountIdField}
              formikData={formikData}
            />
            <TextInput
              label={__('Account holder name')}
              name={accountHolderNameField}
              formikData={formikData}
            />
            <TextInput
              label={__('Account holder city')}
              name={accountHolderCityField}
              formikData={formikData}
            />
            <TextInput
              label={__('Account holder country')}
              name={accountHolderCountryField}
              formikData={formikData}
            />
            <TextInput
              label={__('Account holder IBAN')}
              name={accountHolderIbanField}
              formikData={formikData}
            />
            <TextInput
              label={__('Account holder BIC')}
              name={accountHolderBicField}
              formikData={formikData}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

DirectBankTransferComponent.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default DirectBankTransferComponent;
