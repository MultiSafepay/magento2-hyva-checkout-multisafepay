import { get } from 'lodash';
import RootElement from '@hyva/react-checkout/utils/rootElement';

const config = RootElement.getPaymentConfig();
const einvoicing = get(config, 'multisafepay_einvoicing');
const transactionType = get(einvoicing, 'transaction_type', []);

const einvoicingConfig = {
  transaction_type: transactionType,
};

export default einvoicingConfig;
