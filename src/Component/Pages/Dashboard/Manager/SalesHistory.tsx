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
  const back = () => {
    navigate(-1);
  };
  const handleButtonClick = () => {
    navigate("/manager/allSell");
  };

  // State variables for total product, total price, and total quantity
  const [totalProduct, setTotalProduct] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  useEffect(() => {
    // Calculate total product, total price, and total quantity when salesHistory changes
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

  useEffect(() => {
    console.log("Selected Period:", selectedPeriod);
  }, [selectedPeriod]);

  useEffect(() => {
    console.log("Sales History Data:", salesHistory);
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
    <div className="container mx-auto px-4">
      <h1 className="text-3xl  text-center text-blue-500 font-bold my-4">
        Sales History
      </h1>
      <div className="flex flex-wrap justify-between mb-4">
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
          <h1 className="text-3xl text-center font-bold my-4">
            Total Product:{" "}
            <span className=" text-blue-500"> {totalProduct}</span>
          </h1>
        </div>
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
          <h1 className="text-3xl text-center font-bold my-4">
            Total Price:
            <span className=" text-red-500"> $ </span>
            <span className=" text-blue-500">{totalPrice.toFixed(2)}</span>
          </h1>{" "}
        </div>
        <div className="w-full sm:w-auto">
          <h1 className="text-3xl text-center font-bold my-4">
            Total Quantity
            <span className=" text-blue-500">: {totalQuantity}</span>
          </h1>
        </div>
      </div>{" "}
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
      {Array.isArray((salesHistory as any)?.data) &&
      (salesHistory as any)?.data.length > 0 ? (
        // Render sales history when there is data
        <div>
          <h2 className="text-2xl font-bold my-4">
            Sales History for {selectedPeriod}
          </h2>
          <ul className="list-disc pl-4">
            {(salesHistory as any)?.data
              .slice()
              .reverse()
              .map((sale: Sale) => {
                if (isSaleInPeriod(sale)) {
                  return (
                    <li
                      key={sale?._id}
                      className="mb-4 border-b pb-4 flex items-center transition duration-300 ease-in-out hover:bg-gray-100"
                    >
                      {/* Image on the left side */}
                      <img
                        loading="lazy"
                        src={sale?.image}
                        alt={sale?.name}
                        className="w-16 h-16 object-cover mr-4 rounded-full hover:shadow-md cursor-pointer"
                      />

                      {/* Sale information on the right side */}
                      <div className="flex-1">
                        <p className="text-lg font-bold text-blue-500">
                          Product Name: {sale?.name}
                        </p>
                        <p className="text-gray-600">
                          Quantity: {sale?.quantity}
                        </p>
                        <p className="text-green-600 font-semibold">
                          Total Price: ${sale?.price.toFixed(2)}
                        </p>
                        <p className="text-gray-600">
                          Buyer Name: {sale?.buyerName}
                        </p>
                        <p className="text-gray-600">
                          Phone Number: {sale?.phoneNumber}
                        </p>
                        {sale.saleDate && (
                          <p className="text-gray-500">
                            Sale Date:{" "}
                            {new Date(sale?.saleDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </li>
                  );
                }
                return null; // Exclude sales that don't match the selected period
              })}
          </ul>
        </div>
      ) : (
        // Render a message and a button when there is no sales data
        <div className="card-actions justify-center">
          <p className="text-red-500 text-4xl font-bold mb-6">
            No sales data available.
          </p>
          <button
            className="btn btn-wide ml-2 bg-black text-white"
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
