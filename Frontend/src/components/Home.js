import React, { useState } from "react";
import ProductList from "./productlist";
import Cart from "./cartlist";
import { CartContextProvider } from "../context/CartContext.js";

export const Home = () => {
  const [isCartOpen, setCartOpen] = useState(false);
  return (
    <CartContextProvider>
      <div className="App">
        <ProductList setCartOpen={setCartOpen} />
        {isCartOpen && <Cart setCartOpen={setCartOpen} />}
      </div>
    </CartContextProvider>
  );
};

export default Home;
