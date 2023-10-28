import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const DeleteProduct = () => {
  const [products, setProducts] = useState([]);
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

  const navigate = useNavigate();

  const Delete_Product = (id) => {
    axios.delete(`/product/${id}`, products).then(() => {
      alert("Produk berhasil dihapus!");
      navigate("/");
    });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Pilih Produk yang mau di hapus
      </h2>
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
              <button onClick={() => Delete_Product(product[0])}>Hapus Product</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeleteProduct;
