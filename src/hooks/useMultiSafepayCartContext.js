import { useContext } from 'react';
import _ from 'lodash';

import CartContext from '@hyva/react-checkout/context/Cart/CartContext';

export default function useMultiSafepayCartContext() {
  const [cartData, { setRestPaymentMethod, setOrderInfo }] =
    useContext(CartContext);
  const cartId = _.get(cartData, 'cart.id');

  return {
    cartId,
    setOrderInfo,
    setRestPaymentMethod,
  };
}
