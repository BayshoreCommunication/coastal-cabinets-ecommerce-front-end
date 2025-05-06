import React from "react";

const Banner = () => {
  return (
    <section className="flex flex-col md:flex-row w-full max-h-full lg:max-h-[70vh]">
      {/* Left Text Section */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 px-6 py-6 sm:py-12 md:px-12">
        <div className="ml-6 w-full md:w-4/5">
          <h1 className="text-4xl sm:text-5xl lg:text-[70px] xl:text-[88px] font-bold text-gray-900">
            Bring your <br /> <span className="text-blue-500">desire</span>
          </h1>
          <p className="mt-6 text-gray-700 text-base sm:text-lg">
            Ask us about our new{" "}
            Contractor Program, where you can order by the container, straight
            from our manufacturing plant to be delivered directly to your
            requested location.
          </p>
          <button className="mt-8 px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-gray-800 transition  tracking-tight md:tracking-normal">
            CALL COASTAL CABINETS &amp; CLOSETS
          </button>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="flex-1 w-full md:w-1/2">
        <img
          src="/Banner.png"
          alt="Kitchen Example"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default Banner;
