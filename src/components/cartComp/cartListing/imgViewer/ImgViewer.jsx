import React, { Component } from "react";
import "./ImgViewer.css";
import { ReactComponent as ArrowLeft } from "./ArrowLeft.svg";
import { ReactComponent as ArrowRight } from "./ArrowRight.svg";

export default class ImgViewer extends Component {
  constructor(props) {
    super(props);
    this.leftArrow = this.leftArrow.bind(this);
    this.rightArrow = this.rightArrow.bind(this);
    this.state = {
      currentImg: 0,
      lastImg: this.props.product.gallery.length - 1,
    };
  }

  leftArrow() {
    if (this.state.currentImg > 0) {
      this.setState((prevState, props) => ({
        currentImg: prevState.currentImg - 1,
      }));
    }
  }

  rightArrow() {
    if (this.state.currentImg < this.state.lastImg) {
      this.setState((prevState, props) => ({
        currentImg: prevState.currentImg + 1,
      }));
    }
  }

  render() {
    let currentImage = this.props.product.gallery[`${this.state.currentImg}`];
    if (this.props.product.gallery.length > 1) {
      return (
        <div>
          <div className="img-viewer__container">
            <div className="img-viewer__arrows">
              <div onClick={this.leftArrow}>
                <ArrowLeft />
              </div>
              <ArrowRight onClick={this.rightArrow} />
            </div>
          </div>
          <img
            src={currentImage}
            alt={this.props.product.name}
            className="image-viewer__image"
          />
        </div>
      );
    } else {
      return (
        <img
          src={currentImage}
          alt={this.props.product.name}
          className="image-viewer__image"
        />
      );
    }
  }
}
