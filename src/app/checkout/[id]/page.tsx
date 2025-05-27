// app/checkout/[sku]/page.tsx

import CheckOut from "@/Components/CheckOut/CheckOut";
import { allProductData } from "@/Components/DisplayProducts/ProductData/ProductData";
import { notFound } from "next/navigation";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = allProductData.find((p) => p.sku === id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="bg-white min-h-[100vh]">
      <CheckOut product={product} />
    </div>
  );
}
