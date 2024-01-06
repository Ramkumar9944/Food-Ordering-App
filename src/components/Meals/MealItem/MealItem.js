import { useContext } from "react";
import CartContext from "../../../store/cart-context";
import "./MealItem.css";
import MealItemForm from "./MealItemForm";
const MealItem = (props) => {
  const price = `₹${props.price.toFixed(2)}`;
  const images = `${props.image}`;
  const cartctx = useContext(CartContext);
  const addtoCartHandler = (amount) => {
    cartctx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    });
  };
  return (
    <li className="meal">
      <img src={images} alt="" />
      <div className="content">
        <h3>{props.name}</h3>
        <div className="description">{props.description}</div>
        <div className="price">{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addtoCartHandler} />
      </div>
    </li>
  );
};
export default MealItem;
