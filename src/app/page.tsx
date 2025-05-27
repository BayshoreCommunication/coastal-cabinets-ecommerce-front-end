import Banner from "@/Components/Banner/Banner";
import AllProducts from "@/Components/DisplayProducts/AllProducts";
import Footer from "@/Components/Footer/Footer";
// import ProductNav from "@/Components/ProductsNav/ProductNav";



export const metadata = {
  title: `Cabinet LED Store`,
  description: `our one-stop shop for cabinet LED lighting solutions.
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
      <Banner />

      <div className=" mx-2 md:mx-6 lg:mx-24 xl:mx-44 py-10 lg:py-20">
        {/* <ProductNav /> */}
        <AllProducts />
      </div>
      <Footer />
    </div>
  );
}
