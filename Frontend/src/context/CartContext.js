import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const CartContext = createContext(null);

export const CartContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  // Melakukan Get Api pada Backend
  useEffect(() => {
    axios
      .get("/product")
      .then((response) => {
        const transformedProducts = response.data.products.map((product) => ({
          id: product[0],
          name: product[1],
          href: "#", // Belum Di implementasikan
          imageSrc: product[2],
          imageAlt: product[3],
          price: product[4],
          color: product[5],
        }));
        // Mengubah Bentuk data
        setProducts(transformedProducts);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  // Inisiasi Product Cart
  const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i < products.length + 1; i++) {
      cart[i] = 0;
    }
    return cart;
  };
  
  const [cartItems, setCartItems] = useState(getDefaultCart());

  // Mengambil jumlah product untuk ditampilkan di Cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = products.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.price;
        }
      }
    }
    return totalAmount;
  };


  // Menambah product di cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));
  };

  // Mengurangi product di cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] - 1 : 0,
    }));
  };

  // Mengupdate product dicart
  const updateCartItemCount = (newAmount, itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };

  // Inisiasi ContextValue
  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartItemCount,
    getTotalCartAmount,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
};
