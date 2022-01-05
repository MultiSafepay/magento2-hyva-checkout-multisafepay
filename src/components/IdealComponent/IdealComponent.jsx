/* eslint-disable */
import React, { useCallback, useEffect, useContext } from 'react';
import { func, shape } from 'prop-types';
import { __ } from '../../../../../i18n';
import RadioInput from '../../../../../components/common/Form/RadioInput';
import Card from '../../../../../components/common/Card';
import SelectInput from '../../../../../components/common/Form/SelectInput';
import { paymentMethodShape } from '../../utility';
import CheckoutFormContext from '../../../../../context/Form/CheckoutFormContext';
import useMultiSafepayPaymentMethodContext from '../../hooks/useMultiSafepayPaymentMethodContext';
import usePerformPlaceOrder from '../../hooks/usePerformPlaceOrder';
import useMultiSafepayIdeal from '../IdealComponent/hooks/useMultiSafepayIdeal';
import { PAYMENT_METHOD_FORM } from '../../../../../config';
import idealConfig from './idealConfig';

const issuersField = `${PAYMENT_METHOD_FORM}.multisafepay.ideal.issuersField`;

function IdealComponent({ method, selected, actions }) {
  const { formikData, setFieldValue } = useMultiSafepayPaymentMethodContext();
  const { registerPaymentAction } = useContext(CheckoutFormContext);
  const { placeOrderWithIdeal } = useMultiSafepayIdeal(method.code);
  const isSelected = method.code === selected.code;
  const performPlaceOrder = usePerformPlaceOrder(method.code);

  useEffect(() => {
    setFieldValue(issuersField, '');
  }, [setFieldValue]);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithIdeal);
  }, [method, registerPaymentAction, placeOrderWithIdeal]);

  if (!isSelected) {
    return (
      <RadioInput
        value={method.code}
        label={method.title}
        name="paymentMethod"
        checked={isSelected}
        onChange={actions.change}
      />
    );
  }

  return (
    <div>
      <div>
        <RadioInput
          value={method.code}
          label={method.title}
          name="paymentMethod"
          checked={isSelected}
          onChange={actions.change}
        />
      </div>
      <div className="mx-4 my-4">
        <Card bg="darker">
          <div className="container flex flex-col justify-center w-4/5">
            <SelectInput
              formikData={formikData}
              name={issuersField}
              label={__('Issuers')}
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
