import React, { Component } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { ReactComponent as GreenLogo } from "./GreenLogo.svg";
import MiniCart from "./miniCart/MiniCart";
import FX from "./FX/FX";
import { connect } from "react-redux";
import {
  setActiveCategory,
  setOverlay,
} from "../../../redux/shopping/cart-actions";
import Modal from "./miniCart/modal/Modal";

export class NavBar extends Component {
  constructor(props) {
    super(props);
    this.notThisRefTwo = React.createRef();
    this.state = { isOpenFX: false };
    this.setState = this.setState.bind(this);
    this.handleClickFX = this.handleClickFX.bind(this);
  }

  handleClick() {
    this.setState({ isOpen: false });
  }

  handleClickFX(value) {
    this.setState({ isOpenFX: value });
  }

  render() {
    const categoriesArray = Object.entries(this.props.categories);

    return (
      <nav className="navbar__nav">
        <div className="navbar__left-side">
          {categoriesArray.map((el) => {
            return (
              <Link to={`/${el[1].name}`} key={`/${el[1].name}`}>
                <div
                  key={el}
                  onClick={() => this.props.setActiveCategory(`${el[1].name}`)}
                  className={
                    this.props.activeCategory === `${el[1].name}`
                      ? "navbar--active"
                      : "navbar--nonActive"
                  }
                >
                  {el[1].name}
                </div>
              </Link>
            );
          })}
        </div>
        <div className="navbar__green-logo">
          <GreenLogo />
        </div>
        <div className="navbar__right-side">
          <div className="navbar__FX-logo">
            <FX onClick={this.handleClickFX} open={this.state.isOpenFX} />
          </div>
          <div ref={this.notThisRefTwo}>
            <div
              onClick={
                this.props.overlayState === 0
                  ? () => this.props.setOverlay(1)
                  : () => this.props.setOverlay(0)
              }
            >
              <MiniCart />
            </div>
            <div>
              <Modal
                onClick={this.handleClick}
                notThisRefTwo={this.notThisRefTwo}
                open={this.state.isOpen}
              />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activeCategory: state.shop.activeCategory,
    categories: state.shop.categories,
    overlayState: state.shop.overlayState,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveCategory: (category) => dispatch(setActiveCategory(category)),
    setOverlay: (value) => dispatch(setOverlay(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
