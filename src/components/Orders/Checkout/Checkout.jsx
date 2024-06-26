import React, { Component } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import Spinner from "../../Spinner/Spinner";

import axios from "axios";

import { connect } from "react-redux";
import { resetIngredients } from "../../../redux/actionCreators";

import { Formik } from "formik";
import { Navigate } from "react-router-dom";

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice,
    purchasable: state.purchasable,
    userId: state.userId,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetIngredients: () => dispatch(resetIngredients()),
  };
};

class Checkout extends Component {
  state = {
    isLoading: false,
    isModalOpen: false,
    modalMsg: "",
    goBack: false,
  };

  handleGoBack = () => {
    this.setState({
      goBack: true,
    });
  };

  submitHandler = (values) => {
    const url = "http://127.0.0.1:8000/api/order/";
    this.setState({ isLoading: true });
    const ingredients = [...this.props.ingredients];
    const ingredientsObject = {}
    for (let i of ingredients){
      ingredientsObject[i.type]= i.amount;
    }
    const order = {
      ingredients: ingredientsObject,
      customer: values,
      price: this.props.totalPrice,
      orderTime: new Date(),
      user: this.props.userId,
    };
    axios
      .post(url, order)
      .then((response) => {
        if (response.status === 201) {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Order Placed Successfully!",
          });
          this.props.resetIngredients();
        } else {
          this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: "Something Went Wrong! Order Again!",
          });
        }
      })
      .catch((err) => {
        this.setState({
          isLoading: false,
          isModalOpen: true,
          modalMsg: "Something Went Wrong! Order Again!",
        });
      });
  };

  render() {
    let form = (
      <div>
        <h4
          style={{
            border: "1px solid grey",
            boxShadow: "1px 1px #888888",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          Payment: {this.props.totalPrice} BDT
        </h4>
        <Formik
          initialValues={{
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.deliveryAddress) {
              errors.deliveryAddress = "Delivery Address should not null";
            }
            if (!values.phone) {
              errors.phone = "Phone number should not null";
            } else if (/^\d{10}$/.test(values.phone)) {
              errors.phone = "Phone number should be number value";
            }

            return errors;
          }}
          onSubmit={(values) => {
            this.submitHandler(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            /* and other goodies */
          }) => (
            <form
              style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
              }}
              onSubmit={handleSubmit}
            >
              <textarea
                name="deliveryAddress"
                id="deliveryAddress"
                value={values.deliveryAddress}
                className="form-control"
                placeholder="Your Address"
                onBlur={handleBlur}
                onChange={handleChange}
              ></textarea>
              <span>
                {errors.deliveryAddress &&
                  touched.deliveryAddress &&
                  errors.deliveryAddress}
              </span>
              <br />
              <input
                name="phone"
                id="phone"
                className="form-control"
                value={values.phone}
                placeholder="Your Phone Number"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.phone && touched.phone && errors.phone}
              <br />
              <select
                name="paymentType"
                id="paymentType"
                className="form-control"
                value={values.paymentType}
                onBlur={handleBlur}
                onChange={handleChange}
              >
                <option value="Cash On Delivery">Cash On Delivery</option>
                <option value="Bkash">Bkash</option>
              </select>
              <br />
              <Button
                type="submit"
                style={{ backgroundColor: "#D70F64" }}
                className="mr-auto"
                disabled={!this.props.purchasable}
              >
                Place Order
              </Button>
              <Button color="secondary" className="ms-1" onClick={this.goBack}>
                Cancel
              </Button>
            </form>
          )}
        </Formik>
      </div>
    );
    return (
      <div>
        {this.state.isLoading ? <Spinner /> : form}
        <Modal isOpen={this.state.isModalOpen} onClick={this.handleGoBack}>
          <ModalBody>
            <p>{this.state.modalMsg}</p>
          </ModalBody>
        </Modal>
        {this.state.goBack && <Navigate to="/" replace={true} />}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
