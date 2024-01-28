/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import {
  ElectricGadget,
  useGetElectricGadgetsQuery,
  useBulkDeleteElectricGadgetsMutation,
  useDeleteElectricGadgetMutation,
  useUpdateElectricGadgetMutation,
} from "../../../../Redux/features/electricGadgets/electricGadgetsAPI";
import { applyFilters } from "../filter";
import Spinner from "../../../Shared/Spinner/Spinner";
import useTitle from "../../../../Hooks/useTitle";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaDollarSign, FaPlus } from "react-icons/fa";

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

const ElectricGadgetsList: React.FC<ElectricGadgetsListProps> = ({
  filters,
}) => {
  useTitle("List Products");
  const [deleteElectricGadgetMutation] = useDeleteElectricGadgetMutation();
  const [bulkDeleteMutation] = useBulkDeleteElectricGadgetsMutation();
  const { data: response, isLoading, refetch } = useGetElectricGadgetsQuery();
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
  const [updateElectricGadgetMutation] = useUpdateElectricGadgetMutation();

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

  const uniqueBrands = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.brand))
  );
  const uniqueCategories = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.category))
  );
  const uniqueReleaseDates = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.releaseDate))
  );
  const uniqueWeights = Array.from(
    new Set(electricGadgets.map((gadget) => gadget.weight))
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
    if (response?.data) {
      setElectricGadgets(response?.data);
    }
  }, [response]);

  if (isLoading) {
    return <Spinner />;
  }

  if (!electricGadgets || electricGadgets.length === 0) {
    return <div>No electric gadgets available.</div>;
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
  }).filter((gadget) => gadget.quantity > 0);

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
    } else if (arg0 === "weight") {
      setSelectedWeight(value);

      setSelectedConnectivity("");
      setReleaseDate("");
      setSelectedBrand("");
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
          <h1 className="text-2xl font-bold mb-6">Add Electric Gadgets</h1>
          <Link
            to="/add"
            className="flex item-center text-center bg-blue-500 text-white py-2 px-4 rounded-md mb-4"
          >
            <FaPlus className="mr-2" />
            Click Here See For Add Gadget
          </Link>
          {/* Link to Add Gadget page with Add Gadget text and plus icon */}

          <h1 className="text-2xl font-bold mb-6">Sell Electric Gadgets</h1>
          <Link
            to="/sell"
            className="flex items-center bg-green-500 text-white py-2 px-4 rounded-md"
          >
            <FaDollarSign className="mr-2" />
            Click Here For Sell Gadget
          </Link>
          {/* Link to Sell Gadget page with Sell Gadget text and dollar sign icon */}
        </div>
        {/* Filter Form */}
        <div className="mb-8  mt-10">
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
                htmlFor="weightFilter"
                className="block text-xl mt-4 font-medium text-white  border-double p-2 text-center bg-black"
              >
                Find Weight
              </label>
              <select
                id="weightFilter"
                value={selectedWeight}
                onChange={(e) => handleFilterChange("weight", e.target.value)}
              >
                <option
                  className="text-center font-bold bg-black text-white"
                  value=""
                >
                  All Weights
                </option>
                {uniqueWeights.map((weight) => (
                  <option key={weight} value={weight}>
                    {weight}
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
                <tr key={gadget?._id}>
                  <td className="py-2 px-4 border-b">
                    <img
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
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red"
                    >
                      Delete
                    </button>
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

export default ElectricGadgetsList;
