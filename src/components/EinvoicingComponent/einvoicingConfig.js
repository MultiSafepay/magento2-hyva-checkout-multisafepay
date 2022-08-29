import _get from 'lodash.get';
import RootElement from '@hyva/react-checkout/utils/rootElement';

const config = RootElement.getPaymentConfig();
const einvoicing = _get(config, 'multisafepay_einvoicing');
const transactionType = _get(einvoicing, 'transaction_type', []);

const einvoicingConfig = {
  transaction_type: transactionType,
};

export default einvoicingConfig;
