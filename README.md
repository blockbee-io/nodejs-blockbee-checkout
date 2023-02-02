[<img src="https://blockbee.io/static/assets/images/blockbee_logo_nospaces.png" width="300"/>](image.png)

# BlockBee's Checkout NodeJS Library
NodeJS's implementation of BlockBee's Checkout payment gateway

## Install

```console
npm install @blockbee/checkout
```

## Usage

### Importing in your project file

```js
var BlockBee = require('@blockbee/checkout')
```

### Requesting Payment
```js
const bb = new BlockBee(apiKey, params, blockbeeParams)

const address = await bb.paymentRequest(redirectUrl, value)
```

Where:

* ``api_key`` is the API Key provided by our [Dashboard](https://dash.blockbee.io/).
* ``params`` is any parameter you wish to send to identify the payment, such as `{order_id: 1234}`.
* ``bb_params`` parameters that will be passed to BlockBee _(check which extra parameters are available here: https://docs.blockbee.io/#operation/create).
* ``redirect_url`` URL in your platform, where the user will be redirected to following the payment. Should be able to process the payment using the `success_token`.
* ``value`` amount in currency set in Payment Settings you want to receive from the user.

### Getting notified when the user completes the Payment
> When receiving payments, you have the option to receive them in either the ``notify_url`` or the ``redirect_url``, but adding the ``redirect_url``  is required (refer to our documentation at https://docs.blockbee.io/#operation/paymentipn).

### Requesting Deposit
```js
const bb = new BlockBee(apiKey, params, blockbeeParams)

const address = await bb.depositRequest(notifyUrl)
```

* ``api_key`` is the API Key provided by our [Dashboard](https://dash.blockbee.io/).
* ``params`` is any parameter you wish to send to identify the payment, such as `{order_id: 1234}`.
* ``bb_params`` parameters that will be passed to BlockBee _(check which extra parameters are available here: https://docs.blockbee.io/#operation/deposit).
* ``notify_url`` URL in your platform, where the IPN will be sent notifying that a deposit was done. Parameters are available here: https://docs.blockbee.io/#operation/depositipn.

## Help

Need help?  
Contact us @ https://blockbee.io/contacts/


### Changelog

#### 1.0.0
* Initial Release
