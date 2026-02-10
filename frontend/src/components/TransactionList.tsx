import React, { useState } from "react";
import api from "../api/api";
import TransactionForm from "./TransactionForm";

interface Transaction {
  id: number;
  amount: string;
  transaction_type: "INCOME" | "EXPENSE";
  date: string;
  description: string;
  category_name: string;
  category: number;
}

interface TransactionListProps {
  transactions: Transaction[];
  onTransactionUpdated: () => void;
}

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onTransactionUpdated,
}) => {
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await api.delete(`transactions/${id}/`);
        onTransactionUpdated();
      } catch (error) {
        console.error("Error deleting transaction", error);
      }
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {editingTransaction && (
        <div className="p-4 border-b">
          <TransactionForm
            initialData={editingTransaction}
            onTransactionAdded={() => {
              setEditingTransaction(null);
              onTransactionUpdated();
            }}
            onCancel={() => setEditingTransaction(null)}
          />
        </div>
      )}
      <ul className="divide-y divide-gray-200">
        {transactions.length === 0 ? (
          <li className="px-6 py-4 text-center text-gray-500">
            No transactions found.
          </li>
        ) : (
          transactions.map((transaction) => (
            <li
              key={transaction.id}
              className="px-6 py-4 hover:bg-gray-50 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center">
                  <span
                    className={`text-sm font-bold mr-2 ${transaction.transaction_type === "INCOME" ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.transaction_type === "INCOME" ? "+" : "-"}$
                    {transaction.amount}
                  </span>
                  <span className="text-sm text-gray-900 font-medium">
                    {transaction.description}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {transaction.date} •{" "}
                  {transaction.category_name || "Uncategorized"}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingTransaction(transaction)}
                  className="text-indigo-600 hover:text-indigo-900 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className="text-red-600 hover:text-red-900 text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TransactionList;
