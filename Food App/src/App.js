import "./App.css";
import { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartShown, setCartShown] = useState(false);
  const OrderHandler = () => {
    setCartShown(false);
  };
  const showCart = () => {
    setCartShown(true);
  };
  const hideCart = () => {
    setCartShown(false);
  };
  return (
    <CartProvider>
      {cartShown && <Cart closeCart={hideCart} onOrder={OrderHandler} />}
      <Header openCart={showCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
