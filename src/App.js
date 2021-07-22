import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';

const App = () => {
  const [isCartShown, setIsCartShown] = useState(false);
  const [isInOrder, setIsInOrder] = useState(false);

  const toggleCartHandler = () => {
    !isCartShown ? setIsCartShown(true) : setIsCartShown(false);
  };

  const toggleConfirmOrderHandler = () => {
    !isInOrder ? setIsInOrder(true) : setIsInOrder(false);
    setIsCartShown(!isCartShown);
  };

  return (
    <CartProvider>
      {isCartShown && <Cart
        onToggleCart={toggleCartHandler}
        onToggleOrder={toggleConfirmOrderHandler}
      />}
      <Header onToggleCart={toggleCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
};

export default App;
