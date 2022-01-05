import { useCallback } from 'react';
import _get from 'lodash.get';
import _set from 'lodash.set';
import { __ } from '../../../../i18n';
import { performRedirect } from '../utility';
import { LOGIN_FORM } from '../../../../config';
import useMultiSafepayAppContext from './useMultiSafepayAppContext';
import useMultiSafepayCartContext from './useMultiSafepayCartContext';

export default function usePerformPlaceOrder(paymentMethodCode) {
  const { cartId, setRestPaymentMethod, setOrderInfo } =
    useMultiSafepayCartContext();
  const { isLoggedIn, setPageLoader, setErrorMessage } =
    useMultiSafepayAppContext();

  return useCallback(
    async (values, additionalData) => {
      try {
        const paymentMethodData = {
          paymentMethod: {
            method: paymentMethodCode,
            additional_data: additionalData,
          },
        };
        const email = _get(values, `${LOGIN_FORM}.email`);

        if (!isLoggedIn) {
          _set(paymentMethodData, 'email', email);
        } else {
          _set(paymentMethodData, 'cartId', cartId);
        }

        setPageLoader(true);
        const order = await setRestPaymentMethod(paymentMethodData, isLoggedIn);
        setPageLoader(false);
        performRedirect(order);

        if (order) {
          setOrderInfo(order);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage(
          __(
            'This transaction could not be performed. Please select another payment method.'
          )
        );
        setPageLoader(false);
      }
    },
    [
      cartId,
      isLoggedIn,
      setOrderInfo,
      setPageLoader,
      setErrorMessage,
      paymentMethodCode,
      setRestPaymentMethod,
    ]
  );
}
