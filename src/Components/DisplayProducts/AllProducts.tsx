import React from 'react';
import DisplayProducts from './DisplayProducts';

const aluminumProducts = [
    {
      sku: "AP-01-S",
      title: "Surface Aluminum Profile - Silver 17x7 mm – 8 ft",
      regularPrice: 25.44,
      wholesalePrice: 18.9,
      image: "/product1.png",
    },
    {
      sku: "AP-01-B",
      title: "Surface Aluminum Profile - Black 17x7 mm – 8 ft",
      regularPrice: 32.31,
      wholesalePrice: 11.3,
      image: "/product2.png",
    },
    {
      sku: "AP-03",
      title: "90 degree Aluminum Profile – 16x16 mm 8 ft",
      regularPrice: 28.12,
      wholesalePrice: 9.84,
      image: "/product3.png",
    },
    {
      sku: "AP-11-S",
      title: "Recessed Aluminum Profile – 17x7 mm 8 ft",
      regularPrice: 24.44,
      wholesalePrice: 8.9,
      image: "/product4.png",
    },
    {
      sku: "AP-11-S",
      title: "Recessed Aluminum Profile – 17x7 mm 8 ft",
      regularPrice: 24.44,
      wholesalePrice: 8.9,
      image: "/product5.png",
    },
    {
      sku: "AP-11-S",
      title: "Recessed Aluminum Profile – 17x7 mm 8 ft",
      regularPrice: 24.44,
      wholesalePrice: 8.9,
      image: "/product1.png",
    },
    {
      sku: "AP-11-S",
      title: "Recessed Aluminum Profile – 17x7 mm 8 ft",
      regularPrice: 24.44,
      wholesalePrice: 8.9,
      image: "/product2.png",
    },
    {
      sku: "AP-11-S",
      title: "Recessed Aluminum Profile – 17x7 mm 8 ft",
      regularPrice: 24.44,
      wholesalePrice: 8.9,
      image: "/product3.png",
    },
  ];

const AllProducts = () => {
    return (
        <div>
            <DisplayProducts title="Aluminum Products" products={aluminumProducts}/>  
        </div>
    );
};

export default AllProducts;