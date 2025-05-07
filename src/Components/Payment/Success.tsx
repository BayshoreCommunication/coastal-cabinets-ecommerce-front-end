"use client";

import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("checkout_data");
    if (data) {
      const parsed = JSON.parse(data);

      // Send to server to trigger email
      fetch("https://costal-server.vercel.app/api/send-confirmation-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed),
      });

      // Clear after sending
      localStorage.removeItem("checkout_data");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your transaction has been completed
          successfully.
        </p>
        <button
          onClick={() => router.push("/")}
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full shadow-md transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Success;
