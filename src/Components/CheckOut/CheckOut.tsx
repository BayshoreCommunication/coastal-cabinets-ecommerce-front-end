"use client";

import emailjs from "emailjs-com";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Product = {
  sku: string;
  title: string;
  regularPrice: number;
  image: string | null;
};

const CheckOut: React.FC<{ product: Product }> = ({ product }) => {
  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const serviceID = "service_fnwn03b";
    const templateID = "template_83ulct8";
    const publicKey = "2y-VvuDey2ES2YE3S";

    const cartTableHTML = `
  <style>
    @media only screen and (max-width: 600px) {
      table, thead, tbody, th, td, tr {
        display: block;
        width: 100%;
      }
      thead tr {
        display: none;
      }
      td {
        position: relative;
        padding-left: 50%;
      }
      td::before {
        content: attr(data-label);
        position: absolute;
        left: 10px;
        font-weight: bold;
      }
    }
  </style>

  <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">
    <h2 style="color: #4CAF50;">Customer Information</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Delivery Address:</strong> ${address}</p>

    <h2 style="margin-top: 30px; color: #4CAF50;">Order Summary</h2>
    <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="padding: 12px; border: 1px solid #ddd;">Name</th>
          <th style="padding: 12px; border: 1px solid #ddd;">SKU</th>
          <th style="padding: 12px; border: 1px solid #ddd;">Quantity</th>
          <th style="padding: 12px; border: 1px solid #ddd;">Price</th>
        </tr>
      </thead>
      <tbody> 
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;" data-label="Name">${
              product?.title
            }</td>
            <td style="padding: 10px; border: 1px solid #ddd;" data-label="SKU">${
              product?.sku
            }</td>
            <td style="padding: 10px; border: 1px solid #ddd;" data-label="Quantity">${quantity}</td>
            <td style="padding: 10px; border: 1px solid #ddd;" data-label="Price">$${(
              quantity * product?.regularPrice
            ).toFixed(2)}</td>
          </tr>
        <tr style="background-color: #f9f9f9;">
          <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold; border: 1px solid #ddd;">Total:</td>
          <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">$${(
            quantity * product?.regularPrice
          ).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>

  </div>
`;

    // const templateParams = {
    //   message_html: cartTableHTML,
    //   name: name,
    //   from_email: email,
    // };

    try {
      // await emailjs.send(serviceID, templateID, templateParams, publicKey);
      await emailjs.send(
        serviceID,
        templateID,
        { message_html: cartTableHTML, name: name, from_email: email },
        publicKey
      );
      router.push("/success");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Complete Your Purchase
            </h1>

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
                    <span className="text-sm font-medium text-gray-900">
                      SKU: {product?.sku}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {product?.title}
                  </h2>
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
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                      placeholder="Enter Phone Number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Delivery Address
                    </label>
                    <textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400 resize-none"
                      placeholder="Enter your delivery address"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full py-4 px-6 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 flex items-center justify-center ${
                        isLoading ? "opacity-75 cursor-not-allowed" : ""
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
                        "Confirm Order"
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
