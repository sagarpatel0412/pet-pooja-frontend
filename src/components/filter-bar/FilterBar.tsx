
import type React from "react";

import { useState } from "react";

interface FilterBarProps {
  categories: { id: number; name: string }[];
  users: { id: number; name: string }[];
  filters: {
    category_id: number;
    user_id: number;
    startDate: string;
    endDate: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      category_id: number;
      user_id: number;
      startDate: string;
      endDate: string;
    }>
  >;
}

export default function FilterBar({
  categories,
  users,
  filters,
  setFilters,
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleReset = () => {
    setFilters({
      category_id: 0,
      user_id: 0,
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-800">Filters</h2>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg
            className={`w-5 h-5 transform transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isExpanded && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category Filter */}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category
              </label>
              <select
                id="category"
                value={filters.category_id}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    category_id: Number(e.target.value),
                  })
                }
                className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value={0}>All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* User Filter */}
            <div>
              <label
                htmlFor="user"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                User
              </label>
              <select
                id="user"
                value={filters.user_id}
                onChange={(e) =>
                  setFilters({ ...filters, user_id: Number(e.target.value) })
                }
                className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value={0}>All Users</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Start Date Filter */}
            <div>
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                value={filters.startDate}
                onChange={(e) =>
                  setFilters({ ...filters, startDate: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* End Date Filter */}
            <div>
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                End Date
              </label>
              <input
                type="date"
                id="endDate"
                value={filters.endDate}
                onChange={(e) =>
                  setFilters({ ...filters, endDate: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleReset}
              className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg mr-2"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
