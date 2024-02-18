/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import { ElectricGadget } from "../../../../Redux/features/electricGadgets/electricGadgetsAPI";
import { uptodateGadgetQuantity } from "../../../../Redux/features/electricGadgets/electricGadgetsSlice";
import { useCreateAdminSaleMutation } from "../../../../Redux/features/sales/salesApi";

interface SellFormProps {
  selectedGadget: ElectricGadget;
  onClose: () => void;
  refetchData: () => void;
  // Callback function for refetching data
  updateLocalData: (updatedGadgets: ElectricGadget[]) => void;
}

const AdminSellFrom: React.FC<SellFormProps> = ({
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
  const [createSale, { isLoading, isError }] = useCreateAdminSaleMutation();
  const dispatch = useDispatch();
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    // Update the price whenever quantity changes
    setPrice(quantityToSell * selectedGadget.price);
  }, [quantityToSell, selectedGadget.price]);

  const handleSell = async () => {
    try {
      // Check if the selected quantity exceeds the available quantity
      if (quantityToSell > selectedGadget.quantity) {
        setQuantityExceedsAvailable(true);
        return;
      }

      // Check if the buyer name and phone number are valid before proceeding
      if (!buyerNameValid || !phoneNumberValid) {
        return;
      }

      // Perform the sell action
      const saleResponse = await createSale({
        productId: selectedGadget._id,
        quantity: quantityToSell,
        buyerName: buyerName,
        phoneNumber: phoneNumber,
        price: price,
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

      // Show success message with SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Sale Created Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Update the product quantity locally
      setQuantityToSell(1);
      setBuyerName("");
      setPhoneNumber("");

      // Dispatch an action to update the quantity in Redux store
      dispatch(
        uptodateGadgetQuantity({
          id: selectedGadget._id ?? "",
          quantity: selectedGadget.quantity - quantityToSell,
        })
      );

      // Refetch the data after the sale
      refetchData();

      // Close the form
      onClose();
    } catch (error) {
      // Handle errors during the sale
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
    <div className="sell-form-overlay bg-gray-800 bg-opacity-75 fixed inset-0 flex items-center justify-center">
      <div className="sell-form bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sell {selectedGadget.name}</h2>

        <p>Available Quantity: {selectedGadget.quantity}</p>

        <label className="block mt-4">
          Product
          <input
            type="text"
            value={selectedGadget.name}
            readOnly
            className="mt-1 p-2 border rounded-md w-full text-center"
          />
        </label>
        <label className="block mt-4">
          Quantity to Sell:
          <input
            required
            type="number"
            value={quantityToSell}
            onChange={handleQuantityChange}
            min={1}
            max={selectedGadget.quantity}
            className={`mt-1 p-2 border rounded-md w-full text-center ${
              quantityExceedsAvailable && "border-red-500"
            }`}
          />
          {quantityExceedsAvailable && (
            <p className="text-red-500 mt-2">
              Quantity cannot exceed the available quantity
            </p>
          )}
        </label>
        <label className="block mt-4">
          Price per Unit:
          <input
            type="number"
            value={selectedGadget.price}
            readOnly
            className="mt-1 p-2 border rounded-md w-full text-center"
          />
        </label>
        <label className="block mt-4">
          Buyer Name:
          <input
            type="text"
            value={buyerName}
            onChange={(e) => {
              setBuyerName(e.target.value);
              validateBuyerName(e.target.value);
            }}
            className={`mt-1 p-2 border rounded-md w-full ${
              !buyerNameValid && "border-red-500"
            }`}
            required
          />
          {!buyerNameValid && (
            <p className="text-red-500 mt-2">Buyer Name cannot be empty</p>
          )}
        </label>
        <label className="block mt-4">
          Phone Number:
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              validatePhoneNumber(e.target.value);
            }}
            className={`mt-1 p-2 border rounded-md w-full ${
              !phoneNumberValid && "border-red-500"
            }`}
            required
          />
          {!phoneNumberValid && (
            <p className="text-red-500 mt-2">
              Phone Number must be 11 characters long and cannot be empty
            </p>
          )}
        </label>
        <label className="block mt-4">
          Total Price:
          <input
            type="text"
            value={`$${price.toFixed(2)}`}
            readOnly
            className="mt-1 p-2 border rounded-md w-full text-center"
          />
        </label>

        {isError && (
          <p className="text-red-500 mt-2">Error selling the product</p>
        )}

        <div className="sell-form-buttons mt-4 flex justify-between">
          <button
            className="cancel-button px-4 py-2 border rounded-md bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={`sell-button px-4 py-2 border rounded-md bg-black hover:bg-yellow-500 ${
              (isLoading || !formValid || quantityExceedsAvailable) &&
              "opacity-50 cursor-not-allowed"
            }`}
            onClick={handleSell}
            disabled={isLoading || !formValid || quantityExceedsAvailable}
          >
            <FaShoppingCart className="mr-2 text-white" />
            {isLoading ? "Selling..." : "Sell"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSellFrom;
