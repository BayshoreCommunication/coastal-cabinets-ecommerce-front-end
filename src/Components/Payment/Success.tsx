"use client";

import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useEffect, Suspense } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  email: string;
  address: string;
}

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const isCartCheckout = searchParams.get('source') === 'cart';

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    const checkoutData = localStorage.getItem("checkout_data");

    const sendEmailData = async () => {
      try {
        // If it's a cart checkout, prioritize cart data
        if (isCartCheckout && cartData) {
          const parsedCart = JSON.parse(cartData) as CartItem[];
          const { email, address } = parsedCart[0];
          const items = parsedCart.map(({ id, name, price, quantity, image }) => ({
            id,
            name,
            price,
            quantity,
            image
          }));

          const response = await fetch("https://costal-server.vercel.app/api/send-multiple-products-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              address,
              items
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to send confirmation email");
          }

          // Clear cart data after successful email sending
          localStorage.removeItem("cart");
        }
        // If it's a single item checkout, prioritize checkout data
        else if (!isCartCheckout && checkoutData) {
          const parsedCheckout = JSON.parse(checkoutData);
          const response = await fetch("https://costal-server.vercel.app/api/send-single-product-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: parsedCheckout.email || "",
              address: parsedCheckout.address || "",
              product: parsedCheckout.product,
              quantity: parsedCheckout.quantity
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to send confirmation email");
          }

          // Clear checkout data after successful email sending
          localStorage.removeItem("checkout_data");
        }
        // If no matching data found, log an error
        else {
          console.error("No matching data found for email confirmation");
        }
      } catch (error) {
        console.error("Error sending confirmation email:", error);
      }
    };

    sendEmailData();
  }, [isCartCheckout]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your Order. Your transaction has been completed
          successfully.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              // Clear all cart and checkout data before redirecting
              localStorage.removeItem("cart");
              localStorage.removeItem("checkout_data");
              // Force reload the window when navigating to home
              window.location.href = "/";
            }}
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full shadow-md transition"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  );
};

const Success = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
};

export default Success;
