import React, { useEffect, useContext } from 'react';
import { get } from 'lodash';
import { func, shape } from 'prop-types';
import Card from '../../../../../components/common/Card';
import { paymentMethodShape } from '../../utility';
import useMultiSafepayCheckoutFormContext from '../../hooks/useMultiSafepayCheckoutFormContext';
import useMultiSafepayCreditCard from './hooks/useMultiSafepayCreditCard';
import RadioInput from '../../../../../components/common/Form/RadioInput';
import creditCardConfig from './creditCardConfig';
import LocalStorage from '../../../../../utils/localStorage';
import CartContext from '../../../../../context/Cart/CartContext';
import {
  addComponent,
  loadComponent,
  initializeComponent,
} from './utility/multisafepayComponent';

function CreditCardComponent({ method, selected, actions }) {
  const { registerPaymentAction } = useMultiSafepayCheckoutFormContext();
  const { placeOrderWithCreditCard } = useMultiSafepayCreditCard(method.code);
  const isSelected = method.code === selected.code;
  const paymentRequestData = get(
    LocalStorage.getMagentoLocalStorage(),
    'multisafepay-payment-request'
  );
  const [cartData] = useContext(CartContext);
  const cart = get(cartData, 'cart');

  addComponent();

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithCreditCard);
  }, [method, registerPaymentAction, placeOrderWithCreditCard]);

  useEffect(() => {
    if (isSelected) {
      initializeComponent();
    }
  }, [isSelected]);

  const CreditCardRadioInput = (
    <RadioInput
      value={method.code}
      label={method.title}
      name="paymentMethod"
      checked={isSelected}
      onChange={actions.change}
    />
  );

  if (!isSelected || creditCardConfig.payment_type === 'redirect') {
    return CreditCardRadioInput;
  }

  const orderData = {
    currency: paymentRequestData.currency,
    amount: paymentRequestData.cartTotal,
    customer: {
      locale: paymentRequestData.locale,
      country: cart.billing_address.country,
    },
    template: {
      settings: {
        embed_mode: true,
      },
    },
  };

  loadComponent(paymentRequestData, orderData);

  return (
    <div>
      <div>{CreditCardRadioInput}</div>
      <div className="mx-4 my-4">
        <Card bg="darker">
          <div id="MultiSafepayPayment" />
        </Card>
      </div>
    </div>
  );
}

CreditCardComponent.propTypes = {
  method: paymentMethodShape.isRequired,
  selected: paymentMethodShape.isRequired,
  actions: shape({ change: func }).isRequired,
};

export default CreditCardComponent;
