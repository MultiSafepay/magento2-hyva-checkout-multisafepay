import { get } from 'lodash';
import RootElement from '@hyva/react-checkout/utils/rootElement';

const config = RootElement.getPaymentConfig();
const payafterdelivery = get(config, 'multisafepay_payafter');
const transactionType = get(payafterdelivery, 'transaction_type', []);

const payAfterDeliveryConfig = {
  transaction_type: transactionType,
};

export default payAfterDeliveryConfig;
