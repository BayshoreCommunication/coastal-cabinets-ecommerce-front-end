"use client";

import React from "react";

type Product = {
  sku: string;
  title: string;
  regularPrice: number;
  wholesalePrice: number;
  image: string;
};

type DisplayProductsListProps = {
  title: string;
  products: Product[];
};

const DisplayProducts: React.FC<DisplayProductsListProps> = ({
  title,
  products,
}) => {
  return (
    <section className=" px-4 md:px-12 mb-16" style={{ fontFamily: "Poppins" }}>
      <h3 className="text-3xl font-medium text-center text-[#3A3A3A]">
        {title}
      </h3>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {products.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-auto object-cover bg-white p-2"
            />
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-base font font-normal text-gray-600">
                SKU: <span className="font-semibold">{product.sku}</span>
              </p>
              <h4 className="text-[18px] font-semibold text-[#3A3A3A] mt-2">
                {product.title}
              </h4>
              <p className="text-sm text-gray-600 mt-2 mb-4">
                Regular Price:{" "}
                <span className="font-semibold">
                  ${product.regularPrice.toFixed(2)}
                </span>
              </p>
              <button className="w-full mt-auto py-2 bg-[#0199FE] text-white rounded hover:bg-blue-600 transition mt-3">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DisplayProducts;
