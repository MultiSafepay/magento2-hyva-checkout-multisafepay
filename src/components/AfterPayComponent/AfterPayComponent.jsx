import React, { useEffect, useContext } from 'react';
import { func, shape } from 'prop-types';
import _get from 'lodash.get';
import { __ } from '@hyva/react-checkout/i18n';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import TextInput from '@hyva/react-checkout/components/common/Form/TextInput';
import SelectInput from '@hyva/react-checkout/components/common/Form/SelectInput';
import Card from '@hyva/react-checkout/components/common/Card';
import { paymentMethodShape } from '../../utility';
import CheckoutFormContext from '@hyva/react-checkout/context/Form/CheckoutFormContext';
import useMultiSafepayPaymentMethodContext from '../../hooks/useMultiSafepayPaymentMethodContext';
import useMultiSafepayAfterPay from './hooks/useMultiSafepayAfterPay';
import { PAYMENT_METHOD_FORM } from '@hyva/react-checkout/config';
import CartContext from '@hyva/react-checkout/context/Cart/CartContext';
import afterPayConfig from './afterPayConfig';

const dateOfBirthField = `${PAYMENT_METHOD_FORM}.multisafepay.afterpay.dateOfBirthField`;
const genderField = `${PAYMENT_METHOD_FORM}.multisafepay.afterpay.genderField`;
const phoneField = `${PAYMENT_METHOD_FORM}.multisafepay.afterpay.phoneField`;

function AfterPayComponent({ method, selected, actions }) {
  const { formikData, setFieldValue } = useMultiSafepayPaymentMethodContext();
  const { registerPaymentAction } = useContext(CheckoutFormContext);
  const { placeOrderWithAfterPay } = useMultiSafepayAfterPay(method.code);
  const isSelected = method.code === selected.code;
  const cart = _get(useContext(CartContext), 'cart', {}) || {};

  useEffect(() => {
    setFieldValue(dateOfBirthField, '');
    setFieldValue(genderField, '');
    setFieldValue(phoneField, '');
  }, [setFieldValue]);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithAfterPay);
  }, [method, registerPaymentAction, placeOrderWithAfterPay]);

  const AfterPayRadioInput = (
    <RadioInput
      value={method.code}
      label={method.title}
      name="paymentMethod"
      checked={isSelected}
      onChange={actions.change}
    />
  );

  if (!isSelected || afterPayConfig.transaction_type === 'redirect') {
    return AfterPayRadioInput;
  }

  const genderOptions = [
    { value: 'mr', label: __('Mr.') },
    { value: 'mrs', label: __('Mrs.') },
    { value: 'miss', label: __('Miss') },
  ];

  return (
    <div>
      <div>{AfterPayRadioInput}</div>
      <div className="mx-4 my-4">
        <Card bg="darker">
          <div className="container flex flex-col justify-center w-4/5">
            <TextInput
              label={__('Date of Birth')}
              name={dateOfBirthField}
              formikData={formikData}
            />
            <SelectInput
              label={__('Gender')}
              name={genderField}
              formikData={formikData}
              options={genderOptions}
            />
            <TextInput
              label={__('Telephone')}
              name={phoneField}
              formikData={formikData}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

AfterPayComponent.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default AfterPayComponent;
