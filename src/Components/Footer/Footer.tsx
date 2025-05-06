import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1C1B1F] text-white py-9">
      <div className="flex flex-col items-center gap-4">
        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" aria-label="Facebook" className="bg-[#2E2E33] p-2 rounded-full hover:bg-gray-700 transition">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Instagram" className="bg-[#2E2E33] p-2 rounded-full hover:bg-gray-700 transition">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Twitter" className="bg-[#2E2E33] p-2 rounded-full hover:bg-gray-700 transition">
            <FaXTwitter />
          </a>
          <a href="#" aria-label="LinkedIn" className="bg-[#2E2E33] p-2 rounded-full hover:bg-gray-700 transition">
            <FaLinkedinIn />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-300 text-center px-4">
          Copyright © Coastal Cabinets and Closets, LLC 2025. All Rights Reserved.
          <span className="mx-2">||</span>
          Developed By:{" "}
          <a
            href="https://acuitymarketing.us"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            AcuityMarketing.us
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;


