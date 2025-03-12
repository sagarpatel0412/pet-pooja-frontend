import type React from "react";

import { useState, useEffect } from "react";

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

interface ExpenseFormProps {
  expense?: Expense;
  users: { id: number; name: string }[];
  categories: { id: number; name: string }[];
  onSubmit: (expense: any) => void;
  onCancel: () => void;
  title: string;
}

export default function ExpenseForm({
  expense,
  users,
  categories,
  onSubmit,
  onCancel,
  title,
}: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    user_id: 0,
    category_id: 0,
    amount: "",
    date: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Initialize form with expense data if editing
  useEffect(() => {
    if (expense) {
      setFormData({
        user_id: expense.user_id,
        category_id: expense.category_id,
        amount: expense.amount.toString(),
        date: expense.date,
        description: expense.description,
      });
    }
  }, [expense]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when field is changed
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.user_id) {
      newErrors.user_id = "User is required";
    }

    if (!formData.category_id) {
      newErrors.category_id = "Category is required";
    }

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(Number(formData.amount)) || Number(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const submittedData = {
        ...formData,
        user_id: Number(formData.user_id),
        category_id: Number(formData.category_id),
        amount: Number(formData.amount),
      };

      if (expense) {
        onSubmit({
          ...submittedData,
          id: expense.id,
          created_at: expense.created_at,
        });
      } else {
        onSubmit(submittedData);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          {/* User Select */}
          <div className="mb-4">
            <label
              htmlFor="user_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              User
            </label>
            <select
              id="user_id"
              name="user_id"
              value={formData.user_id}
              onChange={handleChange}
              className={`w-full rounded-md border ${
                errors.user_id ? "border-red-500" : "border-gray-300"
              } shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            >
              <option value={0}>Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {errors.user_id && (
              <p className="mt-1 text-sm text-red-600">{errors.user_id}</p>
            )}
          </div>

          {/* Category Select */}
          <div className="mb-4">
            <label
              htmlFor="category_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="category_id"
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className={`w-full rounded-md border ${
                errors.category_id ? "border-red-500" : "border-gray-300"
              } shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            >
              <option value={0}>Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category_id && (
              <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
            )}
          </div>

          {/* Amount Input */}
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full rounded-md border ${
                  errors.amount ? "border-red-500" : "border-gray-300"
                } shadow-sm py-2 pl-7 pr-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
            </div>
            {errors.amount && (
              <p className="mt-1 text-sm text-red-600">{errors.amount}</p>
            )}
          </div>

          {/* Date Input */}
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full rounded-md border ${
                errors.date ? "border-red-500" : "border-gray-300"
              } shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          {/* Description Textarea */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter expense description"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg"
            >
              {expense ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
