/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from "react";
import Swal from "sweetalert2";
import {
  User,
  useAllUsersQuery,
  useDeleteUserByIdMutation,
} from "../../../../Redux/features/auth/userApi";
import Spinner from "../../../Shared/Spinner/Spinner";
//import useTitle from "../../../../Hooks/useTitle";

const UserList: FC = () => {
  const { data: response, isLoading, isError, refetch } = useAllUsersQuery();
  const [deleteUserMutation] = useDeleteUserByIdMutation();
  const [users, setUsers] = useState<User[]>([]);

  // Initial loading or refetching
  React.useEffect(() => {
    if (!isLoading && response) {
      setUsers((response as any)?.users || []);
    }
  }, [response, isLoading]);

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

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !Array.isArray(users)) {
    console.error("Error loading users or invalid data format", response);
    return <div>Error loading users or invalid data format</div>;
  }

  return (
    <div>
      <h2 className="text-2xl  text-center font-bold mb-4">User List</h2>

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
