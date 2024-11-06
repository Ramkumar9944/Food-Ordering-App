import './MealItemForm.css';
import Input from '../../UI/Input/Input';
import { useRef } from 'react';
const MealItemForm = (props) => {
  const cartAmount = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = cartAmount.current.value;
    const enteredAmountNumber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      props.onErrorMessage('Please provide quantity between 1 and 5');
      return;
    }
    props.onErrorMessage('');
    props.onAddToCart(enteredAmountNumber);
  };
  return (
    <form onSubmit={submitHandler} className='form'>
      <Input
        className='input'
        ref={cartAmount}
        label='Quantity'
        input={{
          id: props.id,
          type: 'number',
          step: '1',
          defaultValue: '0',
        }}
      />
      <button>+ Add</button>
    </form>
  );
};
export default MealItemForm;
