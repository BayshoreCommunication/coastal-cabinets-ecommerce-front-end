// app/checkout/[sku]/page.tsx

import CheckOut from "@/Components/CheckOut/CheckOut";
import { allProductData } from "@/Components/DisplayProducts/ProductData/ProductData";
import { notFound } from "next/navigation";

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const product = allProductData.find((p) => p.sku === params.id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="bg-white min-h-[100vh]"> 
      <CheckOut product={product} />
    </div>
  );
}
