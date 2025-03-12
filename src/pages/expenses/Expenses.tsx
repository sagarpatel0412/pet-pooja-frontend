import { useState, useEffect } from "react";
import ExpenseForm from "../../components/expense-form/ExpenseForm";
import FilterBar from "../../components/filter-bar/FilterBar";
import DeleteConfirmation from "../../components/delete-confirmation/DeleteConfirmation";
import { useQuery } from "@tanstack/react-query";
import { expenseApi, getUsersApi, getCategoriesApi } from "../../features/api";
import moment from "moment";

// Define types based on the database schema
interface Expense {
  id: number;
  user_id: number;
  category_id: number;
  amount: number;
  date: string;
  description: string;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

// Mock data for demonstration
const mockUsers: User[] = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Robert Johnson" },
];

const mockCategories: Category[] = [
  { id: 1, name: "Food" },
  { id: 2, name: "Transportation" },
  { id: 3, name: "Entertainment" },
  { id: 4, name: "Utilities" },
  { id: 5, name: "Shopping" },
];

const mockExpenses: Expense[] = [
  {
    id: 1,
    user_id: 1,
    category_id: 1,
    amount: 45.5,
    date: "2023-03-15",
    description: "Grocery shopping",
    created_at: "2023-03-15T10:30:00",
    updated_at: "2023-03-15T10:30:00",
  },
  {
    id: 2,
    user_id: 1,
    category_id: 2,
    amount: 25.0,
    date: "2023-03-16",
    description: "Uber ride",
    created_at: "2023-03-16T14:20:00",
    updated_at: "2023-03-16T14:20:00",
  },
  {
    id: 3,
    user_id: 2,
    category_id: 3,
    amount: 60.75,
    date: "2023-03-17",
    description: "Movie tickets",
    created_at: "2023-03-17T19:45:00",
    updated_at: "2023-03-17T19:45:00",
  },
  {
    id: 4,
    user_id: 3,
    category_id: 4,
    amount: 120.3,
    date: "2023-03-18",
    description: "Electricity bill",
    created_at: "2023-03-18T09:15:00",
    updated_at: "2023-03-18T09:15:00",
  },
  {
    id: 5,
    user_id: 2,
    category_id: 5,
    amount: 89.99,
    date: "2023-03-19",
    description: "New headphones",
    created_at: "2023-03-19T16:30:00",
    updated_at: "2023-03-19T16:30:00",
  },
];

export default function Expenses() {
  // State for expenses data
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [usersData, setUsersData] = useState<any[]>([]);

  const {
    data: expense_data,
    isError: expenseisError,
    isLoading: expenseisLoading,
    refetch: expenseRefetch,
  } = useQuery({
    queryKey: ["expenses"],
    queryFn: () => expenseApi(),
  });

  const {
    data: users_data,
    isError: usersisError,
    isLoading: usersisLoading,
    refetch: usersRefetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersApi(),
  });

  const {
    data: category_data,
    isError: categoryisError,
    isLoading: categoryisLoading,
    refetch: categoryRefetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesApi(),
  });

  useEffect(() => {
    console.log(expense_data);
    if (typeof expense_data !== "undefined") {
      setExpenses(expense_data);
      setFilteredExpenses(expense_data);
    }

    if (typeof users_data !== "undefined") {
      setUsersData(users_data);
    }

    if (typeof category_data !== "undefined") {
      setCategoryData(category_data);
    }
  }, [expense_data, category_data, users_data]);

  // State for form handling
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);

  // State for delete confirmation
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);

  // State for filters
  const [filters, setFilters] = useState({
    category_id: 0,
    user_id: 0,
    startDate: "",
    endDate: "",
  });

  // Apply filters when filter state changes
  useEffect(() => {
    let result = [...filteredExpenses];

    if (filters.category_id > 0) {
      result = result.filter(
        (expense) => expense.category_id === filters.category_id
      );
    }

    if (filters.user_id > 0) {
      result = result.filter((expense) => expense.user_id === filters.user_id);
    }

    if (filters.startDate) {
      result = result.filter(
        (expense) => new Date(expense.date) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      result = result.filter(
        (expense) => new Date(expense.date) <= new Date(filters.endDate)
      );
    }

    setFilteredExpenses(result);
  }, [expenses, filters]);

  // Handle adding a new expense
  const handleAddExpense = (
    expense: Omit<Expense, "id" | "created_at" | "updated_at">
  ) => {
    const newExpense: Expense = {
      ...expense,
      id: expenses.length > 0 ? Math.max(...expenses.map((e) => e.id)) + 1 : 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setExpenses([...expenses, newExpense]);
    setIsAddFormOpen(false);
  };

  // Handle updating an expense
  const handleUpdateExpense = (updatedExpense: Expense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id
          ? { ...updatedExpense, updated_at: new Date().toISOString() }
          : expense
      )
    );
    setIsEditFormOpen(false);
    setCurrentExpense(null);
  };

  // Handle deleting an expense
  const handleDeleteExpense = () => {
    if (expenseToDelete !== null) {
      setExpenses(expenses.filter((expense) => expense.id !== expenseToDelete));
      setIsDeleteConfirmOpen(false);
      setExpenseToDelete(null);
    }
  };

  // Open edit form with the selected expense
  const openEditForm = (expense: Expense) => {
    setCurrentExpense(expense);
    setIsEditFormOpen(true);
  };

  // Open delete confirmation for the selected expense
  const openDeleteConfirm = (id: number) => {
    setExpenseToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          Expense Tracker
        </h1>
        <button
          onClick={() => setIsAddFormOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New Expense
        </button>
      </div>

      <FilterBar
        categories={categoryData}
        users={usersData}
        filters={filters}
        setFilters={setFilters}
      />

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {moment(expense.date).format("YYYY-MM-DD")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          expense.category_id === 1
                            ? "bg-green-100 text-green-800"
                            : expense.category_id === 2
                            ? "bg-blue-100 text-blue-800"
                            : expense.category_id === 3
                            ? "bg-purple-100 text-purple-800"
                            : expense.category_id === 4
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-pink-100 text-pink-800"
                        }`}
                      >
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {expense.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {expense.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {expense.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditForm(expense)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => openDeleteConfirm(expense.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
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

        {/* Summary footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing{" "}
              <span className="font-medium">{filteredExpenses.length}</span> of{" "}
              <span className="font-medium">{filteredExpenses.length}</span>{" "}
              expenses
            </div>
            <div className="text-sm font-medium text-gray-900">
              Total: 12.30
            </div>
          </div>
        </div>
      </div>

      {/* Add Expense Form Modal */}
      {isAddFormOpen && (
        <ExpenseForm
          categories={categoryData}
          users={usersData}
          onSubmit={handleAddExpense}
          onCancel={() => setIsAddFormOpen(false)}
          title="Add New Expense"
        />
      )}

      {/* Edit Expense Form Modal */}
      {isEditFormOpen && currentExpense && (
        <ExpenseForm
          categories={categoryData}
          users={usersData}
          expense={currentExpense}
          onSubmit={handleUpdateExpense}
          onCancel={() => {
            setIsEditFormOpen(false);
            setCurrentExpense(null);
          }}
          title="Edit Expense"
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <DeleteConfirmation
          onConfirm={handleDeleteExpense}
          onCancel={() => {
            setIsDeleteConfirmOpen(false);
            setExpenseToDelete(null);
          }}
        />
      )}
    </div>
  );
}
