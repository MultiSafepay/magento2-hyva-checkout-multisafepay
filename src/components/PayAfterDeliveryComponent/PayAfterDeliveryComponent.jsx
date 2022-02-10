import React, { useEffect, useContext } from 'react';
import { func, shape } from 'prop-types';
import { __ } from '../../../../../i18n';
import RadioInput from '../../../../../components/common/Form/RadioInput';
import TextInput from '../../../../../components/common/Form/TextInput';
import Card from '../../../../../components/common/Card';
import { paymentMethodShape } from '../../utility';
import CheckoutFormContext from '../../../../../context/Form/CheckoutFormContext';
import useMultiSafepayPaymentMethodContext from '../../hooks/useMultiSafepayPaymentMethodContext';
import useMultiSafepayPayAfterDelivery from './hooks/useMultiSafepayPayAfterDelivery';
import { PAYMENT_METHOD_FORM } from '../../../../../config';
import payAfterDeliveryConfig from './payAfterDeliveryConfig';

const dateOfBirthField = `${PAYMENT_METHOD_FORM}.multisafepay.payafterdelivery.dateOfBirthField`;
const accountNumberField = `${PAYMENT_METHOD_FORM}.multisafepay.payafterdelivery.accountNumberField`;

function PayAfterDeliveryComponent({ method, selected, actions }) {
  const { formikData, setFieldValue } = useMultiSafepayPaymentMethodContext();
  const { registerPaymentAction } = useContext(CheckoutFormContext);
  const { placeOrderWithPayAfterDelivery } = useMultiSafepayPayAfterDelivery(
    method.code
  );
  const isSelected = method.code === selected.code;

  useEffect(() => {
    setFieldValue(dateOfBirthField, '');
    setFieldValue(accountNumberField, '');
  }, [setFieldValue]);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithPayAfterDelivery);
  }, [method, registerPaymentAction, placeOrderWithPayAfterDelivery]);

  const PayAfterDeliveryRadioInput = (
    <RadioInput
      value={method.code}
      label={method.title}
      name="paymentMethod"
      checked={isSelected}
      onChange={actions.change}
    />
  );

  if (!isSelected || payAfterDeliveryConfig.transaction_type === 'redirect') {
    return PayAfterDeliveryRadioInput;
  }

  return (
    <div>
      <div>{PayAfterDeliveryRadioInput}</div>
      <div className="mx-4 my-4">
        <Card bg="darker">
          <div className="container flex flex-col justify-center w-4/5">
            <TextInput
              label={__('Date of Birth')}
              name={dateOfBirthField}
              formikData={formikData}
            />
            <TextInput
              label={__('Account number')}
              name={accountNumberField}
              formikData={formikData}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

PayAfterDeliveryComponent.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default PayAfterDeliveryComponent;
