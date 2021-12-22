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
