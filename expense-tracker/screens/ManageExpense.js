import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import IconButton from "../components/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/Button";
import { ExpenseContext } from "../context/expenseContext";
import ExpenseForm from "../components/ExpenseForm";
import {
  deleteExpenseData,
  fetchExpenses,
  storeExpenseData,
  updateExpenseData,
} from "../utils/http";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;
  const { addExpense, deleteExpense, updateExpense, expenses } =
    useContext(ExpenseContext);

  const selectedExpense = expenses.find((expense) => expense.id === expenseId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: expenseId ? "Edit Expense" : "Manage Expense",
    });
  }, [expenseId, navigation]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    try {
      await deleteExpenseData(expenseId);
      deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("could not delete expense - please try again later");
      setIsSubmitting(false);
    }
  };

  const cancelHandler = () => {
    navigation.goBack();
    fetchExpenses();
  };

  const confirmHandler = async (data) => {
    setIsSubmitting(true);
    try {
      if (expenseId) {
        updateExpense(expenseId, data);
        await updateExpenseData(expenseId, data);
      } else {
        const id = await storeExpenseData(data);
        addExpense({ ...data, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("could not save data - please try again later");
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onPress={() => setError(null)} />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={expenseId ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

      {expenseId && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
