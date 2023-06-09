import { useCallback } from 'react';
import { get, set } from 'lodash';
import { __ } from '@hyva/react-checkout/i18n';
import { LOGIN_FORM } from '@hyva/react-checkout/config';
import useMultiSafepayAppContext from './useMultiSafepayAppContext';
import useMultiSafepayCartContext from './useMultiSafepayCartContext';
import {
  checkErrors,
  getErrors,
} from '../components/CreditCardComponent/utility/multisafepayComponent';
import { performRedirect } from '../utility';

export default function usePerformPlaceOrderWithComponent(paymentMethodCode) {
  const { cartId, setRestPaymentMethod, setOrderInfo } =
    useMultiSafepayCartContext();
  const { isLoggedIn, setPageLoader, setErrorMessage } =
    useMultiSafepayAppContext();

  return useCallback(
    async (values, additionalData) => {
      try {
        if (checkErrors()) {
          throw new Error('MultiSafepay component error');
        }

        const paymentMethodData = {
          paymentMethod: {
            method: paymentMethodCode,
            additional_data: additionalData,
          },
        };
        const email = get(values, `${LOGIN_FORM}.email`);

        if (!isLoggedIn) {
          set(paymentMethodData, 'email', email);
        } else {
          set(paymentMethodData, 'cartId', cartId);
        }

        setPageLoader(true);
        const order = await setRestPaymentMethod(paymentMethodData, isLoggedIn);
        setPageLoader(false);
        performRedirect(order);

        if (order) {
          setOrderInfo(order);
        }
      } catch (error) {
        let validationError = false;
        let validationMessage =
          'This transaction could not be performed. Please select another payment method.';

        // eslint-disable-next-line
        getErrors().errors.forEach(function (item) {
          console.error(item.message);

          if (!validationError && item.type === 'validation') {
            validationMessage = __(
              'One or more fields are invalid, please try again'
            );
            validationError = true;
          }
        });

        console.error(error);
        setErrorMessage(__(validationMessage));
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
