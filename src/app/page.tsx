import Banner from "@/Components/Banner/Banner";
import AllProducts from "@/Components/DisplayProducts/AllProducts";
import Footer from "@/Components/Footer/Footer";
import NavBar from "@/Components/NavBar/Navbar";
// import ProductNav from "@/Components/ProductsNav/ProductNav";

export const metadata = {
  title: `Custom Cabinets, Closet Design & Storage Solutions in Florida
`,
  description: `Get expert custom cabinets, closet design, and home storage solutions with Coastal Cabinets and Closets. Serving Florida for over 33 years with unmatched craftsmanship and customer service.
`,
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-USA",
    },
  },
  openGraph: {
    images: "/opengraph-image.jpg",
  },
};

export default function Home() {
  return (
    <div className="bg-white">
      <NavBar />
      <Banner />
      <div className=" mx-2 md:mx-6 lg:mx-24 xl:mx-44 py-10 lg:py-20">
        {/* <ProductNav /> */}
        <AllProducts />
      </div>
      <Footer />
    </div>
  );
}
