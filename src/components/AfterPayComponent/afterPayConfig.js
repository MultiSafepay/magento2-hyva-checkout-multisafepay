import _get from 'lodash.get';
import RootElement from '../../../../../utils/rootElement';

const config = RootElement.getPaymentConfig();
const afterpay = _get(config, 'multisafepay_afterpay');
const transactionType = _get(afterpay, 'transaction_type', []);

const afterPayConfig = {
  transaction_type: transactionType,
};

export default afterPayConfig;
