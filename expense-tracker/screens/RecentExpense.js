import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpenseContext } from "../context/expenseContext";
import { useContext, useEffect, useState } from "react";
import { getDateMinusDays } from "../utils/dates";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay";

const RecentExpense = () => {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const data = await fetchExpenses();
        setExpenses(data);
      } catch (error) {
        setError("could not fetch expense!");
      }
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  if (isFetching) {
    return <LoadingOverlay />;
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onPress={() => setError(null)} />;
  }

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensePeriod="Last 7 Days"
      fallbackText="No expenses found."
    />
  );
};

export default RecentExpense;
