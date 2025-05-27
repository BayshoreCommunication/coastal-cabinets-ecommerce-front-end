"use client";

import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

interface CartItem {
    id: string;
    quantity: number;
}

const FloatingCartButton = () => {
    const [itemCount, setItemCount] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const updateCartCount = () => {
            const cart = localStorage.getItem('cart');
            if (cart) {
                const cartItems: CartItem[] = JSON.parse(cart);
                const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
                setItemCount(totalItems);
            }
        };

        // Listen for cart open/close
        const handleCartOpen = () => setIsCartOpen(true);
        const handleCartClose = () => setIsCartOpen(false);

        // Initial count
        updateCartCount();

        // Listen for storage changes
        window.addEventListener('storage', updateCartCount);
        // Listen for custom cart update events
        window.addEventListener('cartUpdated', updateCartCount);
        // Listen for cart open/close events
        window.addEventListener('openCart', handleCartOpen);
        window.addEventListener('closeCart', handleCartClose);

        return () => {
            window.removeEventListener('storage', updateCartCount);
            window.removeEventListener('cartUpdated', updateCartCount);
            window.removeEventListener('openCart', handleCartOpen);
            window.removeEventListener('closeCart', handleCartClose);
        };
    }, []);

    const handleCartOpen = () => {
        window.dispatchEvent(new CustomEvent('openCart'));
    };

    // Hide button if cart is open or on checkout page
    if (isCartOpen || pathname === '/checkout') {
        return null;
    }

    return (
        <button
            onClick={handleCartOpen}
            className="fixed bottom-8 right-8 p-4 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 hover:scale-110 z-50"
            aria-label="Open cart"
        >
            <FiShoppingCart size={24} />
            {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {itemCount}
                </span>
            )}
        </button>
    );
};

export default FloatingCartButton; 