import "./MealItemForm.css";
import Input from "../../UI/Input/Input";
import { useRef, useState } from "react";
const MealItemForm = (props) => {
  const cartAmount = useRef();
  const [error, setError] = useState("");
  const [validAmount, setValidAmount] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = cartAmount.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setValidAmount(false);
      setError("Please provide value between 1 and 5");
      return;
    }
    setValidAmount(true);
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form onSubmit={submitHandler} className="form">
      <Input
        className="input"
        ref={cartAmount}
        label="Amount"
        input={{
          id: props.id,
          type: "number",
          step: "1",
          defaultValue: "0",
        }}
      />
      <button>+ Add</button>
      {!validAmount && (
        <p style={{ color: "red", width: "10rem", textAlign: "center" }}>
          {error}
        </p>
      )}
    </form>
  );
};
export default MealItemForm;
