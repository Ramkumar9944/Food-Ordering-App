import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import "./HeaderCartButton.css";

const HeaderCartButton = (props) => {
  const cartctx = useContext(CartContext);
  // const { items } = cartctx;
  const [btnhighlight, setbtnHighlight] = useState(false);
  let numberofItems = cartctx.items.reduce((cur, item) => {
    return cur + item.amount;
  }, 0);
  useEffect(() => {
    if (cartctx.items.length === 0) {
      return;
    }
    setbtnHighlight(true);
    const timer = setTimeout(() => {
      setbtnHighlight(false);
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [cartctx.items]);
  return (
    <button
      className={btnhighlight ? "button" : "button bump"}
      onClick={props.openCart}
    >
      <span className="icon">
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className="badge">{numberofItems}</span>
    </button>
  );
};

export default HeaderCartButton;
