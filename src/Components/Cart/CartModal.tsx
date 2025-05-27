"use client";

import React, { useState, useEffect } from 'react';
import { FiX, FiTrash2 } from 'react-icons/fi';
import Link from 'next/link';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

const CartModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        // Listen for cart open event
        const handleOpenCart = () => setIsOpen(true);
        const handleCloseCart = () => setIsOpen(false);

        window.addEventListener('openCart', handleOpenCart);
        window.addEventListener('closeCart', handleCloseCart);

        // Load cart items from localStorage
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }

        // Prevent body scroll when drawer is open
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener('openCart', handleOpenCart);
            window.removeEventListener('closeCart', handleCloseCart);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const closeModal = () => {
        setIsOpen(false);
        // Dispatch close event
        window.dispatchEvent(new CustomEvent('closeCart'));
    };

    const removeItem = (id: string) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        // Dispatch cart updated event
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    };

    const updateQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        const updatedCart = cartItems.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        // Dispatch cart updated event
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    };

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <>
            {/* Backdrop with blur effect */}
            <div
                className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ease-in-out z-40 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={closeModal}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
                        <button
                            onClick={closeModal}
                            className="p-2 hover:bg-gray-100 rounded-full text-gray-800 transition-colors"
                        >
                            <FiX size={24} />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-500">
                                <p className="text-center mb-4">Your cart is empty</p>
                                <button
                                    onClick={closeModal}
                                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                                        {item.image && (
                                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                                        )}
                                        <div className="flex-1 text-gray-800">
                                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                            <div className="flex items-center gap-3 mt-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100 transition-colors"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center border rounded-full hover:bg-gray-100 transition-colors"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                                            aria-label="Remove item"
                                        >
                                            <FiTrash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="border-t p-4 bg-white">
                            <div className="flex justify-between items-center mb-4 text-gray-800">
                                <span className="text-lg font-semibold">Total:</span>
                                <span className="text-lg font-bold">${total.toFixed(2)}</span>
                            </div>
                            <Link
                                href="/checkout"
                                className="block w-full bg-black text-white text-center py-3 rounded-md hover:bg-gray-800 transition"
                            >
                                Proceed to Checkout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CartModal; 