import { shape, string } from 'prop-types';
import _get from 'lodash.get';

import { config } from '../../../../config';
import LocalStorage from '../../../../utils/localStorage';

export const paymentMethodShape = shape({ title: string, code: string });

export function performRedirect(order) {
  const orderNumber = _get(order, 'order_number');

  if (orderNumber) {
    window.location.replace(`${config.baseUrl}/multisafepay/connect/redirect/`);
    LocalStorage.clearCheckoutStorage();
  }
}
