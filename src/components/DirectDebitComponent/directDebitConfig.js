import { get } from 'lodash';
import RootElement from '@hyva/react-checkout/utils/rootElement';

const config = RootElement.getPaymentConfig();
const directdebit = get(config, 'multisafepay_directdebit');
const transactionType = get(directdebit, 'transaction_type', []);

const directDebitConfig = {
  transaction_type: transactionType,
};

export default directDebitConfig;
