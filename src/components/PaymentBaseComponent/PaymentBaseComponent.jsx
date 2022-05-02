import React, { useCallback, useEffect, useContext } from 'react';
import { func, shape } from 'prop-types';
import RadioInput from '@hyva/react-checkout/components/common/Form/RadioInput';
import CheckoutFormContext from '@hyva/react-checkout/context/Form/CheckoutFormContext';
import { paymentMethodShape } from '../../utility';
import usePerformPlaceOrder from '../../hooks/usePerformPlaceOrder';

function PaymentBaseComponent({ method, selected, actions }) {
  const { registerPaymentAction } = useContext(CheckoutFormContext);
  const isSelected = method.code === selected.code;
  const performPlaceOrder = usePerformPlaceOrder(method.code);
  const placeOrderWithMultiSafepay = useCallback(
    (values) => performPlaceOrder(values),
    [performPlaceOrder]
  );

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithMultiSafepay);
  }, [method, registerPaymentAction, placeOrderWithMultiSafepay]);

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

PaymentBaseComponent.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default PaymentBaseComponent;
