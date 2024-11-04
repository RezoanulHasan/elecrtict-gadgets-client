/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  ElectricGadget,
  ElectricGadgets,
  useGetElectricGadgetsQuery,
} from "../../../../Redux/features/electricGadgets/electricGadgetsAPI";

import Spinner from "../../../Shared/Spinner/Spinner";
import useTitle from "../../../../Hooks/useTitle";
import { FaShoppingCart, FaSearch } from "react-icons/fa";

import { useAddCartMutation } from "../../../../Redux/features/carts/cartApi";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import galleryAnimation from "../../../../Hooks/GallerySection";
import { FaTag, FaBox, FaStar } from "react-icons/fa";
interface CartItem {
  name: string;
}

const AllProduct: React.FC = () => {
  const { data: response, isLoading } = useGetElectricGadgetsQuery();
  const [electricGadgets, setElectricGadgets] = useState<ElectricGadgets[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOperatingSystems, setSelectedOperatingSystems] = useState<
    string[]
  >([]);
  const [selectedConnectivities, setSelectedConnectivities] = useState<
    string[]
  >([]);
  const [selectedPowerSources, setSelectedPowerSources] = useState<string[]>(
    []
  );
  const [cart, setCart] = useState<CartItem[]>([]);

  useTitle("All Products");

  const [addCartMutation] = useAddCartMutation();

  useEffect(() => {
    if (Array.isArray((response as any)?.data)) {
      setElectricGadgets((response as any)?.data);
    }
  }, [response]);

  // Get unique brands
  const uniqueBrands = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.brand))
  );

  // Extract unique categories
  const uniqueCategories = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.category))
  );
  const uniqueOperatingSystems = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.operatingSystem))
  );
  const uniqueConnectivities = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.connectivity))
  );
  const uniquePowerSources = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.powerSource))
  );
  const handleAddToCart = async (gadget: ElectricGadget) => {
    try {
      const isProductInCart = cart.some((item) => item.name === gadget.name);

      if (isProductInCart) {
        Swal.fire({
          icon: "warning",
          title: "Item already in cart!",
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }

      await addCartMutation(gadget);

      Swal.fire({
        icon: "success",
        title: "Item added to cart successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      setCart([...cart, { name: gadget.name }]);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Handle brand filter change
  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prevSelectedBrands) =>
      prevSelectedBrands.includes(brand)
        ? prevSelectedBrands.filter((b) => b !== brand)
        : [...prevSelectedBrands, brand]
    );
  };
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((c) => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const handleOperatingSystemChange = (os: string) => {
    setSelectedOperatingSystems((prev) =>
      prev.includes(os) ? prev.filter((item) => item !== os) : [...prev, os]
    );
  };

  const handleConnectivityChange = (connectivity: string) => {
    setSelectedConnectivities((prev) =>
      prev.includes(connectivity)
        ? prev.filter((item) => item !== connectivity)
        : [...prev, connectivity]
    );
  };

  const handlePowerSourceChange = (powerSource: string) => {
    setSelectedPowerSources((prev) =>
      prev.includes(powerSource)
        ? prev.filter((item) => item !== powerSource)
        : [...prev, powerSource]
    );
  };

  // Function to reset all filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setMinPrice(null);
    setMaxPrice(null);
    setSortOrder("");
    setSelectedBrands([]);
    setSelectedCategories([]);
    setSelectedOperatingSystems([]);
    setSelectedConnectivities([]);
    setSelectedPowerSources([]);
  };

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
    })
    .filter((gadget) =>
      selectedBrands.length > 0 ? selectedBrands.includes(gadget.brand) : true
    )
    .filter((gadget) =>
      selectedCategories.length > 0
        ? selectedCategories.includes(gadget.category)
        : true
    )
    .filter((gadget) =>
      selectedOperatingSystems.length > 0
        ? selectedOperatingSystems.includes(gadget.operatingSystem)
        : true
    )
    .filter((gadget) =>
      selectedConnectivities.length > 0
        ? selectedConnectivities.includes(gadget.connectivity)
        : true
    )
    .filter((gadget) =>
      selectedPowerSources.length > 0
        ? selectedPowerSources.includes(gadget.powerSource)
        : true
    )
    .sort((a, b) => {
      if (sortOrder === "lowToHigh") {
        return a.price - b.price;
      } else if (sortOrder === "highToLow") {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div className="container  mx-auto py-8 grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Filter Section */}
      <div className="col-span-1 bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-blue-600">Filters</h2>

        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search by product name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
            />
            <FaSearch className="text-gray-600 ml-2" />
          </div>
        </div>

        <div className="mb-6">
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice || ""}
            onChange={(e) =>
              setMinPrice(
                e.target.value !== "" ? parseFloat(e.target.value) : null
              )
            }
            className="border border-gray-300 p-2 w-full rounded-md mb-4 focus:outline-none focus:border-blue-400"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice || ""}
            onChange={(e) =>
              setMaxPrice(
                e.target.value !== "" ? parseFloat(e.target.value) : null
              )
            }
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
          />
        </div>

        {/* Brand Filter */}
        <h3 className="text-lg font-medium text-gray-700">Brand</h3>
        <div className="mb-6  grid grid-cols-2">
          {uniqueBrands.map((brand) => (
            <div key={brand} className="flex items-center mt-2 ">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <label className="ml-2 text-gray-700">{brand}</label>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700">Category</h3>
          <div className="grid grid-cols-2">
            {uniqueCategories.map((category) => (
              <div key={category} className="flex items-center mt-2">
                <input
                  type="radio"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="form-radio h-4 w-4 text-blue-500 rounded-full"
                />
                <label className="ml-2 text-gray-700">{category}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Operating System Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700">
            Operating System
          </h3>
          <div className="grid grid-cols-2">
            {uniqueOperatingSystems.map((os) => (
              <div key={os} className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={selectedOperatingSystems.includes(os)}
                  onChange={() => handleOperatingSystemChange(os)}
                  className="form-checkbox rounded-full h-5 w-5 text-blue-600"
                />
                <label className="ml-2 text-gray-700">{os}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Connectivity Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700">Connectivity</h3>
          <div className="grid grid-cols-2">
            {uniqueConnectivities.map((connectivity) => (
              <div key={connectivity} className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={selectedConnectivities.includes(connectivity)}
                  onChange={() => handleConnectivityChange(connectivity)}
                  className="form-checkbox rounded-full h-5 w-5 text-blue-600"
                />
                <label className="ml-2 text-gray-700">{connectivity}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Power Source Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700">Power Source</h3>
          <div className="grid grid-cols-2">
            {uniquePowerSources.map((powerSource) => (
              <div key={powerSource} className="flex items-center mt-2">
                <input
                  type="radio"
                  checked={selectedPowerSources.includes(powerSource)}
                  onChange={() => handlePowerSourceChange(powerSource)}
                  className="form-radio h-4 w-4 text-blue-500 rounded-full"
                />
                <label className="ml-2 text-gray-700">{powerSource}</label>
              </div>
            ))}
          </div>
        </div>
        {/* Sorting Section */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            Sort by Price:
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:border-blue-400"
          >
            <option value="">Select...</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>

        {/* Reset Filters Button */}
        {/* Reset Filters Button */}
        <button
          onClick={handleResetFilters}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Reset Filters
        </button>
      </div>

      {/* Products Section */}
      <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 h-96">
        {filteredGadgets.map((gadget) => (
          <motion.div
            key={gadget.id} // Assuming each gadget has a unique id
            initial="hidden"
            animate="visible"
            variants={galleryAnimation}
            className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4 flex flex-col"
          >
            {/* Price Tag on Top Left */}
            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center space-x-1 shadow-md">
              <FaTag />
              <span>${gadget.price}</span>
            </div>

            {/* Image Section */}
            <img
              src={gadget.image} // Assuming each gadget has an image property
              alt={gadget.name}
              className="h-40 w-full object-cover rounded-md mb-4"
            />

            {/* Gadget Details */}
            <div className="flex flex-col  space-y-1 mb-6">
              {/* Star Rating */}
              <div className="flex space-x-1 text-yellow-400 text-xl text-center">
                {Array(5)
                  .fill(null) // Provide `null` or any placeholder value here
                  .map((_, index) => (
                    <FaStar key={index} /> // Star icon
                  ))}
              </div>
              <h3 className="text-lg font-bold text-gray-800  text-center">
                {gadget.name}
              </h3>
              <p className="text-red-500 flex items-center space-x-4 mb-5 ">
                {/* Category Icon */}
                <span className="flex items-center space-x-1">
                  <FaBox className="text-blue-500" /> {/* Category icon */}
                  <span>{gadget.category}</span>
                </span>
                {/* Brand Icon */}
                <span className="flex items-center space-x-1">
                  <FaTag className="text-blue-500" /> {/* Brand icon */}
                  <span>{gadget.brand}</span>
                </span>
              </p>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => handleAddToCart(gadget)}
              className="mt-auto bg-blue-600 text-white font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center w-full shadow-md"
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllProduct;
