/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useCreateSaleMutation } from "../../../../Redux/features/sales/salesApi";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import {
  FaShoppingCart,
  FaTimes,
  FaTag,
  FaDollarSign,
  FaUser,
  FaPhone,
} from "react-icons/fa";
import { Cart } from "../../../../Redux/features/carts/cartApi";
import { updateCartQuantity } from "../../../../Redux/features/carts/cartsSlice";
import Magnifier from "./Magnifier";

interface SellFormProps {
  selectedGadget: Cart;
  onClose: () => void;
  refetchData: () => void;
  updateLocalData: (updatedGadgets: Cart[]) => void;
}

const SellForm: React.FC<SellFormProps> = ({
  selectedGadget,
  onClose,
  refetchData,
  updateLocalData,
}) => {
  const [quantityToSell, setQuantityToSell] = useState(1);
  const [buyerName, setBuyerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [price, setPrice] = useState(0);
  const [buyerNameValid, setBuyerNameValid] = useState(true);
  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [quantityExceedsAvailable, setQuantityExceedsAvailable] =
    useState(false);
  const [createSale, { isLoading, isError }] = useCreateSaleMutation();
  const dispatch = useDispatch();
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setPrice(quantityToSell * selectedGadget.price);
  }, [quantityToSell, selectedGadget.price]);

  const handleSell = async () => {
    try {
      if (quantityToSell > selectedGadget.quantity) {
        setQuantityExceedsAvailable(true);
        return;
      }

      if (!buyerNameValid || !phoneNumberValid) return;

      const saleResponse = await createSale({
        productId: selectedGadget._id,
        quantity: quantityToSell,
        buyerName,
        phoneNumber,
        price,
        name: selectedGadget.name,
        saleDate: selectedGadget.saleDate,
        image: selectedGadget.image,
        releaseDate: selectedGadget.releaseDate,
        brand: selectedGadget.brand,
        modelNumber: selectedGadget.modelNumber,
        category: selectedGadget.category,
      });

      if ("data" in saleResponse && saleResponse.data) {
        const updatedGadgets = [saleResponse.data];
        updateLocalData(updatedGadgets);
      }

      Swal.fire({
        icon: "success",
        title: "Sale Created Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setQuantityToSell(1);
      setBuyerName("");
      setPhoneNumber("");

      dispatch(
        updateCartQuantity({
          id: selectedGadget._id ?? "",
          quantity: selectedGadget.quantity - quantityToSell,
        })
      );

      refetchData();
      onClose();
    } catch (error) {
      console.error("Error selling product:", error);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.target.value);
    setQuantityExceedsAvailable(false);
    setQuantityToSell(newQuantity);
  };

  const validateBuyerName = (name: string) => {
    const isValid = name.trim() !== "";
    setBuyerNameValid(isValid);
    setFormValid(isValid && phoneNumberValid && !quantityExceedsAvailable);
    return isValid;
  };

  const validatePhoneNumber = (number: string) => {
    const isValid = number.trim() !== "" && number.length === 11;
    setPhoneNumberValid(isValid);
    setFormValid(isValid && buyerNameValid && !quantityExceedsAvailable);
    return isValid;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 mb-10">
      <div className="relative w-full mx-auto bg-white rounded-md shadow-lg overflow-hidden">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition duration-200"
          onClick={onClose}
        >
          <FaTimes className="text-2xl" />
        </button>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
            Sell {selectedGadget.name}
          </h2>

          <div className="flex flex-col lg:flex-row items-center lg:space-x-6  justify-between">
            <div>
              <div className="border border-gray-200 rounded p-4 mb-4">
                <Magnifier
                  imageUrl={selectedGadget.image}
                  largeImageUrl={selectedGadget.image}
                  zoomFactor={2}
                  imgAlt={selectedGadget.name}
                  glassDimension={250}
                  glassBorderColor="#be9a35"
                  glassBorderWidth={1}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-2 ">
                  {selectedGadget.name}
                </h2>
                {[
                  {
                    label: "Price",

                    value: `$${selectedGadget.price}`,
                  },
                  { label: "Brand", value: selectedGadget.brand },
                  { label: "Model Number", value: selectedGadget.modelNumber },
                  { label: "Release Date", value: selectedGadget.releaseDate },
                  { label: "Category", value: selectedGadget.category },
                  {
                    label: "Operating System",
                    value: selectedGadget.operatingSystem,
                  },
                  { label: "Connectivity", value: selectedGadget.connectivity },
                  { label: "Power Source", value: selectedGadget.powerSource },
                  { label: "Weight", value: `${selectedGadget.weight}g` },
                ].map((item, index) => (
                  <div
                    className="flex justify-between border-b pb-2"
                    key={index}
                  >
                    <span className="font-semibold text-xl text-teal-500">
                      {item.label}:
                    </span>
                    <span className="font-semibold text-xl text-blue-400">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
                BY NOW
              </h1>
              <form className="space-y-4 mt-4">
                <div>
                  <FaTag className="inline-block mr-2 text-gray-500" />
                  Product
                  <input
                    type="text"
                    value={selectedGadget.name}
                    readOnly
                    className="mt-1 p-2 border rounded-md w-full text-center"
                  />
                </div>
                <div>
                  <FaShoppingCart className="inline-block mr-2 text-gray-500" />
                  Quantity to Sell:
                  <input
                    required
                    type="number"
                    value={quantityToSell}
                    onChange={handleQuantityChange}
                    min={1}
                    max={selectedGadget.quantity}
                    className={`mt-1 p-2 border rounded-md w-full text-center ${
                      quantityExceedsAvailable ? "border-red-500" : ""
                    }`}
                  />
                  {quantityExceedsAvailable && (
                    <p className="text-red-500 text-sm mt-1">
                      Quantity cannot exceed available stock
                    </p>
                  )}
                </div>
                <div>
                  <FaDollarSign className="inline-block mr-2 text-gray-500" />
                  Price per Unit:
                  <input
                    type="number"
                    value={selectedGadget.price}
                    readOnly
                    className="mt-1 p-2 border rounded-md w-full text-center"
                  />
                </div>
                <div>
                  <FaUser className="inline-block mr-2 text-gray-500" />
                  Buyer Name:
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => {
                      setBuyerName(e.target.value);
                      validateBuyerName(e.target.value);
                    }}
                    className={`mt-1 p-2 border rounded-md w-full ${
                      !buyerNameValid ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {!buyerNameValid && (
                    <p className="text-red-500 text-sm mt-1">
                      Buyer name cannot be empty
                    </p>
                  )}
                </div>
                <div>
                  <FaPhone className="inline-block mr-2 text-gray-500" />
                  Phone Number:
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      validatePhoneNumber(e.target.value);
                    }}
                    className={`mt-1 p-2 border rounded-md w-full ${
                      !phoneNumberValid ? "border-red-500" : ""
                    }`}
                    required
                  />
                  {!phoneNumberValid && (
                    <p className="text-red-500 text-sm mt-1">
                      Phone number must be 11 characters long
                    </p>
                  )}
                </div>
                <div>
                  <FaDollarSign className="inline-block mr-2 text-gray-500" />
                  Total Price:
                  <input
                    type="text"
                    value={`$${price.toFixed(2)}`}
                    readOnly
                    className="mt-1 p-2 border rounded-md w-full text-center"
                  />
                </div>
                {isError && (
                  <p className="text-red-500 mt-2">Error selling the product</p>
                )}
              </form>
              <div className="mt-6 flex justify-between space-x-2">
                <button
                  className="px-4 py-2 border rounded-md bg-red-500 text-white  hover:bg-gray-400 transition"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  className={`flex items-center justify-center px-4 py-2 border p-4 rounded-md bg-blue-700 hover:bg-yellow-600 text-white transition duration-200 ${
                    !formValid ? "cursor-not-allowed" : ""
                  }`}
                  onClick={handleSell}
                  disabled={!formValid || isLoading}
                >
                  Sell <FaShoppingCart className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellForm;
