import React, { useEffect, useContext } from 'react';
import { func, shape } from 'prop-types';
import { __ } from '@hyva/react-checkout/i18n';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import Card from '@hyva/react-checkout/components/common/Card';
import SelectInput from '@hyva/react-checkout/components/common/Form/SelectInput';
import CheckoutFormContext from '@hyva/react-checkout/context/Form/CheckoutFormContext';
import { PAYMENT_METHOD_FORM } from '@hyva/react-checkout/config';
import useMultiSafepayPaymentMethodContext from '../../hooks/useMultiSafepayPaymentMethodContext';
import useMultiSafepayIdeal from './hooks/useMultiSafepayIdeal';
import idealConfig from './idealConfig';
import { paymentMethodShape } from '../../utility';

const issuersField = `${PAYMENT_METHOD_FORM}.multisafepay.ideal.issuersField`;

function IdealComponent({ method, selected, actions }) {
  const { formikData, setFieldValue } = useMultiSafepayPaymentMethodContext();
  const { registerPaymentAction } = useContext(CheckoutFormContext);
  const { placeOrderWithIdeal } = useMultiSafepayIdeal(method.code);
  const isSelected = method.code === selected.code;

  useEffect(() => {
    setFieldValue(issuersField, '');
  }, [setFieldValue]);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithIdeal);
  }, [method, registerPaymentAction, placeOrderWithIdeal]);

  const idealRadioInput = (
    <RadioInput
      value={method.code}
      label={method.title}
      name="paymentMethod"
      checked={isSelected}
      onChange={actions.change}
    />
  );

  if (!isSelected) {
    return idealRadioInput;
  }

  return (
    <div>
      <div>{idealRadioInput}</div>
      <div className="mx-4 my-4">
        <Card bg="darker">
          <div className="container flex flex-col justify-center w-4/5">
            <SelectInput
              formikData={formikData}
              name={issuersField}
              label={__('Choose your bank')}
              options={idealConfig.issuers}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}

IdealComponent.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default IdealComponent;
