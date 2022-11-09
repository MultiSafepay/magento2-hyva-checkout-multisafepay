import React, { useEffect, useContext, useState } from 'react';
import { func, shape } from 'prop-types';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { __ } from '@hyva/react-checkout/i18n';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import TextInput from '@hyva/react-checkout/components/common/Form/TextInput';
import Card from '@hyva/react-checkout/components/common/Card';
import CheckoutFormContext from '@hyva/react-checkout/context/Form/CheckoutFormContext';
import { PAYMENT_METHOD_FORM } from '@hyva/react-checkout/config';
import useMultiSafepayPaymentMethodContext from '../../hooks/useMultiSafepayPaymentMethodContext';
import useMultiSafepayEinvoicing from './hooks/useMultiSafepayEinvoicing';
import einvoicingConfig from './einvoicingConfig';
import { paymentMethodShape } from '../../utility';
import useCSS from '../../hooks/useMultiSafepayStyles';

const dateOfBirthField = `${PAYMENT_METHOD_FORM}.multisafepay.einvoicing.dateOfBirthField`;
const accountNumberField = `${PAYMENT_METHOD_FORM}.multisafepay.einvoicing.accountNumberField`;

function EinvoicingComponent({ method, selected, actions }) {
  const { formikData, setFieldValue } = useMultiSafepayPaymentMethodContext();
  const [dateField, setDate] = useState(new Date());
  const { registerPaymentAction } = useContext(CheckoutFormContext);
  const { placeOrderWithEinvoicing } = useMultiSafepayEinvoicing(method.code);
  const isSelected = method.code === selected.code;

  useEffect(() => {
    setFieldValue(accountNumberField, '');
  }, [setFieldValue]);

  useEffect(() => {
    setFieldValue(dateOfBirthField, moment(dateField).format('YYYY-MM-DD'));
  }, [dateField, setFieldValue]);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithEinvoicing);
  }, [method, registerPaymentAction, placeOrderWithEinvoicing]);

  const EinvoicingRadioInput = (
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

  if (!isSelected || einvoicingConfig.transaction_type === 'redirect') {
    return EinvoicingRadioInput;
  }

  return (
    <div>
      <div>{EinvoicingRadioInput}</div>
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

EinvoicingComponent.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default EinvoicingComponent;
