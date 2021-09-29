import React, { useEffect, useContext } from 'react';
import { func, shape } from 'prop-types';

import Card from '../../../../../components/common/Card';
import RadioInput from '../../../../../components/common/Form/RadioInput';
import { paymentMethodShape } from '../../utility';
import useMultiSafepayIdeal from './hooks/useMultiSafepayIdeal';
import CheckoutFormContext from '../../../../../context/Form/CheckoutFormContext';

function Ideal({ method, actions }) {
  const { placeOrderWithIdeal } = useMultiSafepayIdeal(method.code);
  const { registerPaymentAction } = useContext(CheckoutFormContext);

  useEffect(() => {
    registerPaymentAction(method.code, placeOrderWithIdeal);
  }, [method, registerPaymentAction, placeOrderWithIdeal]);

  return (
    <div>
      <div>
        <RadioInput
          value={method.code}
          label={method.title}
          name="paymentMethod"
          onChange={actions.change}
        />
      </div>
      <div className="mx-4 my-4">
        <Card bg="darker">
          <div>
            <p className="mt-4">iDEAL</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

Ideal.propTypes = {
  actions: shape({ change: func }).isRequired,
  method: paymentMethodShape.isRequired,
};

export default Ideal;
