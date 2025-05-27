import CheckOut from "@/Components/CheckOut/CheckOut";
import { allProductData } from "@/Components/DisplayProducts/ProductData/ProductData";
import { notFound } from "next/navigation";

import React from "react";
interface PageProps {
  params: Promise<{
    id: string | undefined;
  }>;
}

const Page = async ({ params }: PageProps) => {
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
};

export default Page;
