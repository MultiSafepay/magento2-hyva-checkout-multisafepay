import React, { useEffect, useContext } from 'react';
import { func, shape } from 'prop-types';
import { __ } from '../../../../../i18n';
import RadioInput from '../../../../../components/common/Form/RadioInput';
import TextInput from '../../../../../components/common/Form/TextInput';
import Card from '../../../../../components/common/Card';
import { paymentMethodShape } from '../../utility';
import CheckoutFormContext from '../../../../../context/Form/CheckoutFormContext';
import useMultiSafepayPaymentMethodContext from '../../hooks/useMultiSafepayPaymentMethodContext';
import useMultiSafepayDirectDebit from './hooks/useMultiSafepayDirectDebit';
import { PAYMENT_METHOD_FORM } from '../../../../../config';
import directDebitConfig from './directDebitConfig';

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
              label={__('Date of Birth')}
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
