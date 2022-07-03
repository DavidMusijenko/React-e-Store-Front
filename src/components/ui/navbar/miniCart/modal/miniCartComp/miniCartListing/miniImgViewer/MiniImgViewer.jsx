import React, { Component } from "react";
import "./MiniImgViewer.css";

export default class MiniImgViewer extends Component {
  render() {
    return (
      <div>
        <img
          src={this.props.product.gallery[0]}
          alt={this.props.product.name}
          className="mini-img-viewer__image"
        />
      </div>
    );
  }
}
