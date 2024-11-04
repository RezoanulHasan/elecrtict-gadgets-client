import React, { useEffect, useState } from "react";
import {
  Cart,
  useDeleteCartMutation,
  useGetCartsQuery,
} from "../../../../Redux/features/carts/cartApi";
import Spinner from "../../../Shared/Spinner/Spinner";

import Swal from "sweetalert2";
import { FaShoppingCart } from "react-icons/fa";
import SellForm from "../../Home/Sells/SellForm";
import useTitle from "../../../../Hooks/useTitle";
import galleryAnimation from "../../../../Hooks/GallerySection";
import { motion } from "framer-motion";

interface CartPageProps {}

const CartPage: React.FC<CartPageProps> = () => {
  const { data: response, isLoading, refetch } = useGetCartsQuery();
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const [showSellForm, setShowSellForm] = useState<boolean>(false);
  const [selectedGadget, setSelectedGadget] = useState<Cart | null>(null);
  useTitle("My Choose Product");
  const [deleteCartMutation] = useDeleteCartMutation();

  const handleDeleteClick = async (cartItem: Cart) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteCartMutation(cartItem._id);
        refetch();
        Swal.fire(
          "Deleted!",
          "Your item has been removed from the cart.",
          "success"
        );
      }
    } catch (error) {
      console.error("Error during cart item deletion:", error);
      Swal.fire("Error", "An error occurred during removal.", "error");
    }
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Array.isArray((response as any)?.data)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setCartItems((response as any)?.data);
    }
  }, [response]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  const cartLength = cartItems.length; // Calculate the length of the cart

  const handleSellClick = (cartItem: Cart) => {
    setSelectedGadget(cartItem);
    setShowSellForm(true);
    refetch();
  };
  const updateLocalData = (updatedGadgets: Cart[]) => {
    setCartItems(updatedGadgets);
  };

  const handleSellFormClose = () => {
    setShowSellForm(false);
  };

  return (
    <div className="container mx-auto py-8">
      {cartLength === 0 ? (
        <p className="text-red-500  font-bold text-center  mb-5  text-2xl">
          {" "}
          You have not chosen any products.
          <div className="text-center mt-48">
            <div className="mt-10 ">
              <button className="btn px-10 hover:bg-red-500 bg-black text-2xl text-white">
                <a
                  href="/user/all"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  For Add Product Click Here
                </a>
              </button>
            </div>
          </div>
        </p>
      ) : (
        <div>
          <h1 className="text-3xl text-blue-500 text-center font-bold mb-7">
            Shopping Cart
          </h1>

          <p className="text-green-700  font-bold text-center mb-10   text-2xl">
            Number of items in the cart: {cartLength}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cartItems.map((item: Cart) => (
              <li key={item?._id} className="bg-white rounded-md shadow-md">
                {" "}
                <motion.img
                  loading="lazy"
                  variants={galleryAnimation}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  src={item?.image}
                  alt={item?.name}
                  className="w-full h-52"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{item?.name}</h2>
                  <p className="text-gray-700 mb-2">Price: ${item?.price}</p>
                  <p className="text-gray-700 mb-4">
                    Category: {item?.category}
                  </p>
                  <p className="text-gray-700 mb-4">
                    Quantity: {item?.quantity}
                  </p>
                  <p className="text-gray-700 mb-4">
                    Release Date:{" "}
                    {new Date(item?.releaseDate).toLocaleDateString()}
                  </p>

                  <div className="card-actions justify-end">
                    <button
                      className="btn "
                      onClick={() => handleDeleteClick(item)}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-square  bg-black hover:bg-yellow-500"
                      onClick={() => handleSellClick(item)}
                    >
                      <FaShoppingCart className="mr-2 text-white" />
                    </button>{" "}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {showSellForm && selectedGadget && (
            <SellForm
              selectedGadget={selectedGadget}
              onClose={handleSellFormClose}
              refetchData={refetch}
              updateLocalData={updateLocalData}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CartPage;
