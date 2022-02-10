import _get from 'lodash.get';
import RootElement from '../../../../../utils/rootElement';

const config = RootElement.getPaymentConfig();
const directBankTransfer = _get(config, 'multisafepay_directbanktransfer');
const transactionType = _get(directBankTransfer, 'transaction_type', []);

const directBankTransferConfig = {
  transaction_type: transactionType,
};

export default directBankTransferConfig;
