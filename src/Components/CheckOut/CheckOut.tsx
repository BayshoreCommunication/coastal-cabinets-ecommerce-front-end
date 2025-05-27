"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
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
          body: JSON.stringify({
            items: {
              name: product.title,
              price: product.regularPrice,
              quantity: quantity,
              id: product.sku
            }
          }),
        }
      );

      const session = await res.json();

      if (stripe && session.id) {
        await stripe.redirectToCheckout({ sessionId: session.id });
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <style jsx global>{`
        .cart-modal,
        .cart-drawer,
        [data-cart-drawer],
        [data-cart-modal] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `}</style>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center mb-6">
              <Link
                href="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="text-base font-medium">Back to Home</span>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Complete Your Purchase</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Information Section */}
              <div className="space-y-6">
                <div className="relative">
                  <Image
                    src={product?.image || "/placeholder-image.png"}
                    alt={product?.title || "Product image"}
                    width={600}
                    height={300}
                    className="w-full h-80 object-cover rounded-xl shadow-md"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full shadow-sm">
                    <span className="text-sm font-medium text-gray-900">SKU: {product?.sku}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-gray-900">{product?.title}</h2>
                  <p className="text-3xl font-bold text-green-500">
                    ${product.regularPrice}
                  </p>
                </div>
              </div>

              {/* Checkout Form Section */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={quantity}
                        min={1}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Delivery Address
                    </label>
                    <textarea
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900"
                      placeholder="Enter your delivery address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-gray-900"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-4 px-6 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 flex items-center justify-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Proceed to Payment'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
