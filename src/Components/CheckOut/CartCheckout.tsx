"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
// import { useRouter } from "next/navigation";
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

const stripePromise = loadStripe(
    "pk_test_51QCEQyP8UcLxbKnCXzg48ysRmhBHDnf4N4gzPtBNpc8Hmnk9dtlt4HGdv92JLjRgw57UHqT6EQUHli5yETB9Gbro00bCBEQ8UT"
);

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

const CartCheckout = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
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
        window.dispatchEvent(new CustomEvent('closeCart'));
    }, []);

    const updateCart = (updatedItems: CartItem[]) => {
        setCartItems(updatedItems);
        localStorage.setItem("cart", JSON.stringify(updatedItems));
    };

    const handleQuantityChange = (id: string, change: number) => {
        const updatedItems = cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        updateCart(updatedItems);
        // Dispatch cart updated event to update the cart icon
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    };

    const handleRemoveItem = (id: string) => {
        const updatedItems = cartItems.filter(item => item.id !== id);
        updateCart(updatedItems);
        // Dispatch cart updated event to update the cart icon
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Store form data in localStorage for email confirmation
            const cartDataWithInfo = cartItems.map(item => ({
                ...item,
                email,
                address
            }));

            localStorage.setItem(
                "cart",
                JSON.stringify(cartDataWithInfo)
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
                        items: cartItems.map(item => ({
                            name: item.name,
                            price: item.price,
                            quantity: item.quantity,
                            id: item.id
                        })),
                        success_url: "https://costal-gilt.vercel.app/success?source=cart"
                    }),
                }
            );

            const session = await res.json();

            if (stripe && session.id) {
                await stripe.redirectToCheckout({ sessionId: session.id });
            }
        } catch (error) {
            console.error('Checkout error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
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

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

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
                        <h2 className="text-3xl font-bold text-gray-800">Shopping Cart</h2>
                        <div className="w-24"></div> {/* Spacer for alignment */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column - Cart Items */}
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center justify-between border-b pb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
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
                                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
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
                                            <span className="px-2 text-gray-700">{item.quantity}</span>
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
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
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
                                    {isLoading ? 'Processing...' : 'Proceed to Checkout'}
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