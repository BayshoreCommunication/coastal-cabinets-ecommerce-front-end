"use client";

import emailjs from "emailjs-com";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiArrowLeft, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const CartCheckout = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // const router = useRouter();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    } else {
      setCartItems([]); // Clear cart state if no data in localStorage
    }
    // Close the cart modal when checkout page loads
    window.dispatchEvent(new CustomEvent("closeCart"));
  }, []);

  const updateCart = (updatedItems: CartItem[]) => {
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const handleQuantityChange = (id: string, change: number) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(updatedItems);
    // Dispatch cart updated event to update the cart icon
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    updateCart(updatedItems);
    // Dispatch cart updated event to update the cart icon
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const serviceID = "service_fnwn03b";
    const templateID = "template_83ulct8";
    const publicKey = "2y-VvuDey2ES2YE3S";

    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

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
        ${cartItems
          .map(
            (item) => `
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;" data-label="Name">${
              item.name
            }</td>
            <td style="padding: 10px; border: 1px solid #ddd;" data-label="SKU">${
              item.id
            }</td>
            <td style="padding: 10px; border: 1px solid #ddd;" data-label="Quantity">${
              item.quantity
            }</td>
            <td style="padding: 10px; border: 1px solid #ddd;" data-label="Price">$${item.price.toFixed(
              2
            )}</td>
          </tr>
        `
          )
          .join("")}
        <tr style="background-color: #f9f9f9;">
          <td colspan="3" style="padding: 12px; text-align: right; font-weight: bold; border: 1px solid #ddd;">Total:</td>
          <td style="padding: 12px; font-weight: bold; border: 1px solid #ddd;">$${totalPrice.toFixed(
            2
          )}</td>
        </tr>
      </tbody>
    </table>

  </div>
`;

    const templateParams = {
      message_html: cartTableHTML,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      router.push("/success");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Your cart is empty
          </h2>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-200 font-medium"
          >
            <FiArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  console.log("check aefd", cartItems);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <FiArrowLeft className="mr-2" />
              Back to Home
            </Link>
            <h2 className="text-3xl font-bold text-gray-800"></h2>
            <div className="w-24"></div> {/* Spacer for alignment */}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Cart Items */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="p-1 hover:bg-gray-200 rounded-md transition-colors duration-200"
                      >
                        <FiMinus className="text-gray-600" />
                      </button>
                      <span className="px-2 text-gray-700">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="p-1 hover:bg-gray-200 rounded-md transition-colors duration-200"
                      >
                        <FiPlus className="text-gray-600" />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}

              <div className="pt-6 border-t">
                <div className="flex justify-between text-xl font-semibold text-gray-800">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Checkout Form */}
            <div className="bg-gray-50 p-8 rounded-xl shadow-inner">
              <form onSubmit={handleSubmit} className="space-y-6">
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
                    placeholder="Enter your email"
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
                    placeholder="Enter your email"
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
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200 font-medium text-lg shadow-lg hover:shadow-xl"
                >
                  {isLoading ? "Processing..." : "Confirm Order"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;
