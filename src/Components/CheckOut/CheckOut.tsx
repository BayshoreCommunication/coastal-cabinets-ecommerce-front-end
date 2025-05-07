"use client";

import React, { useState } from "react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QCEQyP8UcLxbKnCXzg48ysRmhBHDnf4N4gzPtBNpc8Hmnk9dtlt4HGdv92JLjRgw57UHqT6EQUHli5yETB9Gbro00bCBEQ8UT"
);

type Product = {
  sku: string;
  title: string;
  regularPrice: number;
  image: string | null;
};

const CheckOut: React.FC<{ product: Product }> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Store form data in localStorage
    localStorage.setItem(
      "checkout_data",
      JSON.stringify({ email, address, quantity, product })
    );

    const stripe = await stripePromise;

    const res = await fetch(
      "https://costal-server.vercel.app/api/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ product, quantity }),
      }
    );

    const session = await res.json();

    if (stripe && session.id) {
      await stripe.redirectToCheckout({ sessionId: session.id });
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md border border-gray-100">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Checkout</h1>
      <Image
        src={product?.image || "/placeholder-image.png"}
        alt={product?.title || "Product image"}
        width={500}
        height={256}
        className="w-full h-64 object-cover rounded-md mb-4 border border-gray-200"
      />
      <p className="text-xl font-semibold text-gray-900">{product?.title}</p>
      <p className="text-sm text-gray-500 mb-1">SKU: {product?.sku}</p>
      <p className="text-base text-gray-700 mb-4">
        Price: <span className="font-medium">${product.regularPrice}</span>
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Address
          </label>
          <textarea
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            placeholder="Enter your delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded shadow-sm transition"
        >
          Confirm Purchase
        </button>
      </form>
    </div>
  );
};

export default CheckOut;
