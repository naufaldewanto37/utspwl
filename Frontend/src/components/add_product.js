import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productImageSrc, setproductImageSrc] = useState("");
  const [productImageAlt, setproductImageAlt] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productColor, setProductColor] = useState("");

  const addProductToDatabase = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/product", {
        name: productName,
        imageSrc: productImageSrc,
        imageAlt: productImageAlt,
        price: productPrice,
        color: productColor,
      });
      if (response.data.status === "success") {
        alert("Produk berhasil ditambahkan");
      } else {
        alert("Gagal menambahkan produk");
      }
    } catch (error) {
      alert("Terjadi kesalahan");
    }
  };

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <p className="text-4xl font-bold text-gray-900">Tambah Produk</p>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Nama Produk:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Nama Barang..."
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="imageSrc"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Gambar
              </label>
              <div className="mt-2">
                <input
                  name="imageSrc"
                  className="block w-1/5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Link Gambar"
                  onChange={(e) => setproductImageSrc(e.target.value)}
                  value={productImageSrc}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="imageAlt"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Alternate Gambar
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="imageAlt"
                    value={productImageAlt}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    onChange={(e) => setproductImageAlt(e.target.value)}
                    placeholder="Penjelasan Gambar"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Harga
              </label>
              <div className="text-center">
                <div className="mt-2 flex items-center gap-x-3">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="price"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Harga Produk"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="color"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Warna
              </label>
              <div className="text-center">
                <div className="mt-2 flex items-center gap-x-3">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="color"
                      value={productColor}
                      onChange={(e) => setProductColor(e.target.value)}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Warna Produk"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              onClick={addProductToDatabase}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddProduct;
