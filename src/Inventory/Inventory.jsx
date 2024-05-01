import React from "react";
import Tables from "./Tables";

const Inventory = () => {
  return (
    <>
      <div className="Inventorycard bg-white p-5">
        <h3 className="m-0">Overall Inventory</h3>
        <div className="InventorycardB mt-4  grid grid-flow-col-dense">
          <div className="InventorycardBox p-5">
            <h4 className="i1 font-medium">Categories</h4>
            <div className="InventorycardBox_ flex justify-between">
              <div className="InventorycardBox_left">
                <span>14</span>
                <p>Last 7 days</p>
              </div>
            </div>
          </div>
          {/* close InventorycardBox  */}
          <div className="InventorycardBox p-5">
          <h4 className="i2 font-medium">Total Products</h4>
            <div className="InventorycardBox_ flex justify-between">
              <div className="InventorycardBox_left">
                <span>868</span>
                <p>Last 7 days</p>
              </div>
              <div className="InventorycardBox_right">
              <span>$25000</span>
                <p>Revenue</p>
              </div>
            </div>
          </div>
           {/* close InventorycardBox  */}
          <div className="InventorycardBox p-5">
          <h4 className="i3 font-medium">Top Selling</h4>
            <div className="InventorycardBox_ flex justify-between">
              <div className="InventorycardBox_left">
                <span>5</span>
                <p>Last 7 days</p>
              </div>
              <div className="InventorycardBox_right">
              <span>$2500</span>
                <p>Cost</p>
              </div>
            </div>
          </div>
           {/* close InventorycardBox  */}
          <div className="InventorycardBox p-5">
          <h4 className="i4 font-medium">Low Stocks</h4>
            <div className="InventorycardBox_ flex justify-between">
              <div className="InventorycardBox_left">
                <span>12</span>
                <p>Ordered</p>
              </div>
              <div className="InventorycardBox_right">
              <span>2</span>
                <p>Not in stock</p>
              </div>
            </div>
          </div>
           {/* close InventorycardBox  */}
        </div>
      </div>
      <Tables />
    </>
  );
};

export default Inventory;
