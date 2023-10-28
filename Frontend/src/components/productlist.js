import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext.js";
import axios from "axios";

export default function Main({ setCartOpen }) {
  const [products, setProducts] = useState([]);
  const { addToCart, cartItems } = useContext(CartContext);

  useEffect(() => {
    axios
      .get("/product")
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const cartItemAmount = cartItems[products[0]];

  return (
    <div className="bg-white">
      <button
        id="cart"
        className="float-right mr-32"
        onClick={() => setCartOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="file: mt-4 h-6 w-6 float-right"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </button>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        {/* Menampilkan Data menggunakan Map */}
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product, index) => (
            <div key={index}>
              <div key={product[0]} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product[2]}
                    alt={product[3]}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <p>{product[1]}</p>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product[5]}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product[4]}
                  </p>
                </div>
                <button
                  className="addToCartBttn"
                  onClick={() => addToCart(product[0])}
                >
                  Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
