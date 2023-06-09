import { get } from 'lodash';
import RootElement from '@hyva/react-checkout/utils/rootElement';

const config = RootElement.getPaymentConfig();
const in3 = get(config, 'multisafepay_in3');
const transactionType = get(in3, 'transaction_type', []);

const in3Config = {
  transaction_type: transactionType,
};

export default in3Config;
