import { useContext, useState } from 'react';
import CartContext from '../../../store/cart-context';
import './MealItem.css';
import MealItemForm from './MealItemForm';
const MealItem = (props) => {
  const [error, setError] = useState('');
  const price = `₹${props.price.toFixed(2)}`;
  const images = `${props.image}`;
  const cartctx = useContext(CartContext);

  const handleErrorMessage = (message) => {
    setError(message);
  };

  const addtoCartHandler = (amount) => {
    cartctx.addItem({
      id: props.id,
      name: props.name,
      price: props.price,
      amount: amount,
    });
  };
  return (
    <div className='card'>
      <li className='meal'>
        <img src={images} alt='' />
        <div className='content'>
          <h3>{props.name}</h3>
          <div className='description'>{props.description}</div>
          <div className='price'>{price}</div>
        </div>
        <div>
          <MealItemForm
            onAddToCart={addtoCartHandler}
            onErrorMessage={handleErrorMessage}
          />
        </div>
      </li>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
};
export default MealItem;
