import "./Cart.css";
import Modal from "../UI/Modal/Modal";
import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "../Cart/Checkout";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartctx = useContext(CartContext);
  let totalAmount = `₹${cartctx.totalAmount.toFixed(2)}`;
  const AddItemHandler = (item) => {
    cartctx.addItem({ ...item, amount: 1 });
  };
  const RemoveItemHandler = (id) => {
    cartctx.removeItem({ id: id });
  };
  const orderHandler = () => {
    setIsCheckout(true);
  };
  const ConfirmHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch("https://ghost-37ddc-default-rtdb.firebaseio.com/orders.json", {
      method: "POST",
      body: JSON.stringify({ user: userData, Ordereditems: cartctx.items }),
      headers: { "Content-Type": "application/json" },
    });
    setIsCheckout(false);
    setIsSubmitting(false);
    setDidSubmit(true);
    cartctx.resetCart();
  };

  let cartItems = (
    <ul className="cart-items">
      {cartctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onAdd={AddItemHandler.bind(null, item)}
          onRemove={RemoveItemHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className="actions">
      <button onClick={props.closeCart}>Close</button>
      {cartctx.items.length > 0 && (
        <button className="order" onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );
  const CartContent = (
    <React.Fragment>
      {cartItems}
      <div className="total">
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!isCheckout && modalActions}
    </React.Fragment>
  );
  const CheckOut = (
    <Checkout onConfirm={ConfirmHandler} onCancel={props.closeCart} />
  );
  const SubmittingContent = <p>Receiving the Order</p>;
  const Submitted = (
    <div className="actions">
      <h2 style={{ "text-align": "center" }}>Order Received Successfully!</h2>
      <button className="close" onClick={props.closeCart}>
        Close
      </button>
    </div>
  );
  return (
    <Modal closeCart={props.closeCart}>
      {!isSubmitting && !didSubmit && !isCheckout && CartContent}
      {isCheckout && CheckOut}
      {isSubmitting && !didSubmit && !isCheckout && SubmittingContent}
      {didSubmit && !isCheckout && Submitted}
    </Modal>
  );
};
export default Cart;
