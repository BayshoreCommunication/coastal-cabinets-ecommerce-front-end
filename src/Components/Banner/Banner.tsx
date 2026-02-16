"use client";
import React from "react";

const Banner = () => {
  return (
    <div className="my flex flex-col">
      {/* Main Banner Content */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 bg-gray-50 py-14 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#252222]">
            Welcome to <span className="text-[#0095FF]">Cabinet LED Store</span>
          </h1>
          <p className="text-gray-700 text-lg  max-w-4xl mx-auto">
            Please, choose your desired products and quantities, below, and
            submit the order to us. We will respond, promptly. At that time, we
            will verify your order and secure payment.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Banner;
