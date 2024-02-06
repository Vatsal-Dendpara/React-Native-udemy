import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { useContext } from "react";
import { ExpenseContext } from "../context/expenseContext";

const AllExpenses = () => {
  const { expenses } = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      expenses={expenses}
      expensePeriod="Total"
      fallbackText="No Expenses registered for last 7 days"
    />
  );
};

export default AllExpenses;
