## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [General Configurations](#general-configurations)
- [Transaction Modes](#transaction-modes)
- [Samples](#samples)

## Installation

You can integrate with goSellElements by:

- JavaScript Library, which allows front end developers to setup the payment gateway on their stores easily by adding a very basic snippet of JavaScript using the following script tag:

```
<script type="text/javascript" src="https://goSellJSLib.b-cdn.net/v1.6.3/js/gosell.js"></script>
```

> Use the goSellElements in server side environment, otherwise the credit card section will not work.

- Install goSell React Component on NPM for who uses React JS. by running the following command in the terminal:

```
npm i @tap-payments/goSell
```

import the library inside your code:

```
import { GoSellElements } from "@tap-payments/goSell";
```

## Usage

The **JavaScript Library** allows you to use any HTML element or JavaScript event to add goSell elements to your page. You will just need basic JavaScript skills to integrate with goSell.

When your page loads, you should call the configurations of your payment gateway by creating a handler object using `goSell.goSellElements()`. You can call `goSell.submit()` to submit the form and create a card token on click event.

> for react component, submit the form by `GoSellElements.submit()` with rendering `<GoSellElements />` component with the required configurations.

## General Configurations

#### gateway **[Object]\***:

It's a required field for the JS library. It includes the general settings of the payment gateway:

| property name           | Type                                         | Status       | Default value                                                                                                                                                                                                                                                                                      | Description                                                                                                                                                                                                                                                                                                                                                      |
| ----------------------- | -------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| publicKey               | string                                       | **required** |                                                                                                                                                                                                                                                                                                    | Your goSell public key.                                                                                                                                                                                                                                                                                                                                          |
| language                | string                                       | **optional** | 'en'                                                                                                                                                                                                                                                                                               | Define the language of payment gateway. The supported languages are 'en' & 'ar'.                                                                                                                                                                                                                                                                                 |
| supportedCurrencies     | string or array of currencies using ISO code | **optional** | 'all'                                                                                                                                                                                                                                                                                              | there's 3 different values for this property:<br><br> 1.'all': which will display all goSell supported currencies.<br><br> 2.'gcc': the currencies of Gulf Cooperation Council. <br><br> 3. Array of strings: specify a custom list of the following supported currencies by goSell: <br> ["KWD", "BHD", "SAR", "AED", "OMR", "QAR", "EGP", "GBP", "USD", "EUR"] |
| supportedPaymentMethods | string or array of required payment methods  | **optional** | 'all'                                                                                                                                                                                                                                                                                              | there's 2 different values for this property:<br><br> 1.'all': shows all activated payment methods in your account.<br><br> 2. Array of strings: specify a custom list of your activated payment methods in your account.                                                                                                                                        |
| notifications           | string                                       | **optional** | 'standard'                                                                                                                                                                                                                                                                                         | Define your preferences, if you like to use your own component or HTML element to show notifications or use goSell standard notifications bar.                                                                                                                                                                                                                   |
| callback                | function                                     | **optional** |                                                                                                                                                                                                                                                                                                    | Define an action or a callback after each transaction. When the payment process is being executed, the library will return the transaction result JSON to the callback function.                                                                                                                                                                                 |
| labels                  | object                                       | **optional** | {<br>cardNumber:"Card Number",<br>expirationDate:"MM/YY",<br>cvv:"CVV",<br>cardHolder:"Name on Card",<br>actionButton:"Pay"<br>}                                                                                                                                                                   | Define custom titles for input boxes inside credit/debit cards section.                                                                                                                                                                                                                                                                                          |
| style                   | object                                       | **optional** | {<br>base: {<br>color: '#535353',<br>lineHeight: '18px',<br>fontFamily: 'sans-serif',<br>fontSmoothing: 'antialiased',<br>fontSize: '16px',<br>'::placeholder': {<br>color: 'rgba(0, 0, 0, 0.26)',<br>fontSize:'15px'<br>}<br>},<br>invalid: {<br>color: 'red',<br>iconColor: '#fa755a '<br>}<br>} | Define custom style for input boxes inside credit/debit cards section.                                                                                                                                                                                                                                                                                           |

#### token **[boolean]\***:

Used to generate card token.

## Samples

## Vanilla JS Samples:

- [Sample 1](samples/js/index.html)

## React JS Samples:

- [Sample 2](samples/react/index.js)

## Author

- Hala Q. [GitHub](https://github.com/halaq)
- Hala Q.[NPM](https://www.npmjs.com/~hala.q)
