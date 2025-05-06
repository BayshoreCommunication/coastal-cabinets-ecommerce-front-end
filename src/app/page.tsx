import Banner from "@/Components/Banner/Banner";
import AllProducts from "@/Components/DisplayProducts/AllProducts";
import Footer from "@/Components/Footer/Footer";
import NavBar from "@/Components/NavBar/Navbar";
import ProductNav from "@/Components/ProductsNav/ProductNav";

export default function Home() {
  return (
    <div className="bg-white">
      <NavBar />
      <Banner />
      <div className=" mx-2 md:mx-6 lg:mx-24 xl:mx-44">
        <ProductNav />
        <AllProducts />
      </div>
      <Footer />
    </div>
  );
}
