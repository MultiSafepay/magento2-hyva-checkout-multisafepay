import { get } from 'lodash';
import { __ } from '@hyva/react-checkout/i18n';
import RootElement from '@hyva/react-checkout/utils/rootElement';

const config = RootElement.getPaymentConfig();
const ideal = get(config, 'multisafepay_ideal');
const issuers = get(ideal, 'issuers', []);

const idealConfig = {
  issuers: issuers.map(({ code, description }) => ({
    value: code,
    label: __(description),
  })),
};

export default idealConfig;
