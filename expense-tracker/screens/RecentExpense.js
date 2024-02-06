import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpenseContext } from "../context/expenseContext";
import { useContext } from "react";
import { getDateMinusDays } from "../utils/dates";

const RecentExpense = () => {
  const { expenses } = useContext(ExpenseContext);

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
