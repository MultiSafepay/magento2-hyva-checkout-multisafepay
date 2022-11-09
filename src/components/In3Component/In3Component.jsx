import React, { useEffect, useContext, useState } from 'react';
import { func, shape } from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { __ } from '@hyva/react-checkout/i18n';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import TextInput from '@hyva/react-checkout/components/common/Form/TextInput';
import SelectInput from '@hyva/react-checkout/components/common/Form/SelectInput';
import Card from '@hyva/react-checkout/components/common/Card';
import CheckoutFormContext from '@hyva/react-checkout/context/Form/CheckoutFormContext';
import { PAYMENT_METHOD_FORM } from '@hyva/react-checkout/config';
import useMultiSafepayPaymentMethodContext from '../../hooks/useMultiSafepayPaymentMethodContext';
import useMultiSafepayIn3 from './hooks/useMultiSafepayIn3';
import in3Config from './in3Config';
import { paymentMethodShape } from '../../utility';
import useCSS from '../../hooks/useMultiSafepayStyles';

const dateOfBirthField = `${PAYMENT_METHOD_FORM}.multisafepay.in3.dateOfBirthField`;
const genderField = `${PAYMENT_METHOD_FORM}.multisafepay.in3.genderField`;
const phoneField = `${PAYMENT_METHOD_FORM}.multisafepay.in3.phoneField`;

function In3Component({ method, selected, actions }) {
  const { formikData, setFieldValue } = useMultiSafepayPaymentMethodContext();
  const [dateField, setDate] = useState(new Date());
  const { registerPaymentAction } = useContext(CheckoutFormContext);
  const { placeOrderWithIn3 } = useMultiSafepayIn3(method.code);
  const isSelected = method.code === selected.code;

  useEffect(() => {
    setFieldValue(genderField, '');
    setFieldValue(phoneField, '');
  }, [setFieldValue]);

  useEffect(() => {
    setFieldValue(dateOfBirthField, moment(dateField).format('YYYY-MM-DD'));
  }, [dateField, setFieldValue]);

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

  useCSS(
    'https://cdnjs.cloudflare.com/ajax/libs/react-datepicker/2.8.0/react-datepicker.min.css'
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
            <DatePicker
              label={__('Date of Birth')}
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              selected={dateField}
              className="w-full max-w-md form-input"
              onChange={(date) => setDate(date)}
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
