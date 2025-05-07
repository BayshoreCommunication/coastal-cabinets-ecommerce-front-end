import React from "react";
import DisplayProducts from "./DisplayProducts";
import { aluminumProducts, amplifiers, easyConnectSystem, ledStrips, powerSupplies, remotes, sensorAndPanel, wareAndConnection } from "./ProductData/ProductData";



const AllProducts = () => {
  return (
    <div>
      <DisplayProducts title="Aluminum Products" products={aluminumProducts} />
      <DisplayProducts title="Wire & Connectors" products={wareAndConnection} />
      <DisplayProducts title="Power Supplies" products={powerSupplies} />
      <DisplayProducts title="Led Strips" products={ledStrips} />
      <DisplayProducts title="Amplifiers" products={amplifiers} />
      <DisplayProducts title="Remotes" products={remotes} />
      <DisplayProducts title="Sensors & Panels" products={sensorAndPanel} />
      <DisplayProducts title="Easy Connect System" products={easyConnectSystem} />
    </div>
  );
};

export default AllProducts;
