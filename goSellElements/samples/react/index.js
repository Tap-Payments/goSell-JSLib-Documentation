import React, { Component } from "react";
import { GoSellElements } from "@tap-payments/gosell";

class GoSellElementsDemo extends Component {
  constructor(props) {
    super(props);
  }

  callbackFunc(response) {
    console.log(response);
  }

  render() {
    return (
      <div className="App">
        <GoSellElements
          gateway={{
            publicKey: "pk_test_Vlk842B1EA7tDN5QbrfGjYzh",
            language: "en",
            supportedCurrencies: "all",
            supportedPaymentMethods: "all",
            notifications: "msg",
            callback: this.callbackFunc,
            labels: {
              cardNumber: "Card Number",
              expirationDate: "MM/YY",
              cvv: "CVV",
              cardHolder: "Name on Card",
              actionButton: "Pay",
            },
            style: {
              base: {
                color: "#535353",
                lineHeight: "18px",
                fontFamily: "sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                  color: "rgba(0, 0, 0, 0.26)",
                  fontSize: "15px",
                },
              },
              invalid: {
                color: "red",
                iconColor: "#fa755a ",
              },
            },
          }}
        />

        <p id="msg"></p>

        <button onClick={() => GoSellElements.submit()}>Submit</button>
      </div>
    );
  }
}

export default GoSellElementsDemo;
