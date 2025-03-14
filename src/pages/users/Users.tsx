import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsersApi } from "../../features/api";

export default function Users() {
  const [usersData, setUsersData] = useState<any[]>([]);

  const {
    data: users_data,
    isError: usersisError,
    isLoading: usersisLoading,
    refetch: usersRefetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersApi(),
  });

  useEffect(() => {
    if (typeof users_data !== "undefined") {
      setUsersData(users_data.data);
    }
  }, [users_data]);

  if (usersisLoading) {
    return <div>loading</div>;
  }

  if (usersisError) {
    return <div>loading</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Users</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usersData.length > 0 ? (
                usersData.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
                      >
                        {user.email}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No expenses found matching the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{usersData.length}</span> of{" "}
              <span className="font-medium">{usersData.length}</span> expenses
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
