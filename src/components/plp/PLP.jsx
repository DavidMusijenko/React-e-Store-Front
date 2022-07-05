import React, { Component } from "react";
import "./PLP.css";
import PL from "./pl/PL";

export default class PLP extends Component {
  data = Array.from(this.props.products);

  render() {
    return (
      <div className="PLP">
        {this.data.map((prod) => {
          return <PL key={prod.id} product={prod} />;
        })}
      </div>
    );
  }
}
