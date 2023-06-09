import { get } from 'lodash';
import RootElement from '@hyva/react-checkout/utils/rootElement';

const config = RootElement.getPaymentConfig();

const creditcard = get(config, 'multisafepay_creditcard');
const paymentType = get(creditcard, 'payment_type', []);

const creditCardConfig = {
  payment_type: paymentType,
};

export default creditCardConfig;
