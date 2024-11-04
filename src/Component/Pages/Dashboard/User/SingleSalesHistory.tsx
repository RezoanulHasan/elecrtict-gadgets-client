/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useGetSingleSalesHistoryQuery } from "../../../../Redux/features/sales/salesApi";
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

const SingleSalesHistory: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>("weekly");
  const {
    data: salesHistory,
    isLoading,
    isError,
  } = useGetSingleSalesHistoryQuery(selectedPeriod);
  useTitle("Sales History");

  const navigate = useNavigate();
  const back = () => navigate(-1);
  const handleButtonClick = () => navigate("/user/all");

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

    switch (selectedPeriod) {
      case "daily":
        return isSameDay(saleDate, new Date());
      case "weekly":
        return isSameWeek(saleDate, startOfWeek(new Date()));
      case "monthly":
        return isSameMonth(saleDate, startOfMonth(new Date()));
      case "yearly":
        return isSameYear(saleDate, startOfYear(new Date()));
      default:
        return false;
    }
  };

  const handlePeriodChange = (newPeriod: string) =>
    setSelectedPeriod(newPeriod);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-800">
          Sales Summary
        </h1>
        <select
          value={selectedPeriod}
          onChange={(e) => handlePeriodChange(e.target.value)}
          className="p-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6 text-center mb-8">
        <div className="p-4 bg-blue-100 rounded-lg shadow-md">
          <p className="text-gray-600">Total Products</p>
          <p className="text-2xl font-bold text-blue-600">{totalProduct}</p>
        </div>
        <div className="p-4 bg-green-100 rounded-lg shadow-md">
          <p className="text-gray-600">Total Price</p>
          <p className="text-2xl font-bold text-green-600">
            ${totalPrice.toFixed(2)}
          </p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-lg shadow-md">
          <p className="text-gray-600">Total Quantity</p>
          <p className="text-2xl font-bold text-yellow-600">{totalQuantity}</p>
        </div>
      </div>

      {isLoading && <Spinner />}

      {isError && <p className="text-red-500">Please try again later.</p>}

      {Array.isArray((salesHistory as any)?.data) &&
      (salesHistory as any)?.data.length > 0 ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">
            Sales History for{" "}
            {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)}
          </h2>
          <ul className="space-y-6">
            {(salesHistory as any).data
              .slice()
              .reverse()
              .map(
                (sale: Sale) =>
                  isSaleInPeriod(sale) && (
                    <li
                      key={sale?._id}
                      className="p-6 bg-white rounded-lg shadow-md flex gap-4 hover:bg-gray-50 transition"
                    >
                      <img
                        loading="lazy"
                        src={sale?.image}
                        alt={sale?.name}
                        className="w-16 h-16 rounded-full object-cover shadow-sm"
                      />
                      <div className="flex flex-col justify-center">
                        <p className="text-lg font-medium text-gray-800">
                          Product Name: {sale?.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Quantity: {sale?.quantity}
                        </p>
                        <p className="text-sm text-green-600 font-semibold">
                          Total Price: ${sale?.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Buyer Name: {sale?.buyerName}
                        </p>
                        <p className="text-sm text-gray-600">
                          Phone: {sale?.phoneNumber}
                        </p>
                        {sale.saleDate && (
                          <p className="text-xs text-gray-500">
                            Sale Date:{" "}
                            {new Date(sale?.saleDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </li>
                  )
              )}
          </ul>
        </div>
      ) : (
        <div className="text-center mt-8">
          <p className="text-xl text-gray-600 mb-4">No sales data available.</p>
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={handleButtonClick}
          >
            Create Sale
          </button>
        </div>
      )}

      <div className="text-center mt-10">
        <button
          onClick={back}
          className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
        >
          Back to Previous Page
        </button>
      </div>
    </div>
  );
};

export default SingleSalesHistory;
