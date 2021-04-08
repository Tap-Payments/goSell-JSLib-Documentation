function save() {
  const button = document.getElementById("checkoutBtn");
  button.disabled = true;
  goSell.config({
    gateway: {
      publicKey: "pk_test_Vlk842B1EA7tDN5QbrfGjYzh",
      merchant_id: "1124340",
      merchant_id: null,
      language: "en",
      contactInfo: false,
      supportedCurrencies: "all",
      supportedPaymentMethods: "all",
      saveCardOption: true,
      customerCards: true,
      notifications: "standard",
      callback: (response) => {
        console.log("callback", response);
      },
      onClose: () => {
        console.log("onclose hey");
      },
      onLoad: () => {
        console.log("onLoad");
        goSell.openLightBox();
      },
      style: {
        base: {
          color: "red",
          lineHeight: "10px",
          fontFamily: "sans-serif",
          fontSmoothing: "antialiased",
          fontSize: "10px",
          "::placeholder": {
            color: "rgba(0, 0, 0, 0.26)",
            fontSize: "10px",
          },
        },
        invalid: {
          color: "red",
          iconColor: "#fa755a ",
        },
      },
    },
    customer: {
      first_name: "hala",
      middle_name: "",
      last_name: "",
      email: "test@test.com",
      phone: {
        country_code: "+965",
        number: "00000000",
      },
    },
    order: {
      amount: document.getElementById("amount").value,
      currency: "KWD",
      items: [
        {
          id: 0,
          name: "Item ",
          description: "Item Desc 0",
          old_quantity: 1,
          quantity: 1,
          amount_per_unit: 0,
          old_total_amount: 0,
          total_amount: 10,
        },
      ],
    },
    transaction: {
      mode: "charge",
      charge: {
        auto: {
          time: 100,
          type: "VOID",
        },
        saveCard: false,
        threeDSecure: true,
        description: "description",
        statement_descriptor: "statement_descriptor",
        reference: {
          transaction: "txn_0001",
          order: "ord_0001",
        },
        metadata: {},
        receipt: {
          email: false,
          sms: true,
        },
        redirect: "http://localhost/redirect.html",
        post: null,
      },
    },
  });
}
