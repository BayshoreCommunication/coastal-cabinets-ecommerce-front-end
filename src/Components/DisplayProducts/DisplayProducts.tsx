"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Product = {
  sku: string;
  title: string;
  regularPrice: number;
  image: string | null;
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string | null;
}

type DisplayProductsListProps = {
  title: string;
  products: Product[];
};

const DisplayProducts: React.FC<DisplayProductsListProps> = ({
  title,
  products,
}) => {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddToCart = (product: Product) => {
    // Get existing cart items from localStorage
    const existingCart = localStorage.getItem('cart');
    const cartItems: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

    // Check if item already exists in cart
    const existingItemIndex = cartItems.findIndex((item: CartItem) => item.id === product.sku);

    if (existingItemIndex >= 0) {
      // If item exists, increment quantity
      cartItems[existingItemIndex].quantity += 1;
      setToastMessage("Quantity updated in cart!");
    } else {
      // If item doesn't exist, add it with quantity 1
      cartItems.push({
        id: product.sku,
        name: product.title,
        price: product.regularPrice,
        quantity: 1,
        image: product.image
      });
      setToastMessage("Added to cart!");
    }

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems));

    // Dispatch cart updated event
    window.dispatchEvent(new CustomEvent('cartUpdated'));

    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <section className="px-4 md:px-12 mb-16" style={{ fontFamily: "Poppins" }}>
      <h3 className="text-3xl font-medium text-center text-[#3A3A3A]">
        {title}
      </h3>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-8 bg-black text-white px-6 py-3 rounded-full shadow-lg z-50"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col h-full"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-auto object-cover bg-white p-2"
              />
            ) : (
              <div className="p-7 h-64">
                <h3 className="text-black">
                  No image available for this product. {product.sku}
                </h3>
              </div>
            )}
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-base font font-normal text-gray-600">
                SKU: <span className="font-semibold">{product.sku}</span>
              </p>
              <h4 className="text-[18px] font-semibold text-[#3A3A3A] mt-2">
                {product.title}
              </h4>
              <p className="text-sm text-gray-600 mt-2 mb-4">
                {/* Regular Price:{" "} */}
                <span className="font-semibold">
                  ${product.regularPrice.toFixed(2)}
                </span>
              </p>
              <div className="flex gap-2 mt-auto">
                <motion.button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
                  whileTap={{ scale: 0.95 }}
                >
                  Add to Cart
                </motion.button>
                <motion.button
                  onClick={() => router.push(`/payment/${product.sku}`)}
                  className="flex-1 py-2 bg-[#0199FE] text-white rounded hover:bg-blue-600 transition"
                  whileTap={{ scale: 0.95 }}
                >
                  Buy Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DisplayProducts;
