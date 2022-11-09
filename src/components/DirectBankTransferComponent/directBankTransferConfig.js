import { get } from 'lodash';
import RootElement from '@hyva/react-checkout/utils/rootElement';

const config = RootElement.getPaymentConfig();
const directBankTransfer = get(config, 'multisafepay_directbanktransfer');
const transactionType = get(directBankTransfer, 'transaction_type', []);

const directBankTransferConfig = {
  transaction_type: transactionType,
};

export default directBankTransferConfig;
