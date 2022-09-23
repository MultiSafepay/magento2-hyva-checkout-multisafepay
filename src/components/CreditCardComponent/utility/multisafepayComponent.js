/* eslint-disable */
import useScript from "../hooks/useMultiSafepayComponent";
import useCSS from "../../../hooks/useMultiSafepayStyles";

let creditCardComponent;

export function addComponent() {
  useScript('https://pay.multisafepay.com/sdk/components/v2/components.js');
  useCSS('https://pay.multisafepay.com/sdk/components/v2/components.css');
}

export function loadNewComponent(paymentRequestData, orderData) {
  return new window.MultiSafepay({
    env: paymentRequestData.environment,
    apiToken: paymentRequestData.apiToken,
    order: orderData
  });
}

export function loadComponent(paymentRequestData, getOrderData) {
  if (!creditCardComponent) {
    creditCardComponent = loadNewComponent(paymentRequestData, getOrderData);
  }

  return creditCardComponent;
}

export function initializeComponent() {
  if (typeof creditCardComponent !== 'undefined') {
    creditCardComponent.init('payment', {
      container: '#MultiSafepayPayment',
      gateway: 'CREDITCARD',
      onError: state => {
        console.log('onError', state);
      }
    });
  }
}

export function getPayload() {
  if (typeof creditCardComponent !== 'undefined') {
    return creditCardComponent.getPaymentData().payload;
  }

  return '';
}

export function checkErrors() {
  if (typeof creditCardComponent !== 'undefined') {
    return creditCardComponent.hasErrors();
  }
}

export function getErrors() {
  if (typeof creditCardComponent !== 'undefined') {
    return creditCardComponent.getErrors();
  }
}
