import _get from 'lodash.get';
import RootElement from '../../../../../utils/rootElement';

const config = RootElement.getPaymentConfig();
const in3 = _get(config, 'multisafepay_in3');
const transactionType = _get(in3, 'transaction_type', []);

const in3Config = {
  transaction_type: transactionType,
};

export default in3Config;
