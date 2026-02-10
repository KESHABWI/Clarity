import React, { useState, useEffect } from "react";
import api from "../api/api";

interface Category {
  id: number;
  name: string;
}

interface TransactionFormProps {
  onTransactionAdded: () => void;
  initialData?: any;
  onCancel?: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  onTransactionAdded,
  initialData,
  onCancel,
}) => {
  const [amount, setAmount] = useState(initialData?.amount || "");
  const [type, setType] = useState(initialData?.transaction_type || "EXPENSE");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [date, setDate] = useState(
    initialData?.date || new Date().toISOString().split("T")[0],
  );
  const [categoryId, setCategoryId] = useState(initialData?.category || "");
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  // AI Suggestion logic
  useEffect(() => {
    if (description.length > 3 && !categoryId && !initialData) {
      const timer = setTimeout(() => {
        getAiSuggestion();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [description]);

  const getAiSuggestion = async () => {
    setIsSuggesting(true);
    try {
      const response = await api.post("transactions/suggest-category/", {
        description,
      });
      const suggestedName = response.data.category;

      if (suggestedName) {
        // Try to find a match in existing categories
        const match = categories.find(
          (c) => c.name.toLowerCase() === suggestedName.toLowerCase(),
        );
        if (match) {
          setCategoryId(match.id);
        } else {
          // If no match, we could offer to create it or just show a small tip
          console.log("AI suggested a new category:", suggestedName);
        }
      }
    } catch (error) {
      console.error("AI suggestion failed", error);
    } finally {
      setIsSuggesting(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      amount,
      transaction_type: type,
      description,
      date,
      category: categoryId,
    };

    try {
      if (initialData) {
        await api.put(`transactions/${initialData.id}/`, data);
      } else {
        await api.post("transactions/", data);
      }
      onTransactionAdded();
      resetForm();
    } catch (error) {
      console.error("Error saving transaction", error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      const response = await api.post("categories/", { name: newCategory });
      setCategories([...categories, response.data]);
      setCategoryId(response.data.id);
      setNewCategory("");
      setIsAddingCategory(false);
    } catch (error) {
      console.error("Error creating category", error);
    }
  };

  const resetForm = () => {
    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setCategoryId("");
    if (onCancel) onCancel();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h3 className="text-lg font-bold mb-4">
        {initialData ? "Edit Transaction" : "Add Transaction"}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Amount
            </label>
            <input
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            {isAddingCategory ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  placeholder="New category name"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleCreateCategory}
                  className="bg-green-500 text-white px-3 rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => setIsAddingCategory(true)}
                  className="text-indigo-600 text-sm hover:underline whitespace-nowrap"
                >
                  + New
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="relative">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {isSuggesting && (
            <span className="absolute right-3 top-9 text-xs text-indigo-500 animate-pulse">
              AI Suggesting...
            </span>
          )}
        </div>

        <div className="flex justify-end gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200"
          >
            {initialData ? "Update Transaction" : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
