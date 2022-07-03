import React, { Component } from "react";
import { connect } from "react-redux";
import MiniCartListing from "./miniCartComp/miniCartListing/MiniCartListing";
import MiniCartTotal from "./miniCartComp/miniCartTotal/MiniCartTotal";
import { setOverlay } from "../../../../../redux/shopping/cart-actions";
import "./Modal.css";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (
      this.props.overlayState === 1 &&
      !this.props.notThisRefTwo.current.contains(event.target)
    ) {
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.props.setOverlay(0);
      }
    }
  }

  render() {
    const cart = this.props.cart.reduce(
      (acc = {}, item = {}) => {
        acc.qty = parseFloat(acc.qty + item.qty);

        return acc;
      },
      {
        qty: 0,
      }
    );

    if (this.props.overlayState === 0) {
      return null;
    } else if (this.props.cart.length === 0) {
      return (
        <div>
          {/* if cart empty  */}
          <div ref={this.wrapperRef} className="modal__container">
            <div className="modal__top-text">
              <h4>My Bag</h4>
            </div>
            <div className="modal__empty-bag">
              <h3>Your bag is empty ¯\_(ツ)_/¯</h3>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div ref={this.wrapperRef} className="modal__container">
            <div className="modal__flex-container">
              <div className="modal__top-text">
                <h4>My Bag:</h4>
              </div>
              {cart.qty === 1 ? (
                <div className="modal__text">{cart.qty} item</div>
              ) : (
                <div className="modal__text">{cart.qty} items</div>
              )}
            </div>
            <div>
              <div>
                {this.props.cart.map((item) => {
                  return <MiniCartListing key={item.idUnique} product={item} />;
                })}
              </div>
              <div>
                <MiniCartTotal onClick={() => this.props.setOverlay(0)} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    overlayState: state.shop.overlayState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setOverlay: (value) => dispatch(setOverlay(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
