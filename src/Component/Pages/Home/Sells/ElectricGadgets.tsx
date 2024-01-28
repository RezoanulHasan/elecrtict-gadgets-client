/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useGetSalesHistoryQuery } from "../../../../Redux/features/sales/salesApi";
import Spinner from "../../../Shared/Spinner/Spinner";
import useTitle from "../../../../Hooks/useTitle";
import { useNavigate } from "react-router-dom";
interface Sale {
  _id?: string;
  product?: string;
  quantity?: number;
  buyerName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  saleDate?: any; // Change the type to string
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  name?: string;
  price?: number;
}
interface SalesHistory {
  success: boolean;
  statusCode: number;
  message: string;
  data: Sale[];
}
const SalesHistory: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("weekly");
  const {
    data: salesHistory,
    isLoading,
    isError,
  } = useGetSalesHistoryQuery(selectedPeriod);

  useTitle("Sells History");

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  const handleButtonClick = () => {
    navigate("/sell");
  };

  useEffect(() => {
    console.log("Selected Period:", selectedPeriod);
  }, [selectedPeriod]);

  useEffect(() => {
    console.log("Sales History Data:", salesHistory);
  }, [salesHistory]);

  const handlePeriodChange = (newPeriod: string) => {
    setSelectedPeriod(newPeriod);
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl  text-center text-blue-500 font-bold my-4">
        Sales History
      </h1>

      <div className="mb-4">
        <label className="mr-2">Select Period:</label>
        <select
          value={selectedPeriod}
          onChange={(e) => handlePeriodChange(e.target.value)}
          className="border p-2"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {isLoading && <Spinner></Spinner>}

      {isError && <p className="text-red-500">Please try again later.</p>}

      {salesHistory &&
      Array.isArray(salesHistory) &&
      salesHistory.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold my-4">
            Sales History for {selectedPeriod}
          </h2>
          <ul className="list-disc pl-4">
            {salesHistory.map((sale: Sale) => {
              const formattedSaleDate =
                sale.saleDate instanceof Date
                  ? sale.saleDate.toLocaleDateString()
                  : sale.saleDate;

              return (
                <li key={sale._id} className="mb-4 border-b pb-4">
                  <p className="text-lg font-bold text-blue-500">
                    Product Name: {sale?.name || "N/A"}
                  </p>
                  <p className="text-gray-600">
                    Quantity: {sale?.quantity || 0}
                  </p>
                  {sale.price !== undefined && (
                    <p className="text-green-600 font-semibold">
                      Total Price: ${sale.price.toFixed(2)}
                    </p>
                  )}
                  <p className="text-gray-600">
                    Buyer Name: {sale?.buyerName || "N/A"}
                  </p>
                  {formattedSaleDate !== undefined && (
                    <p className="text-gray-500">
                      Sale Date: {formattedSaleDate}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="card-actions justify-center">
          <p className="text-red-500 text-4xl font-bold mb-60">
            No sales data available.
          </p>
          <br />
          <button
            className="btn btn-wide ml-2  bg-black text-white"
            onClick={handleButtonClick}
          >
            Create Sell
          </button>
        </div>
      )}

      <div className="text-center mt-10">
        <button
          onClick={back}
          className="btn bg-blue-400 text-white mb-10 mt-4  center btn-lg  hover:bg-primary-700"
        >
          Back previous page
        </button>
      </div>
    </div>
  );
};

export default SalesHistory;
