## Table of Contents

- [Brief Description](#brief-description)
- [goSell Checkout](#gosell-checkout)
  - [goSell Installation](#gosell-installation)
  - [goSell Usage](#gosell-usage)
  - [goSell General Configurations](#gosell-general-configurations)
  - [goSell Transaction Modes](#gosell-transaction-modes)
  - [goSell Examples](#gosell-examples)
- [goSellElements](#gosellelements)
  - [goSellElements Installation](#gosellelements-installation)
  - [goSellElements Usage](#gosellelements-usage)
  - [goSellElements General Configurations](#gosellelements-general-configurations)
  - [goSellElements Transaction Modes](#gosellelements-transaction-modes)
  - [goSellElements Examples](#gosellelements-examples)

## This version

- Upgrades mobx to version 6.
- Fixes some bugs in the previous versions.

> _NOTE:_ if you're using lower version of mobx 6 please integrate with v1.6.3 instead.

## Brief Description

goSell Payment Gateway accepts online payments. You can integrate with it in a different way based on your app's specifications.

The new version of goSell Payment Gateway provides:

**goSell Checkout**: It's a simple way to integrate goSell with a few client side code.

goSell Checkout includes two different integrations based on your preferences:

- goSell LightBox: open a light box / modal dialog inside your store.

- goSell Payment Page: open goSell payment gateway directly without server side code or making any REST API Requests.

**goSell Elements**: two-step process, with a client-side and a server-side actions. goSell securely will collect your customer’s payment information and returns a card token, then your server-side code can make an API request from the available REST APIs on https://tap.company/developers to complete the process based on your needs (by create a charge / authorize or saving the customer card).

## goSell Checkout

#### goSell Installation

You can integrate with goSell by:

- JavaScript Library, which allows front end developers to setup the payment gateway on their stores easily by adding a very basic snippet of JavaScript using the following script tag:

```
<script type="text/javascript" src="https://goSellJSLib.b-cdn.net/v2.0.0/js/gosell.js"></script>
```

** Take care, the configurations structure has been changed in this version **

> Use the JavaScript Library in server side environment, otherwise the credit card section will not work.

- Install goSell package from NPM for who uses React JS framework. by running the following command in the terminal:

```
npm i @tap-payments/gosell
```

import the library inside your code:

```
import { GoSell } from "@tap-payments/gosell";
```

#### goSell Usage

The **JavaScript Library** allows you to use any HTML element or JavaScript event to trigger Checkout. You will just need basic JavaScript skills to integrate with goSell.

**When your page loads**, you should define the configurations of your payment gateway by creating a handler object using `goSell.config()`. You can then call `goSell.openLightBox()` or `goSell.openPaymentPage()` on click event, to show the transaction result in your redirect page, call `goSell.showResult()`.

<!-- > for react component, open light box by `GoSell.openLightBox()` and the page by `GoSell.openPaymentPage()` with rendering `<GoSell />` component with the required configurations.  -->

#### goSell General Configurations

- gateway **[Object]\***:
  It's a required field for the JS library. It includes the general settings of the payment gateway:

| property name           | Type                                         | Status       | Default value                                                                                                                                                                                                                                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                |
| ----------------------- | -------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| publicKey               | string                                       | **required** |                                                                                                                                                                                                                                                                                                    | Your goSell public key.                                                                                                                                                                                                                                                                                                                                                    |
| language                | string                                       | **optional** | 'en'                                                                                                                                                                                                                                                                                               | Define the language of payment gateway. The supported languages are 'en' & 'ar'.                                                                                                                                                                                                                                                                                           |
| contactInfo             | boolean                                      | **optional** | true                                                                                                                                                                                                                                                                                               | Show the contact info (phone numbers, social media links .. etc) of the merchant in goSell gateway.                                                                                                                                                                                                                                                                        |
| supportedCurrencies     | string or array of currencies using ISO code | **optional** | 'all'                                                                                                                                                                                                                                                                                              | there's 3 different values for this property:<br><br> 1.'all': which will display all goSell supported currencies.<br><br> 2.'gcc': the currencies of Gulf Cooperation Council. <br><br> 3. Array of strings: specify a custom list of the following supported currencies by goSell: <br> ["KWD", "BHD", "SAR", "AED", "OMR", "QAR", "EGP", "GBP", "USD", "EUR"]           |
| supportedPaymentMethods | string or array of required payment methods  | **optional** | 'all'                                                                                                                                                                                                                                                                                              | there's 2 different values for this property:<br><br> 1.'all': shows all activated payment methods in your account.<br><br> 2. Array of strings: specify a custom list of your activated payment methods in your account. Available supported payment options in tap: [ "KNET", "AMERICAN_EXPRESS", "BENEFIT", "MADA","VISA","MASTERCARD", "FAWRY", "OMANNET","APPLE_PAY"]. Please note, that Apple pay is not supported in popup mode. |
| saveCardOption          | boolean                                      | **optional** | true                                                                                                                                                                                                                                                                                               | Enable or disable the saving card option on the credit/debit cards section in goSell payment gateway, if saving cards feature is enabled in your goSell account.                                                                                                                                                                                                           |
| customerCards           | boolean                                      | **optional** | true                                                                                                                                                                                                                                                                                               | Allow/Disallow your customers to pay by their saved cards on goSell Gateway. If you enabled this property, your customers will able to see their saved cards and use them security.                                                                                                                                                                                        |
| notifications           | string                                       | **optional** | 'standard'                                                                                                                                                                                                                                                                                         | Define your preferences, if you like to use your own component or HTML element to show notifications or use goSell standard notifications bar.                                                                                                                                                                                                                             |
| backgroundImg           | object                                       | **optional** |                                                                                                                                                                                                                                                                                                    | Define a background image for the goSell JS library page.                                                                                                                                                                                                                                                                                                                  |
| callback                | function                                     | **optional** |                                                                                                                                                                                                                                                                                                    | Define an action or a callback after each transaction. When the payment process is being executed, the library will return the transaction result JSON to the callback function.                                                                                                                                                                                           |
| onClose                 | function                                     | **optional** |                                                                                                                                                                                                                                                                                                    | Define an action or piece of code to be executed on the close event.                                                                                                                                                                                                                                                                                                       |
| labels                  | object                                       | **optional** | {<br>cardNumber:"Card Number",<br>expirationDate:"MM/YY",<br>cvv:"CVV",<br>cardHolder:"Name on Card",<br>actionButton:"Pay"<br>}                                                                                                                                                                   | Define custom titles for input boxes inside credit/debit cards section.                                                                                                                                                                                                                                                                                                    |
| style                   | object                                       | **optional** | {<br>base: {<br>color: '#535353',<br>lineHeight: '18px',<br>fontFamily: 'sans-serif',<br>fontSmoothing: 'antialiased',<br>fontSize: '16px',<br>'::placeholder': {<br>color: 'rgba(0, 0, 0, 0.26)',<br>fontSize:'15px'<br>}<br>},<br>invalid: {<br>color: 'red',<br>iconColor: '#fa755a '<br>}<br>} | Define custom style for input boxes inside credit/debit cards section.                                                                                                                                                                                                                                                                                                     |

- customer **[Object]\***:
  It's a required field for the JS library. Includes the customer details, it's required for _charge_, _authorize_ & _saveCard_ modes only.

| property name | Type   | Status                                               | Default value | Description                                                                                    |
| ------------- | ------ | ---------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------- |
| id            | string | **required, if the customer details is not defined** | null          | The id of your customer                                                                        |
| first_name    | string | **required, if the customer id is not defined**      |               | The first name of your customer                                                                |
| middle_name   | string | **optional**                                         |               | The middle name of your customer                                                               |
| last_name     | string | **optional**                                         |               | The last name of your customer                                                                 |
| email         | string | **required, if the customer id is not defined**      |               | Customer's email address                                                                       |
| phone         | object | **required, if the customer id is not defined**      |               | Customer's phone number. <br>Example: <br>{<br>country_code: "965",<br>number: "99999999"<br>} |

- order **[Object]\***:
  It's a required field for the JS library. Includes the order details, it's required for _charge_, _authorize_ modes only.

| property name | Type   | Status       | Default value | Description                                                                                                                                                                                                                                               |
| ------------- | ------ | ------------ | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| amount        | string | **required** |               | The total amount of the order.                                                                                                                                                                                                                            |
| currency      | string | **required** |               | The ISO currency code of the total amount.                                                                                                                                                                                                                |
| items         | Array  | **optional** | null          | Items details in the following format: <br><br> items: [<br> {<br> id: 0,<br> name: "Item ",<br> description: "Item Desc 0",<br> quantity: 1,<br> amount_per_unit: 0,<br>  total_amount: 10,<br> },<br>]<br> |
| shipping      | Object | **optional** | null          | Shipping details in the following fomrat:<br><br> shipping: { <br>"amount": 1,<br> "currency": "KWD",<br> "description": "test",<br> "provider": "ARAMEX",<br> "service": "test"<br>}                                                                     |
| taxes         | Array  | **optional** | null          | taxes details in the following fomrat: <br><br> taxes: [<br> {<br> "description": "test",<br> "name": "VAT",<br> "rate": {<br> "type": "F",<br> "value": 1<br> },<br> }, <br>]                                                                            |

- transaction **[object]**:
  It's a required field for the JS library. Includes the transaction mode and it's configurations.

| property name | Type   | Status                                 | Default value | Description                                               |
| ------------- | ------ | -------------------------------------- | ------------- | --------------------------------------------------------- |
| mode          | string | **required**                           |               | It can be 'charge', 'authorize', 'save_card' or 'token'   |
| charge        | object | **required if the mode = 'charge'**    |               | includes the merchant's configurations for charge mode    |
| authorize     | object | **required if the mode = 'authorize'** |               | includes the merchant's configurations for authorize mode |

#### goSell Transaction Modes

You have to **select one** of the following modes:

1. charge **[Object]**:

Enable charge mode in goSell payment gateway. The charge transactions will be created for a credit / debit cards. The object should includes the following settings:

| property name        | Type    | Status       | Default value                                           | Description                                                                                                                                                                                                                                                                        |
| -------------------- | ------- | ------------ | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| saveCard             | boolean | **optional** |                                                         | Payer can save the credit for future purpose. Customer phone number is required to save the card, values can be one of (true or false). In order to use this service, please contact our Team to get the access.                                                                   |
| threeDSecure         | boolean | **optional** |                                                         | The 3D Secure request status for a particular charge, values can be one of (true or false)                                                                                                                                                                                         |
| description          | string  | **optional** |                                                         | Charge Description.                                                                                                                                                                                                                                                                |
| statement_descriptor | string  | **optional** |                                                         | Payer Statement Descriptor.                                                                                                                                                                                                                                                        |
| reference            | object  | **optional** | {<br>transaction: "txn_0001",<br>order: "ord_0001"<br>} | Transaction & order numbers of your reference.                                                                                                                                                                                                                                     |
| destinations         | object  | **optional** |                                                         | It's used to transfer funds from one business to another with in tap. add the following block in charge or authorize object with the destination details: <br><br> **destinations: { <br>destination: [<br>{ <br>id: "0000000", <br> amount: 00, <br>currency: "KWD",<br>}, <br>],<br>}** |
| metadata             | string  | **optional** |                                                         | Set of key/value pairs that you can attach to an object. It can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to metadata. |
| receipt              | object  | **optional** | {<br>email: false,<br>sms: true<br>}                    | Whether receipt email or sms to be send to the payer or not                                                                                                                                                                                                                        |
| redirect             | string  | **required** |                                                         | After payment completed, payer will be redirected to this url (KNET and 3D secure charge request required, Redirect url)                                                                                                                                                           |
| post                 | string  | **required** |                                                         | After payment completed, goSell Gateway will post the charge response to the this url                                                                                                                                                                                              |

2. authorize **[Object]**:

Enable authorize mode in goSell payment gateway. The object should includes the following settings:

| property name        | Type    | Status       | Default value                                           | Description                                                                                                                                                                                                                                                                        |
| -------------------- | ------- | ------------ | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| auto                 | object  | **required** | {<br>type: "VOID",<br>time: 100<br>}                    | You can create CAPTURE or VOID successful authorized transactions by goSell after a specified time period, You can use the auto object in the authorize request. Time should be defined in hours, Minimum 1 hour and Maximum 168 hours.                                            |
| saveCard             | boolean | **optional** |                                                         | Payer can save the credit for future purpose. Customer phone number is required to save the card, values can be one of (true or false). In order to use this service, please contact our Team to get the access.                                                                   |
| threeDSecure         | boolean | **optional** |                                                         | The 3D Secure request status for a particular charge, values can be one of (true or false)                                                                                                                                                                                         |
| description          | string  | **optional** |                                                         | Charge Description.                                                                                                                                                                                                                                                                |
| statement_descriptor | string  | **optional** |                                                         | Payer Statement Descriptor.                                                                                                                                                                                                                                                        |
| reference            | object  | **optional** | {<br>transaction: "txn_0001",<br>order: "ord_0001"<br>} | Transaction & order numbers of your reference.                                                                                                                                                                                                                                     |
| destinations         | object  | **optional** |                                                         | It's used to transfer funds from one business to another with in tap. add the following block in charge or authorize object with the destination details: <br><br> **destinations: { <br>destination: [<br>{ <br>id: "0000000", <br> amount: 00, <br>currency: "KWD",<br>}, <br>],<br>}** |
| metadata             | string  | **optional** |                                                         | Set of key/value pairs that you can attach to an object. It can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to metadata. |
| receipt              | object  | **optional** | {<br>email: false,<br>sms: true<br>}                    | Whether receipt email or sms to be send to the payer or not                                                                                                                                                                                                                        |
| redirect             | string  | **required** |                                                         | After payment completed, payer will be redirected to this url (KNET and 3D secure charge request required, Redirect url)                                                                                                                                                           |
| post                 | string  | **required** |                                                         | After payment completed, goSell Gateway will post the charge response to the this url                                                                                                                                                                                              |

3. save_card:
   Save credit/debit cards in goSell gateway. There's not configurations for this mode.

4. token:
   Used to generate card token. There's not configurations for this mode.

#### goSell Show Result Configurations

- callback **[Function]**:

It's optional field in `goSell.showResult()` which define an action or a callback after showing the transaction result in redirect page. It will return the transaction result in a JSON.

#### goSell Examples

- **Vanilla Javascript Example**:

Example with transaction mode 'charge':

```
<html>
<head>
    <title>goSell Demo</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <link rel="shortcut icon" href="https://goSellJSLib.b-cdn.net/v2.0.0/imgs/tap-favicon.ico" />
    <link href="https://goSellJSLib.b-cdn.net/v2.0.0/css/gosell.css" rel="stylesheet" />
</head>
<body>
    <script type="text/javascript" src="https://goSellJSLib.b-cdn.net/v2.0.0/js/gosell.js"></script>

    <div id="root"></div>
    <button id="openLightBox" onclick="goSell.openLightBox()">open goSell LightBox</button>
    <button id="openPage" onclick="goSell.openPaymentPage()">open goSell Page</button>

    <script>

    goSell.config({
      containerID:"root",
      gateway:{
        publicKey:"pk_test_Vlk842B1EA7tDN5QbrfGjYzh",
        language:"en",
        contactInfo:true,
        supportedCurrencies:"all",
        supportedPaymentMethods: "all",
        saveCardOption:false,
        customerCards: true,
        notifications:'standard',
        callback:(response) => {
            console.log('response', response);
        },
        onClose: () => {
            console.log("onClose Event");
        },
        backgroundImg: {
          url: 'imgURL',
          opacity: '0.5'
        },
        labels:{
            cardNumber:"Card Number",
            expirationDate:"MM/YY",
            cvv:"CVV",
            cardHolder:"Name on Card",
            actionButton:"Pay"
        },
        style: {
            base: {
              color: '#535353',
              lineHeight: '18px',
              fontFamily: 'sans-serif',
              fontSmoothing: 'antialiased',
              fontSize: '16px',
              '::placeholder': {
                color: 'rgba(0, 0, 0, 0.26)',
                fontSize:'15px'
              }
            },
            invalid: {
              color: 'red',
              iconColor: '#fa755a '
            }
        }
      },
      customer:{
        id:"cus_m1QB0320181401l1LD1812485",
        first_name: "First Name",
        middle_name: "Middle Name",
        last_name: "Last Name",
        email: "demo@email.com",
        phone: {
            country_code: "965",
            number: "99999999"
        }
      },
      order:{
        amount: 100,
        currency:"KWD",
        items:[{
          id:1,
          name:'item1',
          description: 'item1 desc',
          quantity:'x1',
          amount_per_unit:'KD00.000',
          discount: {
            type: 'P',
            value: '10%'
          },
          total_amount: 'KD000.000'
        },
        {
          id:2,
          name:'item2',
          description: 'item2 desc',
          quantity:'x2',
          amount_per_unit:'KD00.000',
          discount: {
            type: 'P',
            value: '10%'
          },
          total_amount: 'KD000.000'
        },
        {
          id:3,
          name:'item3',
          description: 'item3 desc',
          quantity:'x1',
          amount_per_unit:'KD00.000',
          discount: {
            type: 'P',
            value: '10%'
          },
          total_amount: 'KD000.000'
        }],
        shipping:null,
        taxes: null
      },
     transaction:{
       mode: 'charge',
       charge:{
          saveCard: false,
          threeDSecure: true,
          description: "Test Description",
          statement_descriptor: "Sample",
          reference:{
            transaction: "txn_0001",
            order: "ord_0001"
          },
          metadata:{},
          receipt:{
            email: false,
            sms: true
          },
          redirect: "http://localhost/redirect.html",
          post: null,
        }
     }
    });

    </script>

</body>
</html>

```

Redirect page defined in charge configurations `redirect.html`:

```
<html>
  <head>
    <title>Show Result Demo</title>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />

    <link
      rel="shortcut icon"
      href="https://goSellJSLib.b-cdn.net/v2.0.0/imgs/tap-favicon.ico"
    />
    <link
      href="https://goSellJSLib.b-cdn.net/v2.0.0/css/gosell.css"
      rel="stylesheet"
    />
  </head>
  <body>

    <script
      type="text/javascript"
      src="https://goSellJSLib.b-cdn.net/v2.0.0/js/gosell.js"
    ></script>

    <div id="root"></div>
    <script>
       goSell.showResult({
           callback: response => {
           console.log("callback", response);
         }
      });
    </script>
  </body>
</html>
```

- **React JS Example**:

```
import React, { Component }  from "react";
import { GoSell } from "@tap-payments/gosell";

class GoSellDemo extends Component {

  constructor(props){
    super(props);
  }

  callbackFunc(response){
    console.log(response);
  }

  render() {

    return (
      <div className="App">

      <button onClick={() => GoSell.openLightBox()}>open goSell LightBox</button>
      <button onClick={() => GoSell.openPaymentPage()}>open goSell Page</button>

        <GoSell
           gateway={{
             publicKey:"pk_test_Vlk842B1EA7tDN5QbrfGjYzh",
             language:"en",
             contactInfo:true,
             supportedCurrencies:"all",
             supportedPaymentMethods:"all",
             saveCardOption:true,
             customerCards: true,
             notifications:'standard',
             backgroundImg: {
              url: 'imgURL',
              opacity: '0.5'
            },
             callback: this.callbackFunc,
             labels:{
                 cardNumber:"Card Number",
                 expirationDate:"MM/YY",
                 cvv:"CVV",
                 cardHolder:"Name on Card",
                 actionButton:"Pay"
             },
             style: {
                 base: {
                   color: '#535353',
                   lineHeight: '18px',
                   fontFamily: 'sans-serif',
                   fontSmoothing: 'antialiased',
                   fontSize: '16px',
                   '::placeholder': {
                     color: 'rgba(0, 0, 0, 0.26)',
                     fontSize:'15px'
                   }
                 },
                 invalid: {
                   color: 'red',
                   iconColor: '#fa755a '
                 }
             }
           }}
           customer={{
             first_name: "First Name",
             middle_name: "Middle Name",
             last_name: "Last Name",
             email: "demo@email.com",
             phone: {
                 country_code: "965",
                 number: "99999999"
             }
           }}
           order={{
             amount: 100,
             currency:"KWD",
             items:[{
               id:1,
               name:'item1',
               description: 'item1 desc',
               quantity:'x1',
               amount_per_unit:'KD00.000',
               discount: {
                 type: 'P',
                 value: '10%'
               },
               total_amount: 'KD000.000'
             },
             {
               id:2,
               name:'item2',
               description: 'item2 desc',
               quantity:'x2',
               amount_per_unit:'KD00.000',
               discount: {
                 type: 'P',
                 value: '10%'
               },
               total_amount: 'KD000.000'
             },
             {
               id:3,
               name:'item3',
               description: 'item3 desc',
               quantity:'x1',
               amount_per_unit:'KD00.000',
               discount: {
                 type: 'P',
                 value: '10%'
               },
               total_amount: 'KD000.000'
             }],
             shipping:null,
             taxes: null
           }}
           transaction={
             mode: 'charge',
             charge:{
              saveCard: false,
              threeDSecure: true,
              description: "Test Description",
              statement_descriptor: "Sample",
              reference:{
                transaction: "txn_0001",
                order: "ord_0001"
              },
              metadata:{},
              receipt:{
                email: false,
                sms: true
              },
              redirect: "REDIRECT_URL",
              post: null,
            }}
           />
      </div>
    );
  }
}

export default GoSellDemo;

```

Redirect page defined in charge configurations `redirect.js`:

```
import React, { Component } from "react";
import { GoSell } from "@tap-payments/gosell";

class Redirect extends Component {
  componentDidMount() {
    GoSell.showResult({
      callback: (response) => {
        console.log("callback", response);
      },
    });
  }

  render() {
    return (
      <div className="App">
        <GoSell />
      </div>
    );
  }
}

export default Redirect;

```

OR

```
import React, { Component }  from "react";
import { GoSell } from "@tap-payments/gosell";

class Redirect extends Component {

 render() {
    return (
      <div className="App">
        <GoSell
          gateway={{
            callback: (response) => {
              console.log("callback", response);
            },
          }}
        />
      </div>
    );
  }
}

export default Redirect;

```

## goSellElements

#### goSellElements Installation

You can integrate with goSellElements by:

- JavaScript Library, which allows front end developers to setup the payment gateway on their stores easily by adding a very basic snippet of JavaScript using the following script tag:

```
<script type="text/javascript" src="https://goSellJSLib.b-cdn.net/v2.0.0/js/gosell.js"></script>
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

#### goSellElements Usage

The **JavaScript Library** allows you to use any HTML element or JavaScript event to add goSell elements to your page. You will just need basic JavaScript skills to integrate with goSell.

When your page loads, you should call the configurations of your payment gateway by creating a handler object using `goSell.goSellElements()`. You can call `goSell.submit()` to submit the form and create a card token on click event.

> for react component, submit the form by `GoSellElements.submit()` with rendering `<GoSellElements />` component with the required configurations.

#### goSellElements General Configurations

- gateway **[Object]\***:
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

2. token **[boolean]\***:
   Used to generate card token.

#### goSellElements Examples

- **Vanilla Javascript Example**:

```
<html>
   <head>
      <title>goSell Elements Demo</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      <link rel="shortcut icon" href="https://goSellJSLib.b-cdn.net/v2.0.0/imgs/tap-favicon.ico" />
      <link href="https://goSellJSLib.b-cdn.net/v2.0.0/css/gosell.css" rel="stylesheet" />
   </head>
   <body>
      <script type="text/javascript" src="https://goSellJSLib.b-cdn.net/v2.0.0/js/gosell.js"></script>
      <div id="root"></div>
      <p id="msg"></p>
      <button id="submit-elements" onclick="goSell.submit()">Submit</button>
      <script>
         goSell.goSellElements({
           containerID:"root",
           gateway:{
             publicKey:"pk_test_Vlk842B1EA7tDN5QbrfGjYzh",
             language:"en",
             supportedCurrencies: "all",
             supportedPaymentMethods: "all",
             notifications:'msg',
             labels:{
                 cardNumber:"Card Number",
                 expirationDate:"MM/YY",
                 cvv:"CVV",
                 cardHolder:"Name on Card",
                 actionButton:"Pay"
             },
             style: {
                 base: {
                   color: '#535353',
                   lineHeight: '18px',
                   fontFamily: 'sans-serif',
                   fontSmoothing: 'antialiased',
                   fontSize: '16px',
                   '::placeholder': {
                     color: 'rgba(0, 0, 0, 0.26)',
                     fontSize:'15px'
                   }
                 },
                 invalid: {
                   color: 'red',
                   iconColor: '#fa755a '
                 }
             }
           }
         });

      </script>
   </body>
</html>

```

- **React JS Example**:

```
import React, { Component }  from "react";
import { GoSellElements } from "@tap-payments/gosell";

class GoSellElementsDemo extends Component {

  constructor(props){
    super(props);
  }

  callbackFunc(response){
    console.log(response);
  }

  render() {

    return (
      <div className="App">

        <GoSellElements
           gateway={{
             publicKey:"pk_test_Vlk842B1EA7tDN5QbrfGjYzh",
             language:"en",
             supportedCurrencies: "all",
             supportedPaymentMethods: "all",
             notifications:'msg',
             callback: this.callbackFunc,
             labels:{
                 cardNumber:"Card Number",
                 expirationDate:"MM/YY",
                 cvv:"CVV",
                 cardHolder:"Name on Card",
                 actionButton:"Pay"
             },
             style: {
                 base: {
                   color: '#535353',
                   lineHeight: '18px',
                   fontFamily: 'sans-serif',
                   fontSmoothing: 'antialiased',
                   fontSize: '16px',
                   '::placeholder': {
                     color: 'rgba(0, 0, 0, 0.26)',
                     fontSize:'15px'
                   }
                 },
                 invalid: {
                   color: 'red',
                   iconColor: '#fa755a '
                 }
             }
           }}
            />

           <p id="msg"></p>

           <button onClick={() => GoSellElements.submit()}>Submit</button>
      </div>
    );
  }
}

export default GoSellElementsDemo;

```

## Author

- [Hala Q.](https://www.npmjs.com/~hala.q)
