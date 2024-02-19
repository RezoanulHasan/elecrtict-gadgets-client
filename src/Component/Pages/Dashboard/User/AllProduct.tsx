/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  ElectricGadget,
  useGetElectricGadgetsQuery,
} from "../../../../Redux/features/electricGadgets/electricGadgetsAPI";

import Spinner from "../../../Shared/Spinner/Spinner";
import useTitle from "../../../../Hooks/useTitle";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  //Cart,
  useAddCartMutation,
} from "../../../../Redux/features/carts/cartApi";
//import Swal from "sweetalert2"; // Import SweetAlert2
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import galleryAnimation from "../../../../Hooks/GallerySection";
interface CartItem {
  name: string;
  // Add other properties of your cart item here
}
interface ElectricGadgetsListProps {}

const AllProduct: React.FC<ElectricGadgetsListProps> = () => {
  const { data: response, isLoading } = useGetElectricGadgetsQuery();
  const [electricGadgets, setElectricGadgets] = useState<ElectricGadget[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  const [cart, setCart] = useState<CartItem[]>([]);
  useTitle("All Products");
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };

  const [addCartMutation] = useAddCartMutation(); // Destructure the useAddCartMutation hook

  useEffect(() => {
    if (Array.isArray((response as any)?.data)) {
      setElectricGadgets((response as any)?.data);
    }
  }, [response]);

  const handleAddToCart = async (gadget: ElectricGadget) => {
    try {
      // Check if the product is already in the cart based on the name
      const isProductInCart = cart.some((item) => item.name === gadget.name);

      if (isProductInCart) {
        // Product is already in the cart, you can update UI accordingly
        //console.log("Product is already in the cart");

        Swal.fire({
          icon: "warning",
          title: "Item already in cart!",
          showConfirmButton: false,
          timer: 1500, // Adjust the timer as needed
        });
        return;
      }

      // Product is not in the cart, proceed to add
      await addCartMutation(gadget); // Call mutate function with gadget data

      // Optionally, show a success message
      Swal.fire({
        icon: "success",
        title: "Item added to cart successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      //console.log(gadget);

      // Update the cart state
      setCart([...cart, { name: gadget.name /* add other properties */ }]);
    } catch (error) {
      // Handle error, show error message, etc.
      console.error("Error adding to cart:", error);
    }
  };

  console.log();
  if (isLoading) {
    return <Spinner />;
  }

  if (!electricGadgets || electricGadgets.length === 0) {
    return <div>No electric gadgets available.</div>;
  }

  const filteredGadgets = electricGadgets
    .filter((gadget) =>
      gadget?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((gadget) => gadget?.quantity > 0)
    .filter((gadget) => {
      if (minPrice !== null && maxPrice !== null) {
        return gadget?.price >= minPrice && gadget?.price <= maxPrice;
      }
      return true;
    });
  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl text-blue-500 text-center font-bold mb-7">
          Electric Gadgets List For Sell
        </h1>

        <div className="container mb-10 mx-auto"></div>
        <div className="card-actions justify-center">
          <div className="mb-8">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search by product name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-2 border-gray-300 p-2 mr-2"
              />
              <FaSearch className="text-gray-600" />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center">
              <input
                type="number"
                placeholder="Set Min Price"
                value={minPrice || ""}
                onChange={(e) =>
                  setMinPrice(
                    e.target.value !== "" ? parseFloat(e.target.value) : null
                  )
                }
                className="border-2 border-gray-300 p-2 mr-2"
              />
              <input
                type="number"
                placeholder=" Set Max Price"
                value={maxPrice || ""}
                onChange={(e) =>
                  setMaxPrice(
                    e.target.value !== "" ? parseFloat(e.target.value) : null
                  )
                }
                className="border-2 border-gray-300 p-2"
              />
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGadgets.map((gadget: ElectricGadget) => (
            <li key={gadget?._id} className="bg-white rounded-md  shadow-md">
              <motion.img
                loading="lazy"
                variants={galleryAnimation}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                src={gadget.image}
                alt={gadget.name}
                className="w-full h-52"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{gadget.name}</h2>
                <p className="text-gray-700 mb-2">Price: ${gadget.price}</p>
                <p className="text-gray-700 mb-2"> Category: {gadget.brand}</p>
                <p className="text-gray-700 mb-4">
                  Category: {gadget.category}
                </p>
                <p className="text-gray-700 mb-4">
                  Quantity: {gadget.quantity}
                </p>
                <p className="text-gray-700 mb-4">
                  Release Date:{" "}
                  {new Date(gadget.releaseDate).toLocaleDateString()}
                </p>

                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleAddToCart(gadget)} // Call handleAddToCart function onClick
                    className="btn btn-square  bg-black hover:bg-yellow-500"
                  >
                    <FaShoppingCart className="mr-2 text-white" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center mt-10">
        <button
          onClick={back}
          className="btn bg-blue-400 text-white mb-10 mt-4 center btn-lg hover:bg-primary-700"
        >
          Back previous page
        </button>
      </div>
    </>
  );
};

export default AllProduct;
