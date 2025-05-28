"use client";

import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const SuccessContent = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md text-center">
        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Order Successful!
        </h1>
        <p className="text-gray-600 mb-6">Thank you for your Order.</p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => {
              router.push("/");
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

export default SuccessContent;
