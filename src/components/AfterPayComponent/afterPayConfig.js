import { get } from 'lodash';
import RootElement from '@hyva/react-checkout/utils/rootElement';

const config = RootElement.getPaymentConfig();
const afterpay = get(config, 'multisafepay_afterpay');
const transactionType = get(afterpay, 'transaction_type', []);

const afterPayConfig = {
  transaction_type: transactionType,
};

export default afterPayConfig;
