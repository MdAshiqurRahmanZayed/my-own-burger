import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Controls from "./Controls/Controls";
import Summary from "./Summary/Summary";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

import { connect } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  updatePurchasable,
} from "../../redux/actionCreators";
import { Navigate } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (igtype) => dispatch(addIngredient(igtype)),
    removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
    updatePurchasable: () => dispatch(updatePurchasable()),
  };
};

class BurgerBuilder extends Component {
  state = {
    modalOpen: false,
  };

  addIngredientHandle = (type) => {
    this.props.addIngredient(type);
    this.props.updatePurchasable();
  };

  removeIngredientHandle = (type) => {
    this.props.removeIngredient(type);
    this.props.updatePurchasable();
  };

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
    });
  };

  handleCheckout = () => {
    this.setState({
      onClickedCheckout: true,
    });
  };
  render() {
    return (
      <>
        <div className="d-flex flex-md-row flex-column">
          <Burger ingredients={this.props.ingredients} />
          <Controls
            ingredientAdded={this.addIngredientHandle}
            ingredientRemoved={this.removeIngredientHandle}
            price={this.props.totalPrice}
            toggleModal={this.toggleModal}
            purchasable={this.props.purchasable}
          />
        </div>
        <Modal isOpen={this.state.modalOpen}>
          <ModalHeader>Your order summary</ModalHeader>
          <ModalBody>
            <h5>
              Total Price: <b>{this.props.totalPrice.toFixed(0)}</b> BDT
              <Summary ingredients={this.props.ingredients} />
            </h5>
          </ModalBody>
          <ModalFooter>
            <Button style={{backgroundColor:"#D70F64"}} onClick={this.handleCheckout}>
              Continue to checkout
            </Button>
            <Button color="danger" onClick={this.toggleModal}>
              cancel
            </Button>
          </ModalFooter>
          {this.state.onClickedCheckout && (
            <Navigate to="/checkout" replace={true} />
          )}
        </Modal>
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
