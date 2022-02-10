import React, { useEffect, useContext } from 'react';
import { func, shape } from 'prop-types';
import { __ } from '../../../../../i18n';
import RadioInput from '../../../../../components/common/Form/RadioInput';
import TextInput from '../../../../../components/common/Form/TextInput';
import SelectInput from '../../../../../components/common/Form/SelectInput';
import Card from '../../../../../components/common/Card';
import { paymentMethodShape } from '../../utility';
import CheckoutFormContext from '../../../../../context/Form/CheckoutFormContext';
import useMultiSafepayPaymentMethodContext from '../../hooks/useMultiSafepayPaymentMethodContext';
import useMultiSafepayIn3 from './hooks/useMultiSafepayIn3';
import { PAYMENT_METHOD_FORM } from '../../../../../config';
import in3Config from './in3Config';

const dateOfBirthField = `${PAYMENT_METHOD_FORM}.multisafepay.in3.dateOfBirthField`;
const genderField = `${PAYMENT_METHOD_FORM}.multisafepay.in3.genderField`;
const phoneField = `${PAYMENT_METHOD_FORM}.multisafepay.in3.phoneField`;

function In3Component({ method, selected, actions }) {
  const { formikData, setFieldValue } = useMultiSafepayPaymentMethodContext();
  const { registerPaymentAction } = useContext(CheckoutFormContext);
  const { placeOrderWithIn3 } = useMultiSafepayIn3(method.code);
  const isSelected = method.code === selected.code;

  useEffect(() => {
    setFieldValue(dateOfBirthField, '');
    setFieldValue(genderField, '');
    setFieldValue(phoneField, '');
  }, [setFieldValue]);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithIn3);
  }, [method, registerPaymentAction, placeOrderWithIn3]);

  const In3RadioInput = (
    <RadioInput
      value={method.code}
      label={method.title}
      name="paymentMethod"
      checked={isSelected}
      onChange={actions.change}
    />
  );

  if (!isSelected || in3Config.transaction_type === 'redirect') {
    return In3RadioInput;
  }

  const genderOptions = [
    { value: 'mr', label: __('Mr.') },
    { value: 'mrs', label: __('Mrs.') },
    { value: 'miss', label: __('Miss') },
  ];

  return (
    <div>
      <div>{In3RadioInput}</div>
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

In3Component.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default In3Component;
