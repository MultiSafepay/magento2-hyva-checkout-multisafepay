import _get from 'lodash.get';
import RootElement from '../../../../../utils/rootElement';

const config = RootElement.getPaymentConfig();
const directdebit = _get(config, 'multisafepay_directdebit');
const transactionType = _get(directdebit, 'transaction_type', []);

const directDebitConfig = {
  transaction_type: transactionType,
};

export default directDebitConfig;
