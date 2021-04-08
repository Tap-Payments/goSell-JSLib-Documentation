
## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [General Configurations](#general-configurations)
- [Transaction Modes](#transaction-modes)
- [Samples](#samples)

## Installation

You can integrate with goSell by:

- JavaScript Library, which allows front end developers to setup the payment gateway on their stores easily by adding a very basic snippet of JavaScript using the following script tag:

```
<script type="text/javascript" src="https://goSellJSLib.b-cdn.net/v1.6.1/js/gosell.js"></script>
```
** Take care, the configurations structure has been changed in this version **
>  Use the JavaScript Library in server side environment, otherwise the credit card section will not work.


- Install goSell React Component on NPM for who uses React JS. by running the following command in the terminal:

```
npm i @tap-payments/gosell
```

import the library inside your code:

```
import { GoSell } from "@tap-payments/gosell";
```

>  For react package, there's peer dependencies that you have to download it in your project like `react`, `mobx` and `mobx-react`, when you download mobx and mobx-react, please make sure you're using the following versions: 

```
"mobx": "^4.11.0",
"mobx-react": "^5.4.4"
```

## Usage

The **JavaScript Library** allows you to use any HTML element or JavaScript event to trigger Checkout. You will just need basic JavaScript skills to integrate with goSell.

**When your page loads**, you should define the configurations of your payment gateway by creating a handler object using `goSell.config()`. You can then call `goSell.openLightBox()` or `goSell.openPaymentPage()` on click event, to show the transaction result in your redirect page, call `goSell.showResult()`.

<!-- > for react component, open light box by `GoSell.openLightBox()` and the page by `GoSell.openPaymentPage()` with rendering `<GoSell />` component with the required configurations.  -->

## General Configurations

#### gateway **[Object]***:
It's a required field for the JS library. It includes the general settings of the payment gateway:

| property name | Type  | Status  | Default value	 | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| publicKey | string  | **required**  |  | Your goSell public key. |
| merchantId | string  | **optional**  |  | Your ID. |
| language | string  | **optional**  | 'en' | Define the language of payment gateway. The supported languages are 'en' & 'ar'. |
| contactInfo | boolean  | **optional**  |  true | Show the contact info (phone numbers, social media links .. etc) of the merchant in goSell gateway. |
| supportedCurrencies | string or array of currencies using ISO code  | **optional**  | 'all' | there's 3 different values for this property:<br><br>  1.'all': which will display  all goSell supported currencies.<br><br> 2.'gcc': the currencies of Gulf Cooperation Council. <br><br> 3. Array of strings: specify a custom list of the following supported currencies by goSell: <br> ["KWD", "BHD", "SAR", "AED", "OMR", "QAR", "EGP", "GBP", "USD", "EUR"] |
| supportedPaymentMethods | string or array of required payment methods  | **optional**  | 'all' | there's 2 different values for this property:<br><br>  1.'all': shows all activated payment methods in your account.<br><br> 2. Array of strings: specify a custom list of your activated payment methods in your account.Available supported payment options in tap: [ "KNET", "AMERICAN_EXPRESS", "BENEFIT", "MADA","VISA","MASTERCARD", "FAWRY", "OMANNET","APPLE_PAY", "TABBY_INSTALLEMENT", "TABBY_PAY_LATER"] |
| saveCardOption | boolean  | **optional**  | true | Enable or disable the saving card option on the credit/debit cards section in goSell payment gateway, if saving cards feature is enabled in your goSell account. |
| customerCards | boolean  | **optional**  | true | Allow/Disallow your customers to pay by their saved cards on goSell Gateway. If you enabled this property, your customers will able to see their saved cards and use them security. |
| notifications | string  | **optional**  | 'standard' | Define your preferences, if you like to use your own component or HTML element to show notifications or use goSell standard notifications bar. |
| backgroundImg | object  | **optional**  |  | Define a background image for the goSell JS library page. |
| callback | function  | **optional**  |  | Define an action or a callback after each transaction. When the payment process is being executed, the library will return the transaction result JSON to the callback function.    |
| onClose | function  | **optional**  |  | Define an action or piece of code to be executed on the close event. |
| onLoad | function  | **optional**  |  | Use this with the `popup` mode only, define an action or piece of code to be executed when the page ready to load on the screen. for example, add this function to call `goSell.openLightBox()`, if you used `goSell.config()` on action event.  |
| onClose | function  | **optional**  |  | Define an action or piece of code to be executed on the close event. |
| labels | object  | **optional**  | {<br>cardNumber:"Card Number",<br>expirationDate:"MM/YY",<br>cvv:"CVV",<br>cardHolder:"Name on Card",<br>actionButton:"Pay"<br>} | Define custom titles for input boxes inside credit/debit cards section. |
| style | object  | **optional**  | {<br>base: {<br>color: '#535353',<br>lineHeight: '18px',<br>fontFamily: 'sans-serif',<br>fontSmoothing: 'antialiased',<br>fontSize: '16px',<br>'::placeholder': {<br>color: 'rgba(0, 0, 0, 0.26)',<br>fontSize:'15px'<br>}<br>},<br>invalid: {<br>color: 'red',<br>iconColor: '#fa755a '<br>}<br>} | Define custom style for input boxes inside credit/debit cards section. |


#### customer **[Object]***:
It's a required field for the JS library. Includes the customer details, it's required for *charge*, *authorize* & *saveCard* modes only.

| property name | Type  | Status  | Default value	 | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| id | string  | **required, if the customer details is not defined**  | null | The id of your customer in tap system  |
| first_name | string  | **required, if the customer id is not defined**  |  | The first name of your customer  |
| middle_name | string  | **optional**  |  | The middle name of your customer  |
| last_name | string  | **optional**  |  | The last name of your customer  |
| email | string  | **required, if the customer id is not defined**  |  | Customer's email address   |
| phone | object  | **required, if the customer id is not defined**  |  | Customer's phone number. <br>Example: <br>{<br>country_code: "965",<br>number: "99999999"<br>}   |


#### order **[Object]***:
It's a required field for the JS library. Includes the order details, it's required for *charge*, *authorize* modes only.

| property name | Type  | Status  | Default value	 | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| amount | string  | **required**  |  | The total amount of the order. |
| currency | string  | **required**  |  | The ISO currency code of the total amount. |
| items | string  | **optional**  | null | Items details. |
| shipping | string  | **optional**  | null | Shipping details. |
| taxes | object  | **optional**  | null | taxes detail. |


#### transaction **[object]**:
It's a required field for the JS library. Includes the transaction mode and it's configurations.

| property name | Type  | Status  | Default value	 | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| mode | string  | **required**  |  | It can be 'charge', 'authorize', 'save_card' or 'token' |
| charge | object  | **required if the mode = 'charge'**  |  | includes the merchant's configurations for charge mode |
| authorize | object  | **required if the mode = 'authorize'**  |  | includes the merchant's configurations for authorize mode |

## Transaction Modes

You have to **select one** of the following modes:


#### charge **[Object]**:

Enable charge mode in goSell payment gateway. The charge transactions will be created for a credit / debit cards. The object should includes the following settings:

| property name | Type  | Status  | Default value	 | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| saveCard | boolean  | **optional**  |  | Payer can save the credit for future purpose. Customer phone number is required to save the card, values can be one of (true or false). In order to use this service, please contact our Team to get the access. |
| threeDSecure | boolean  | **optional**  |  | The 3D Secure request status for a particular charge, values can be one of (true or false) |
| description | string  | **optional**  |  | Charge Description. |
| statement_descriptor | string  | **optional**  |  | Payer Statement Descriptor. |
| reference | object  | **optional**  | {<br>transaction: "txn_0001",<br>order: "ord_0001"<br>} | Transaction & order numbers of your reference. |
| destinations | object  | **optional**  |  | It's used to transfer funds from one business to another with in tap. add the following block in charge or authorize object with the destination details: <br><br> **destinations: { <br>destination: [<br>{ <br>id: "0000000", <br> amount: 00, <br>currency: "KWD",<br>}, <br>],<br>}**|
| metadata | string  | **optional**  |  | Set of key/value pairs that you can attach to an object. It can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to metadata. |
| receipt | object  | **optional**  | {<br>email: false,<br>sms: true<br>} | Whether receipt email or sms to be send to the payer or not |
| redirect | string  | **required**  |  | After payment completed, payer will be redirected to this url (KNET and 3D secure charge request required, Redirect url) |
| post | string  | **required**  |  | After payment completed, goSell Gateway will post the charge response to the this url |
| hashstring | string  | **required**  |  | A fixed-length string that match Tap [post url header](/post/README.md). |



#### authorize **[Object]**:

Enable authorize mode in goSell payment gateway. The object should includes the following settings:

| property name | Type  | Status  | Default value	 | Description |
| ------------- | ------------- | ------------- | ------------- | ------------- |
| auto | object | **required**  | {<br>type: "VOID",<br>time: 100<br>} | You can create CAPTURE or VOID  successful authorized transactions by goSell after a specified time period, You can use the auto object in the authorize request. Time should be defined in hours, Minimum 1 hour and Maximum 168 hours. |
| saveCard | boolean  | **optional**  |  | Payer can save the credit for future purpose. Customer phone number is required to save the card, values can be one of (true or false). In order to use this service, please contact our Team to get the access. |
| threeDSecure | boolean  | **optional**  |  | The 3D Secure request status for a particular charge, values can be one of (true or false) |
| description | string  | **optional**  |  | Charge Description. |
| statement_descriptor | string  | **optional**  |  | Payer Statement Descriptor. |
| reference | object  | **optional**  | {<br>transaction: "txn_0001",<br>order: "ord_0001"<br>} | Transaction & order numbers of your reference. |
| metadata | string  | **optional**  |  | Set of key/value pairs that you can attach to an object. It can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to metadata. |
| receipt | object  | **optional**  | {<br>email: false,<br>sms: true<br>} | Whether receipt email or sms to be send to the payer or not |
| redirect | string  | **required**  |  | After payment completed, payer will be redirected to this url (KNET and 3D secure charge request required, Redirect url) |
| post | string  | **required**  |  | After payment completed, goSell Gateway will post the charge response to the this url |
| hashstring | string  | **required**  |  | A fixed-length string that match Tap [post url header](/post/README.md). |

#### save_card:
Save credit/debit cards in goSell gateway. There's not configurations for this mode.

#### token:
Used to generate card token. There's not configurations for this mode.


## Show Result Configurations

#### callback **[Function]**:

It's optional field in `goSell.showResult()` which define an action or a callback after showing the transaction result in redirect page. It will return the transaction result in a JSON.


## Samples

#### Vanilla JS:

- [Sample 1 - Integration for popup and page modes](/samples/js/sample1)
- [Sample 2 - Integration with popup mode using onLoad](/samples/js/sample2)

#### React JS:

- [Sample 3 - Integration for popup and page modes](/samples/react/sample3)

## Author

* Hala Q. [GitHub](https://github.com/halaq)
* Hala Q.[NPM](https://www.npmjs.com/~hala.q)
