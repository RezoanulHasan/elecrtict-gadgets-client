/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import {
  ElectricGadget,
  useGetSingleElectricGadgetsQuery,
  useDeleteSingleElectricGadgetMutation,
  useUpdateSingleElectricGadgetMutation,
  useBulkSingleDeleteElectricGadgetsMutation,
} from "../../../../Redux/features/electricGadgets/electricGadgetsAPI";
import { applyFilters } from "../../Home/filter";
import Spinner from "../../../Shared/Spinner/Spinner";
import useTitle from "../../../../Hooks/useTitle";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import galleryAnimation from "../../../../Hooks/GallerySection";
import { motion } from "framer-motion";

export interface ElectricGadgetsListProps {
  filters?: {
    weight: any;
    powerSource: string;
    modelNumber: string;
    connectivity: string;
    operatingSystem: string;
    releaseDate: string;
    category: string;
    brand: string;
  };
}

const SingleElectigadeList: React.FC<ElectricGadgetsListProps> = ({
  filters,
}) => {
  useTitle("My Products");

  const [deleteElectricGadgetMutation] =
    useDeleteSingleElectricGadgetMutation();
  const [bulkDeleteMutation] = useBulkSingleDeleteElectricGadgetsMutation();
  const {
    data: response,
    isLoading,
    refetch,
  } = useGetSingleElectricGadgetsQuery();
  const [electricGadgets, setElectricGadgets] = useState<ElectricGadget[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedReleaseDate, setReleaseDate] = useState<string>("");

  const [selectedWeight, setSelectedWeight] = useState<any>(""); // Assuming the initial value is 0, you can change it accordingly

  // Additional properties if needed
  const [selectedPowerSource, setSelectedPowerSource] = useState<string>("");
  const [selectedModelNumber, setSelectedModelNumber] = useState<string>("");
  const [selectedConnectivity, setSelectedConnectivity] = useState<string>("");

  //update
  const [updateElectricGadgetMutation] =
    useUpdateSingleElectricGadgetMutation();

  // State to manage the form visibility and the gadget being updated
  const [isUpdateFormVisible, setUpdateFormVisibility] = useState(false);
  const [updatingGadget, setUpdatingGadget] = useState<ElectricGadget | null>(
    null
  );
  //update close
  const [selectedOperatingSystem, setSelectedOperatingSystem] =
    useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<ElectricGadget[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const uniqueBrands = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.brand))
  );
  const uniqueCategories = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.category))
  );
  const uniqueReleaseDates = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.releaseDate))
  );

  const uniquePowerSources = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.powerSource))
  );

  const uniqueModelNumbers = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.modelNumber))
  );

  const uniqueConnectivities = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.connectivity))
  );

  const uniqueOperatingSystems = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.operatingSystem))
  );

  useEffect(() => {
    if (Array.isArray((response as any)?.data)) {
      setElectricGadgets((response as any)?.data);
    }
  }, [response]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!electricGadgets || electricGadgets.length === 0) {
    return (
      <div className="text-center mt-48">
        <p className="text-4xl    text-red-600 font-bold text-center">
          {" "}
          You are Not add any product. No electric gadgets available.
        </p>
        <div className="mt-10 ">
          <button className="btn px-10 hover:bg-red-500 bg-black text-2xl text-white">
            <a
              href="/userAddProduct"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              For Add Product Click Here
            </a>
          </button>
        </div>
      </div>
    );
  }

  const filteredGadgets = applyFilters(electricGadgets, {
    ...filters,
    category: selectedCategory,
    brand: selectedBrand,
    releaseDate: selectedReleaseDate,
    weight: selectedWeight,
    powerSource: selectedPowerSource,
    modelNumber: selectedModelNumber,
    connectivity: selectedConnectivity,
    operatingSystem: selectedOperatingSystem,
  })
    .filter((gadget) => gadget.quantity > 0)
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

  function handleFilterChange(arg0: string, value: string): void {
    if (arg0 === "category") {
      setSelectedCategory(value);
      setSelectedBrand("");
      setReleaseDate("");
      // Clear additional properties when changing the filter
      setSelectedWeight("");
      setSelectedPowerSource("");
      setSelectedModelNumber("");
      setSelectedConnectivity("");
      setSelectedOperatingSystem("");
    } else if (arg0 === "brand") {
      setSelectedBrand(value);
      setSelectedCategory("");
      setReleaseDate("");
      // Clear additional properties when changing the filter
      setSelectedWeight("");
      setSelectedPowerSource("");
      setSelectedModelNumber("");
      setSelectedConnectivity("");
      setSelectedOperatingSystem("");
    } else if (arg0 === "releaseDate") {
      setReleaseDate(value);
      setSelectedBrand("");
      setSelectedCategory("");
      // Clear additional properties when changing the filter
      setSelectedWeight("");
      setSelectedPowerSource("");
      setSelectedModelNumber("");
      setSelectedConnectivity("");
      setSelectedOperatingSystem("");
    } else if (arg0 === "powerSource") {
      setSelectedPowerSource(value);
      setSelectedConnectivity("");
      setReleaseDate("");
      setSelectedBrand("");
      setSelectedCategory("");
      setSelectedOperatingSystem("");
      setSelectedModelNumber("");
      setSelectedWeight("");
    } else if (arg0 === "modelNumber") {
      setSelectedModelNumber(value);
      setSelectedPowerSource("");
      setSelectedConnectivity("");
      setReleaseDate("");
      setSelectedBrand("");
      setSelectedCategory("");
      setSelectedOperatingSystem("");

      setSelectedWeight("");
    } else if (arg0 === "connectivity") {
      setSelectedConnectivity(value);
      setReleaseDate("");
      setSelectedBrand("");
      setSelectedCategory("");
      setSelectedOperatingSystem("");
      setSelectedModelNumber("");
      setSelectedPowerSource("");
      setSelectedWeight("");
    } else if (arg0 === "operatingSystem") {
      setSelectedOperatingSystem(value);
      setSelectedModelNumber("");
      setSelectedPowerSource("");
      setSelectedWeight("");
      setSelectedConnectivity("");
      setReleaseDate("");
      setSelectedBrand("");
      setSelectedCategory("");
    }
  }

  const handleSelectAll = (selectAll: boolean) => {
    const selected = selectAll ? filteredGadgets : [];
    setSelectedProducts(selected);
  };

  const handleSelectProduct = (product: ElectricGadget) => {
    const isSelected = selectedProducts.includes(product);

    setSelectedProducts((prevSelected) =>
      isSelected
        ? prevSelected.filter((selected) => selected !== product)
        : [...prevSelected, product]
    );
  };

  const handleDeleteClick = async (gadget: ElectricGadget) => {
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
        await deleteElectricGadgetMutation(gadget._id);
        refetch();
        Swal.fire("Deleted!", "Your gadget has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error during gadget deletion:", error);
      Swal.fire("Error", "An error occurred during deletion.", "error");
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts?.length > 0) {
      try {
        await bulkDeleteMutation(
          selectedProducts?.map((product) => product._id)
        );
        refetch();
        setSelectedProducts([]);
      } catch (error) {
        console.error("Error during bulk deletion:", error);
      }
    }
  };

  const handleUpdateClick = (gadget: ElectricGadget) => {
    setUpdatingGadget(gadget);
    setUpdateFormVisibility(true);
  };

  // Function to handle the update form submission
  const handleUpdateSubmit = async (updatedData: Partial<ElectricGadget>) => {
    if (updatingGadget) {
      try {
        // Use the update mutation to update the gadget
        await updateElectricGadgetMutation({
          id: updatingGadget._id,
          updatedData,
        });

        // Refetch the data after updating
        refetch();

        // Close the update form
        setUpdateFormVisibility(false);
        setUpdatingGadget(null);

        // Optionally show a success message
        Swal.fire("Updated!", "Your gadget has been updated.", "success");
      } catch (error) {
        console.error("Error during gadget update:", error);
        Swal.fire("Error", "An error occurred during update.", "error");
      }
    }
  };

  return (
    <>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-10 text-center">
          Electric Gadgets List
        </h1>

        <div className="container mb-5 mx-auto">
          {/* Link to Sell Gadget page with Sell Gadget text and dollar sign icon */}
        </div>
        {/* Filter Form */}
        <div className="mb-8  mt-10">
          <div className="card-actions justify-center">
            <div className="mb-8">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search by product name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-center  font-bold    bg-black text-white border-gray-300 border-20 p-3 mr-5"
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
          <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <label
                htmlFor="categoryFilter"
                className="block text-xl mt-4 font-medium text-white border-double p-2 text-center bg-black"
              >
                Find Category
              </label>
              <select
                id="categoryFilter"
                value={selectedCategory}
                onChange={(e) => handleFilterChange("category", e.target.value)}
              >
                <option
                  className="text-center  font-bold    bg-black text-white"
                  value=""
                >
                  All Category
                </option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="powerSourceFilter"
                className="block text-xl mt-4 font-medium text-white  border-double p-2 text-center bg-black"
              >
                Find Power Source
              </label>
              <select
                id="powerSourceFilter"
                value={selectedPowerSource}
                onChange={(e) =>
                  handleFilterChange("powerSource", e.target.value)
                }
              >
                <option
                  className="text-center font-bold bg-black text-white"
                  value=""
                >
                  All Power Sources
                </option>
                {uniquePowerSources.map((powerSource) => (
                  <option key={powerSource} value={powerSource}>
                    {powerSource}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="modelNumberFilter"
                className="block text-xl mt-4 font-medium text-white  border-double p-2 text-center bg-black"
              >
                Find Model Number
              </label>
              <select
                id="modelNumberFilter"
                value={selectedModelNumber}
                onChange={(e) =>
                  handleFilterChange("modelNumber", e.target.value)
                }
              >
                <option
                  className="text-center font-bold bg-black text-white"
                  value=""
                >
                  All Model Numbers
                </option>
                {uniqueModelNumbers.map((modelNumber) => (
                  <option key={modelNumber} value={modelNumber}>
                    {modelNumber}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="connectivityFilter"
                className="block text-xl mt-4 font-medium text-white  border-double p-2 text-center bg-black"
              >
                Find Connectivity
              </label>
              <select
                id="connectivityFilter"
                value={selectedConnectivity}
                onChange={(e) =>
                  handleFilterChange("connectivity", e.target.value)
                }
              >
                <option
                  className="text-center font-bold bg-black text-white"
                  value=""
                >
                  All Connectivity Options
                </option>
                {uniqueConnectivities.map((connectivity) => (
                  <option key={connectivity} value={connectivity}>
                    {connectivity}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="operatingSystemFilter"
                className="block text-xl mt-4 font-medium text-white  border-double p-2 text-center bg-black"
              >
                Find Operating System
              </label>
              <select
                id="operatingSystemFilter"
                value={selectedOperatingSystem}
                onChange={(e) =>
                  handleFilterChange("operatingSystem", e.target.value)
                }
              >
                <option
                  className="text-center font-bold bg-black text-white"
                  value=""
                >
                  All Operating Systems
                </option>
                {uniqueOperatingSystems.map((operatingSystem) => (
                  <option key={operatingSystem} value={operatingSystem}>
                    {operatingSystem}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="releaseDateFilter"
                className="block text-xl font-medium text-white  border-double p-2 text-center bg-black mt-4"
              >
                Find Release Date
              </label>
              <select
                id="releaseDateFilter"
                value={selectedReleaseDate}
                onChange={(e) =>
                  handleFilterChange("releaseDate", e.target.value)
                }
              >
                <option
                  className="text-center font-bold bg-black text-white"
                  value=""
                >
                  All Release Dates
                </option>
                {uniqueReleaseDates.map((releaseDate) => (
                  <option key={releaseDate} value={releaseDate}>
                    {releaseDate
                      ? new Date(releaseDate).toLocaleDateString()
                      : "Invalid Date"}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="brandFilter"
                className="block text-xl mt-4  font-medium text-white  border-double p-2 text-center bg-black"
              >
                Find Brand
              </label>
              <select
                id="brandFilter"
                value={selectedBrand}
                onChange={(e) => handleFilterChange("brand", e.target.value)}
              >
                <option
                  className="text-center  font-bold    bg-black text-white"
                  value=""
                >
                  Brand All
                </option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </div>
        {/* Gadgets List - Responsive Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Quantity</th>

                <th className="py-2 px-4 border-b">Brand</th>

                <th className="py-2 px-4 border-b">Category</th>

                <th className="py-2 px-4 border-b">Release Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGadgets?.map((gadget: ElectricGadget) => (
                <tr key={gadget._id}>
                  <td className="py-2 px-4 border-b">
                    <motion.img
                      loading="lazy"
                      variants={galleryAnimation}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      src={gadget.image}
                      alt={gadget.name}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{gadget.name}</td>
                  <td className="py-2 px-4 border-b">${gadget.price}</td>
                  <td className="py-2 px-4 border-b">{gadget.quantity}</td>
                  <td className="py-2 px-4 border-b">{gadget.brand}</td>
                  <td className="py-2 px-4 border-b">{gadget.category}</td>
                  <td className="py-2 px-4 border-b">
                    {gadget.releaseDate
                      ? new Date(gadget.releaseDate).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleUpdateClick(gadget)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(gadget)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red mr-2"
                    >
                      Delete
                    </button>

                    <Link
                      to="/userAddProduct"
                      className="bg-green-500   text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-re"
                    >
                      Add
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Update Form Modal */}
        {isUpdateFormVisible && updatingGadget && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">Update Gadget</h2>
              {/* Your update form content goes here, including fields for updating the gadget */}
              <h1>Product name </h1>
              <input
                type="text"
                value={updatingGadget.name}
                onChange={(e) =>
                  setUpdatingGadget({ ...updatingGadget, name: e.target.value })
                }
                placeholder="Name"
                className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              />
              <h1>Category</h1>
              <input
                type="text"
                value={updatingGadget.category}
                onChange={(e) =>
                  setUpdatingGadget({
                    ...updatingGadget,
                    category: e.target.value,
                  })
                }
                placeholder="Category"
                className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              />
              <h1>Brand name</h1>
              <input
                type="text"
                value={updatingGadget.brand}
                onChange={(e) =>
                  setUpdatingGadget({
                    ...updatingGadget,
                    brand: e.target.value,
                  })
                }
                placeholder="Brand"
                className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              />
              <h1>Release Date</h1>
              <input
                type="text"
                value={updatingGadget.releaseDate}
                onChange={(e) =>
                  setUpdatingGadget({
                    ...updatingGadget,
                    releaseDate: e.target.value,
                  })
                }
                placeholder="Release Date"
                className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              />
              <h1>Power Source</h1>
              <input
                type="text"
                value={updatingGadget.powerSource}
                onChange={(e) =>
                  setUpdatingGadget({
                    ...updatingGadget,
                    powerSource: e.target.value,
                  })
                }
                placeholder="Power Source"
                className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              />{" "}
              <h1>Price</h1>
              <input
                type="number"
                value={updatingGadget.price}
                onChange={(e) =>
                  setUpdatingGadget({
                    ...updatingGadget,
                    price: parseFloat(e.target.value),
                  })
                }
                placeholder="Price"
                className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              />
              <h1> Quantity </h1>
              <input
                type="number"
                value={updatingGadget.quantity}
                onChange={(e) =>
                  setUpdatingGadget({
                    ...updatingGadget,
                    quantity: parseInt(e.target.value),
                  })
                }
                placeholder="Quantity"
                className="mb-2 p-2 border border-gray-300 rounded-md w-full"
              />
              {/* ... (other input fields) */}
              <button
                onClick={() => handleUpdateSubmit(updatingGadget)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
              >
                Update
              </button>
              <button
                onClick={() => setUpdateFormVisibility(false)}
                className="ml-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {/* Bulk Deletion Section */}
        <div className="mt-8  text-center mb-10 ">
          <h2 className="text-2xl  font-bold mb-4">Bulk Delete Products</h2>
          <div>
            <label className="block text-xl font-medium text-gray-700">
              Select All
              <input
                type="checkbox"
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </label>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredGadgets.map((gadget: ElectricGadget) => (
              <div
                key={gadget?._id}
                className="mb-2 p-4 border border-gray-300 rounded-md"
              >
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(gadget)}
                  onChange={() => handleSelectProduct(gadget)}
                  className="mr-2"
                />
                <div className="flex items-center">
                  <img
                    src={gadget.image}
                    alt={gadget.name}
                    className="w-8 h-8 mr-2 object-cover rounded-md"
                  />
                  <span className="text-lg font-semibold">{gadget.name}</span>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleBulkDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red mt-4"
          >
            Bulk Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleElectigadeList;
