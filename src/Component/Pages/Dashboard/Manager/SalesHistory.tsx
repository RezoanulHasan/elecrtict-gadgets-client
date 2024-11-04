/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useGetSalesHistoryQuery } from "../../../../Redux/features/sales/salesApi";
import Spinner from "../../../Shared/Spinner/Spinner";
import useTitle from "../../../../Hooks/useTitle";
import { useNavigate } from "react-router-dom";
import {
  startOfWeek,
  startOfMonth,
  startOfYear,
  isSameDay,
  isSameWeek,
  isSameMonth,
  isSameYear,
} from "date-fns";

interface Sale {
  price: number;
  _id?: string;
  product?: string;
  quantity?: number;
  buyerName: string;
  phoneNumber: string;
  saleDate?: any;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  name?: string;
  image?: string;
}

const SalesHistory: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("weekly");
  const {
    data: salesHistory,
    isLoading,
    isError,
  } = useGetSalesHistoryQuery(selectedPeriod);
  useTitle("All Sells History");

  const navigate = useNavigate();
  const handleNavigateBack = () => {
    navigate(-1);
  };
  const handleButtonClick = () => {
    navigate("/manager/allSell");
  };

  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  useEffect(() => {
    if (Array.isArray((salesHistory as any)?.data)) {
      const totalProductCount = (salesHistory as any).data.length;
      const totalQuantityCount = (salesHistory as any).data.reduce(
        (total: number, sale: Sale) => total + (sale.quantity || 0),
        0
      );
      const totalPriceCount = (salesHistory as any).data.reduce(
        (total: number, sale: Sale) => total + (sale.price || 0),
        0
      );

      setTotalProduct(totalProductCount);
      setTotalQuantity(totalQuantityCount);
      setTotalPrice(totalPriceCount);
    }
  }, [salesHistory]);

  const isSaleInPeriod = (sale: Sale): boolean => {
    const saleDate = new Date(sale.saleDate);

    if (selectedPeriod === "daily") {
      return isSameDay(saleDate, new Date());
    }
    if (selectedPeriod === "weekly") {
      const startOfCurrentWeek = startOfWeek(new Date());
      return isSameWeek(saleDate, startOfCurrentWeek);
    }
    if (selectedPeriod === "monthly") {
      const startOfCurrentMonth = startOfMonth(new Date());
      return isSameMonth(saleDate, startOfCurrentMonth);
    }
    if (selectedPeriod === "yearly") {
      const startOfCurrentYear = startOfYear(new Date());
      return isSameYear(saleDate, startOfCurrentYear);
    }
    return false;
  };

  const handlePeriodChange = (newPeriod: string) => {
    setSelectedPeriod(newPeriod);
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl text-center font-bold text-blue-600 my-6">
        Sales History
      </h1>
      <div className="flex flex-wrap justify-between mb-6">
        <div className="text-2xl font-semibold text-gray-800">
          Total Product: <span className="text-blue-600">{totalProduct}</span>
        </div>
        <div className="text-2xl font-semibold text-gray-800">
          Total Price:{" "}
          <span className="text-red-500">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="text-2xl font-semibold text-gray-800">
          Total Quantity: <span className="text-blue-600">{totalQuantity}</span>
        </div>
      </div>

      <div className="flex flex-col items-center mb-8">
        <label className="mr-2 text-lg font-semibold">Select Period:</label>
        <select
          value={selectedPeriod}
          onChange={(e) => handlePeriodChange(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {isLoading && <Spinner />}
      {isError && (
        <p className="text-red-500 text-center">Please try again later.</p>
      )}

      {Array.isArray((salesHistory as any)?.data) &&
      (salesHistory as any).data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(salesHistory as any).data
            .slice()
            .reverse()
            .map(
              (sale: Sale) =>
                isSaleInPeriod(sale) && (
                  <div
                    key={sale._id}
                    className="flex bg-gray-100 p-4 rounded-lg shadow hover:bg-gray-200 transition"
                  >
                    <img
                      src={sale.image}
                      alt={sale.name}
                      className="w-20 h-20 object-cover rounded-full mr-4"
                    />
                    <div>
                      <p className="text-xl font-bold text-blue-500">
                        Product Name: {sale.name}
                      </p>
                      <p className="text-gray-600">Quantity: {sale.quantity}</p>
                      <p className="text-green-600 font-semibold">
                        Total Price: ${sale.price.toFixed(2)}
                      </p>
                      <p className="text-gray-600">Buyer: {sale.buyerName}</p>
                      <p className="text-gray-600">Phone: {sale.phoneNumber}</p>
                      {sale.saleDate && (
                        <p className="text-gray-500">
                          Sale Date:{" "}
                          {new Date(sale.saleDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                )
            )}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p className="text-red-500 text-2xl font-semibold mb-6">
            No sales data available.
          </p>
          <button
            onClick={handleButtonClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create Sell
          </button>
        </div>
      )}

      <div className="text-center mt-10">
        <button
          onClick={handleNavigateBack}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition"
        >
          Back to Previous Page
        </button>
      </div>
    </div>
  );
};

export default SalesHistory;
