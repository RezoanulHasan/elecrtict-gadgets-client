/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { ElectricGadget } from "../../../../Redux/features/electricGadgets/electricGadgetsAPI";

import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { updateGadgetQuantity } from "../../../../Redux/features/electricGadgets/electricGadgetsSlice";
import { FaShoppingCart } from "react-icons/fa";

interface SellFormProps {
  selectedGadget: ElectricGadget;
  onClose: () => void;
}

const SellForm: React.FC<SellFormProps> = ({ selectedGadget, onClose }) => {
  const [quantityToSell, setQuantityToSell] = useState(1);
  const [buyerName, setBuyerName] = useState("");
  const [price, setPrice] = useState(0);
  const [buyerNameValid, setBuyerNameValid] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // Update the price whenever quantity changes
    setPrice(quantityToSell * selectedGadget.price);
  }, [quantityToSell, selectedGadget.price]);

  const handleSell = async () => {
    try {
      // Check if the buyer name is valid before proceeding
      if (!buyerNameValid) {
        return;
      }

      // Perform the sell action

      // Show success message with SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Sale Created Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Update the product quantity locally
      setQuantityToSell(1); // Reset the quantity to the default
      setBuyerName(""); // Reset the buyerName to an empty string

      // Dispatch an action to update the quantity in Redux store
      dispatch(
        updateGadgetQuantity({
          id: selectedGadget._id ?? "",
          quantity: selectedGadget.quantity - quantityToSell,
        })
      );

      // Close the form
      onClose();
    } catch (error) {
      // Handle errors during the sale
      console.error("Error selling product:", error);
    }
  };

  const validateBuyerName = (name: string) => {
    // Check if the buyer name is not empty
    const isValid = name.trim() !== "";
    setBuyerNameValid(isValid);
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
            onChange={(e) => setQuantityToSell(Number(e.target.value))}
            min={1}
            max={selectedGadget.quantity}
            className="mt-1 p-2 border rounded-md w-full text-center"
          />
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
          Total Price:
          <input
            type="text"
            value={`$${price.toFixed(2)}`}
            readOnly
            className="mt-1 p-2 border rounded-md w-full text-center"
          />
        </label>

        <p className="text-red-500 mt-2">Error selling the product</p>

        <div className="sell-form-buttons mt-4 flex justify-between">
          <button
            className="cancel-button px-4 py-2 border rounded-md bg-gray-300 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={`sell-button px-4 py-2 border rounded-md bg-black hover:bg-yellow-500 ${"opacity-50 cursor-not-allowed"}`}
            onClick={handleSell}
          >
            <FaShoppingCart className="mr-2 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellForm;
