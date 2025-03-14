import { useState, useEffect } from "react";
import ExpenseForm from "../../components/expense-form";
import FilterBar from "../../components/filter-bar";
import DeleteConfirmation from "../../components/delete-confirmation";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  expenseApi,
  getUsersApi,
  getCategoriesApi,
  deleteExpenseApi,
} from "../../features/api";
import moment from "moment";
import { Category, Expense, User } from "../../features/interface";

export default function Expenses() {
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
    queryFn: () => expenseApi(filters),
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

  const { mutate: deleteExpenseMutate, error } = useMutation({
    mutationFn: deleteExpenseApi,
    mutationKey: ["deleteExpense"],
    onSuccess: (data: any) => {
      if (data) {
        expenseRefetch();
        categoryRefetch();
        usersRefetch();
      }
    },
    onError: (err: Error) => {
      console.error("Login error", err);
    },
  });

  useEffect(() => {
    if (typeof expense_data !== "undefined") {
      setFilteredExpenses(expense_data.data);
    }

    if (typeof users_data !== "undefined") {
      setUsersData(users_data.data);
    }

    if (typeof category_data !== "undefined") {
      setCategoryData(category_data.data);
    }
  }, [expense_data, category_data, users_data]);

  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);

  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<number | null>(null);

  const [filters, setFilters] = useState({
    category_id: "",
    user_id: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    expenseRefetch();
  }, [filters]);

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

  const handleDeleteExpense = () => {
    if (expenseToDelete !== null) {
      deleteExpenseMutate({ id: expenseToDelete });
      setIsDeleteConfirmOpen(false);
      setExpenseToDelete(null);
    }
  };

  const openEditForm = (expense: Expense) => {
    setCurrentExpense(expense);
    setIsEditFormOpen(true);
  };

  const openDeleteConfirm = (id: number) => {
    setExpenseToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  if (expenseisLoading || usersisLoading || categoryisLoading) {
    return <div>loading</div>;
  }

  if (expenseisError || usersisError || categoryisError) {
    return <div>loading</div>;
  }

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

      {isAddFormOpen && (
        <ExpenseForm
          categories={categoryData}
          users={usersData}
          onSubmit={handleAddExpense}
          isOpen={isAddFormOpen}
          onClose={() => setIsAddFormOpen(false)}
          title="Add New Expense"
          isEdit={false}
          expenseRefetch={expenseRefetch}
          userRefetch={usersRefetch}
          categoryRefetch={categoryRefetch}
        />
      )}

      {isEditFormOpen && currentExpense && (
        <ExpenseForm
          categories={categoryData}
          users={usersData}
          expense={currentExpense}
          onSubmit={handleUpdateExpense}
          isOpen={isEditFormOpen}
          onClose={() => {
            setIsEditFormOpen(false);
            setCurrentExpense(null);
          }}
          title="Edit Expense"
          isEdit={true}
          expenseRefetch={expenseRefetch}
          userRefetch={usersRefetch}
          categoryRefetch={categoryRefetch}
        />
      )}

      {isDeleteConfirmOpen && (
        <DeleteConfirmation
          onConfirm={handleDeleteExpense}
          isOpen={isDeleteConfirmOpen}
          onClose={() => {
            setIsDeleteConfirmOpen(false);
            setExpenseToDelete(null);
          }}
          expenseRefetch={expenseRefetch}
          userRefetch={usersRefetch}
          categoryRefetch={categoryRefetch}
        />
      )}
    </div>
  );
}
