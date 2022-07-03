import React, { Component } from "react";
import "./FX.css";
import { ReactComponent as FXlogo } from "./FX.svg";

import { connect } from "react-redux";
import { setCurrency } from "../../../../redux/shopping/cart-actions";

export class FX extends Component {
  constructor(props) {
    super(props);
    this.wrapperRefFX = React.createRef();
    this.notThisRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.props.open && !this.notThisRef.current.contains(event.target)) {
      if (
        this.wrapperRefFX &&
        !this.wrapperRefFX.current.contains(event.target)
      ) {
        this.props.onClick(false);
      }
    }
  }

  handleCurrencyChange(el) {
    this.props.setCurrency(el);
    this.props.onClick(false);
  }

  render() {
    if (this.props.currentCurrency.length !== 0) {
      return (
        <div className="FX__dropdown">
          <div
            className="FX__dropdown-container"
            ref={this.notThisRef}
            onClick={
              this.props.open
                ? () => this.props.onClick(false)
                : () => this.props.onClick(true)
            }
          >
            {this.props.currentCurrency.symbol}
            <div className="FX__vector">
              <FXlogo />
            </div>
          </div>
          {this.props.open && (
            <div ref={this.wrapperRefFX} className="FX__dropdown-content">
              {this.props.currencies.map((el) => {
                return (
                  <button
                    key={el.label}
                    className="FX__dropdown-text"
                    onClick={() => this.handleCurrencyChange(el)}
                  >
                    {el.symbol} {el.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    currentCurrency: state.shop.currentCurrency,
    currencies: state.shop.currencies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (currency) => dispatch(setCurrency(currency)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FX);
