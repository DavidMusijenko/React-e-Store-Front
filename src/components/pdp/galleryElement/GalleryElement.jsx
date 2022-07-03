import React, { Component } from "react";
import "./GalleryElement.css";
import MainImg from "./mainImg/MainImg";

export default class GalleryElement extends Component {
  constructor(props) {
    super(props);
    this.state = { imgIndex: 0 };
  }
  render() {
    return (
      <div className="gallery-element__both-container">
        <div className="gallery-element__small-img-container">
          {this.props.gallery.map((item) => {
            return (
              <img
                key={this.props.gallery.indexOf(item)}
                src={item}
                alt="Product"
                className="gallery-element__small-img"
                onClick={() =>
                  this.setState({ imgIndex: this.props.gallery.indexOf(item) })
                }
              />
            );
          })}
        </div>
        <div>
          <MainImg data={this.props.gallery} dataIndex={this.state.imgIndex} />
        </div>
      </div>
    );
  }
}
