import React, { Component } from "react";
import "./MainImg.css";

export default class MainImg extends Component {
  render() {
    return (
      <div>
        <img
          src={this.props.data[this.props.dataIndex]}
          alt="Products"
          className="main-img__img"
        />
      </div>
    );
  }
}
