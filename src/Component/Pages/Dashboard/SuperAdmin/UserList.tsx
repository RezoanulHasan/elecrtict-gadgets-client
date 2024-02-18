/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from "react";
import Swal from "sweetalert2";
import {
  User,
  useAllUsersQuery,
  useDeleteUserByIdMutation,
  useUpdateUserByIdMutation,
} from "../../../../Redux/features/auth/userApi";
import Spinner from "../../../Shared/Spinner/Spinner";
//import useTitle from "../../../../Hooks/useTitle";

const UserList: FC = () => {
  const { data: response, isLoading, isError, refetch } = useAllUsersQuery();
  const [deleteUserMutation] = useDeleteUserByIdMutation();
  const [users, setUsers] = useState<User[]>([]);
  const [updateUserMutation] = useUpdateUserByIdMutation();
  const [, setSelectedUser] = useState<User | null>(null);
  // Initial loading or refetching
  React.useEffect(() => {
    if (!isLoading && response) {
      setUsers((response as any)?.users || []);
    }
  }, [response, isLoading]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !Array.isArray(users)) {
    console.error("Error loading users or invalid data format", response);
    return <div>Error loading users or invalid data format</div>;
  }
  const handleDeleteClick = async (user: User) => {
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
        await deleteUserMutation(user._id);
        refetch();
        // Remove the user from local state
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== user._id));
        Swal.fire("Deleted!", "Your gadget has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error during gadget deletion:", error);
      Swal.fire("Error", "An error occurred during deletion.", "error");
    }
  };

  const handleUpdateClick = (user: User) => {
    Swal.fire({
      title: "Update User",
      html: `
        
        <h1 >Set Role </h1>
        <select id="role" class="swal2-input">
          <option value="manager" ${
            user.role === "manager" ? "selected" : ""
          }>Manager</option>
          <option value="user" ${
            user.role === "user" ? "selected" : ""
          }>User</option>
          <!-- Add other role options as needed -->
        </select>


        <input type="text" id="username" class="swal2-input" placeholder="Username" value="${
          user.username
        }">
        <input type="email" id="email" class="swal2-input" placeholder="Email" value="${
          user.email
        }">
      `,
      showCancelButton: true,
      confirmButtonText: "Update",
      preConfirm: async () => {
        const updatedUserData = {
          username: (document.getElementById("username") as HTMLInputElement)
            .value,
          email: (document.getElementById("email") as HTMLInputElement).value,
          role: (document.getElementById("role") as HTMLSelectElement).value,
          // Add other fields as needed
        };

        try {
          await updateUserMutation({
            userId: user._id,
            updatedUserData: updatedUserData,
          });

          refetch(); // Refetch user data
          Swal.fire(
            "Updated!",
            "User information has been updated.",
            "success"
          );
        } catch (error) {
          console.error("Error during user update:", error);
          Swal.fire("Error", "An error occurred during update.", "error");
        } finally {
          setSelectedUser(null);
        }
      },
    });
  };

  return (
    <div>
      <h2 className="text-4xl  text-center font-bold mb-4">User List</h2>

      {users?.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Upadte
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">{user._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.role !== "superAdmin" ? (
                    <button
                      className={`${
                        user.isDeleted
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-red-500"
                      } text-white px-4 py-2 rounded ${
                        user.isDeleted ? "" : "hover:bg-red-600"
                      }`}
                      onClick={() => !user.isDeleted && handleDeleteClick(user)}
                      disabled={user.isDeleted}
                    >
                      Delete
                    </button>
                  ) : (
                    <span className="text-gray-500">Cannot Delete</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className={`${
                      user.isDeleted || user.role === "superAdmin"
                        ? "bg-black-500"
                        : "bg-blue-700"
                    } text-white px-4 py-2 rounded `}
                    onClick={() => handleUpdateClick(user)}
                    disabled={user.isDeleted || user.role === "superAdmin"}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No users found.</div>
      )}
    </div>
  );
};

export default UserList;
