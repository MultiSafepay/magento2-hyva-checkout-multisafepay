import { shape, string } from 'prop-types';
import { get } from 'lodash';
import { config } from '@hyva/react-checkout/config';

export const paymentMethodShape = shape({ title: string, code: string });

export function performRedirect(order) {
  const orderNumber = get(order, 'order_number');

  if (orderNumber) {
    window.location.replace(`${config.baseUrl}/multisafepay/connect/redirect/`);
  }
}
