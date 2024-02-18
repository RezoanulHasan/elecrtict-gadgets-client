/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Swal from "sweetalert2";
import { useState } from "react";
import { useAddElectricGadgetMutation } from "../../../../Redux/features/electricGadgets/electricGadgetsAPI";
import { imageUpload } from "./imageUpoold"; // Assuming imageUpload is in the same directory
import useTitle from "../../../../Hooks/useTitle";
import { useNavigate } from "react-router-dom";

const AddElectricGadgetForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    image: "",
    quantity: 0,
    releaseDate: "",
    category: "",
    brand: "",
    modelNumber: "",
    createdBy: "",
    isDeleted: false,
  });

  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  useTitle("Add Product");
  const [, setLoading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");

  const [addElectricGadget, { isLoading }] = useAddElectricGadgetMutation();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      try {
        setLoading(true);
        setUploadButtonText("Uploading...");
        // Pass the entire event to the handler
        handleImageUpload(event);
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle error (e.g., show a message to the user)
      } finally {
        setLoading(false);
        setUploadButtonText("Change Image");
      }
    }
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      try {
        const result = await imageUpload(selectedFile);
        setFormData((prevData) => ({
          ...prevData,
          image: result.data.url,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
        // Handle error (e.g., show a message to the user)
      }
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert price and quantity to numbers
    const updatedValue =
      name === "price" || name === "quantity" ? parseFloat(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addElectricGadget(formData)
      .unwrap()
      .then(() => {
        // Handle success
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Electric gadget added successfully!",
        });

        // Reset the form
        setFormData({
          name: "",
          price: 0,
          image: "",
          quantity: 0,
          releaseDate: "",
          category: "",
          brand: "",
          modelNumber: "",
          createdBy: "",
          isDeleted: false,
        });
      })
      .catch((err) => {
        // Handle error
        console.error("Error adding electric gadget:", err);

        // Optionally show an error message
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to add electric gadget. Please try again.",
        });
      });
  };

  return (
    <>
      <div className="min-h-screen mt-5 mb-10 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
            Add Electric Gadget
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            {/* ... (image) */}
            <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
              <div className="flex flex-col w-max mx-auto text-center">
                <label>
                  <input
                    onChange={handleImageChange}
                    className="text-sm cursor-pointer w-36 hidden"
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    hidden
                  />
                  <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
                    {uploadButtonText}
                  </div>
                </label>
              </div>
            </div>
            {/* .image*/}

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-600"
              >
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>

            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-600"
            >
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              required
            />
            <div className="mb-4">
              <label
                htmlFor="brand"
                className="block text-sm font-medium text-gray-600"
              >
                Brand:
              </label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="modelNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Model Number:
              </label>
              <input
                type="text"
                id="modelNumber"
                name="modelNumber"
                value={formData.modelNumber}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-600"
              >
                Category:
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="releaseDate"
                className="block text-sm font-medium text-gray-600"
              >
                Release Date:
              </label>
              <input
                type="date" // Change type to "date"
                id="releaseDate"
                name="releaseDate"
                value={formData.releaseDate}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              />
            </div>

            <div className="card-actions justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add Electric Gadget"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="text-center mt-10">
        <button
          onClick={back}
          className="btn bg-blue-400 text-white mb-10 mt-4  center btn-lg  hover:bg-primary-700"
        >
          Back previous page
        </button>
      </div>
    </>
  );
};

export default AddElectricGadgetForm;
