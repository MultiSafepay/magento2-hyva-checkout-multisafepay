<p align="center">
  <img src="https://www.multisafepay.com/img/multisafepaylogo.svg" width="400px" position="center">
</p>

# MultiSafepay module for Hyva Checkout

This is the module of our new Magento 2 Hyva Checkout integration.

Before you get started with MultiSafepay and Hyva Checkout, please read and follow our [installation & configuration manual](https://docs.multisafepay.com/integrations/plugins/magento2/) first.

Please note that at the moment we are only supporting redirect payment methods in combination with Hyva Checkout. More features will be added in future releases.

## About MultiSafepay ##
MultiSafepay is a collecting payment service provider which means we take care of the agreements, technical details and payment collection required for each payment method. You can start selling online today and manage all your transactions from one place.

## Supported Payment Methods ##
The supported Payment Methods for this module can be found over here: [Payment Methods & Giftcards](https://docs.multisafepay.com/plugins/magento2/faq/#available-payment-methods-in-magento-2)

## Requirements
- To use the plugin you need a MultiSafepay account. You can create a test account on https://testmerchant.multisafepay.com/signup
- Magento Open Source version 2.3.x & 2.4.x
- PHP 7.1+

## Installation
This package does not work yet with the MultiSafepay_Graphql module. 
Please disable the module first, if you have it installed.

Add our package to the PaymentMethodsRepo section in the reactapp package.json:

```
"config": {
    "paymentMethodsRepo": {
        "multisafepay": "git@github.com:multisafepay/magento2-hyva-checkout-multisafepay.git"
    }
},
```

Install the MultiSafepay package:
```
npm install
```

After that, add the MultiSafepay renderer to reactapp/src/PaymentMethods/paymentConfig.json:

```
{"availablePaymentMethods":[
    "multisafepay"
]}
```

Make sure to rebuild the project with:
```shell
npm run build
```

## Support
You can create issues on our repository. If you need any additional help or support, please contact <a href="mailto:integration@multisafepay.com">integration@multisafepay.com</a>

We are also available on our Magento Slack channel [#multisafepay-payments](https://magentocommeng.slack.com/messages/multisafepay-payments/).
Feel free to start a conversation or provide suggestions as to how we can refine our Hyva Checkout integration.

## A gift for your contribution
We look forward to receiving your input. Have you seen an opportunity to change things for better? We would like to invite you to create a pull request on GitHub.
Are you missing something and would like us to fix it? Suggest an improvement by sending us an [email](mailto:integration@multisafepay.com) or by creating an issue.

What will you get in return? A brand new designed MultiSafepay t-shirt which will make you part of the team!

## License
[Open Software License (OSL 3.0)](https://github.com/MultiSafepay/Magento2Msp/blob/master/LICENSE.md)

## Want to be part of the team?
Are you a developer interested in working at MultiSafepay? [View](https://www.multisafepay.com/careers/#jobopenings) our job openings and feel free to get in touch with us.
