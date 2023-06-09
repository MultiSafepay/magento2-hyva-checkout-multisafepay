import React, { useEffect, useContext } from 'react';
import { func, shape } from 'prop-types';
import { __ } from '@hyva/react-checkout/i18n';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import TextInput from '@hyva/react-checkout/components/common/Form/TextInput';
import Card from '@hyva/react-checkout/components/common/Card';
import CheckoutFormContext from '@hyva/react-checkout/context/Form/CheckoutFormContext';
import { PAYMENT_METHOD_FORM } from '@hyva/react-checkout/config';
import useMultiSafepayPaymentMethodContext from '../../hooks/useMultiSafepayPaymentMethodContext';
import useMultiSafepayDirectDebit from './hooks/useMultiSafepayDirectDebit';
import directDebitConfig from './directDebitConfig';
import { paymentMethodShape } from '../../utility';

const accountHolderNameField = `${PAYMENT_METHOD_FORM}.multisafepay.directdebit.accountHolderNameField`;
const accountHolderIbanField = `${PAYMENT_METHOD_FORM}.multisafepay.directdebit.accountHolderIbanField`;

function DirectDebitComponent({ method, selected, actions }) {
  const { formikData, setFieldValue } = useMultiSafepayPaymentMethodContext();
  const { registerPaymentAction } = useContext(CheckoutFormContext);
  const { placeOrderWithDirectDebit } = useMultiSafepayDirectDebit(method.code);
  const isSelected = method.code === selected.code;

  useEffect(() => {
    setFieldValue(accountHolderNameField, '');
    setFieldValue(accountHolderIbanField, '');
  }, [setFieldValue]);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithDirectDebit);
  }, [method, registerPaymentAction, placeOrderWithDirectDebit]);

  const DirectDebitRadioInput = (
    <RadioInput
      value={method.code}
      label={method.title}
      name="paymentMethod"
      checked={isSelected}
      onChange={actions.change}
    />
  );

  if (!isSelected || directDebitConfig.transaction_type === 'redirect') {
    return DirectDebitRadioInput;
  }

  return (
    <div>
      <div>{DirectDebitRadioInput}</div>
      <div className="mx-4 my-4">
        <Card bg="darker">
          <div className="container flex flex-col justify-center w-4/5">
            <TextInput
              label={__('Account holder name')}
              name={accountHolderNameField}
              formikData={formikData}
            />
            <TextInput
              label={__('Account number')}
              name={accountHolderIbanField}
              formikData={formikData}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

DirectDebitComponent.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default DirectDebitComponent;
