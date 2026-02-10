import { useEffect, useState } from "react";
import api from "../api/api";
import { logout } from "../auth/auth";
import { useNavigate } from "react-router-dom";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

// Types (Ideally move to a types file)
interface Transaction {
  id: number;
  amount: string;
  transaction_type: "INCOME" | "EXPENSE";
  date: string;
  description: string;
  category_name: string;
  category: number;
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [showAddForm, setShowAddForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await api.get("transactions/");
      setTransactions(response.data);
      calculateSummary(response.data);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const calculateSummary = (data: Transaction[]) => {
    let income = 0;
    let expense = 0;
    data.forEach((t) => {
      if (t.transaction_type === "INCOME") income += parseFloat(t.amount);
      else expense += parseFloat(t.amount);
    });
    setSummary({ income, expense, balance: income - expense });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                Clarity
              </h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 w-full">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">Total Balance</p>
            <p
              className={`text-2xl font-bold mt-2 ${summary.balance >= 0 ? "text-gray-900" : "text-red-600"}`}
            >
              ${summary.balance.toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">Total Income</p>
            <p className="text-2xl font-bold mt-2 text-green-600">
              +${summary.income.toFixed(2)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-sm font-medium text-gray-500">Total Expenses</p>
            <p className="text-2xl font-bold mt-2 text-red-600">
              -${summary.expense.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Transactions</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {showAddForm ? "Close Form" : "Add Transaction"}
          </button>
        </div>

        {showAddForm && (
          <TransactionForm
            onTransactionAdded={() => {
              fetchTransactions();
              setShowAddForm(false);
            }}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        <TransactionList
          transactions={transactions}
          onTransactionUpdated={fetchTransactions}
        />
      </main>
    </div>
  );
};

export default Dashboard;
