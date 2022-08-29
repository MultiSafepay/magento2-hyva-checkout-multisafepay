import _get from 'lodash.get';
import RootElement from '@hyva/react-checkout/utils/rootElement';

const config = RootElement.getPaymentConfig();
const payafterdelivery = _get(config, 'multisafepay_payafter');
const transactionType = _get(payafterdelivery, 'transaction_type', []);

const payAfterDeliveryConfig = {
  transaction_type: transactionType,
};

export default payAfterDeliveryConfig;
