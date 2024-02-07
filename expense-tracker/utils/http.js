import axios from "axios";

const URL = "https://react-native-course-68bad-default-rtdb.firebaseio.com";
export const storeExpenseData = async (expense) => {
  const response = await axios.post(URL + "/expenses.json", expense);
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await axios.get(URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const obj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(obj);
  }

  return expenses;
};

export const updateExpenseData = (id, expenseData) => {
  return axios.put(URL + `/expenses/${id}.json`, expenseData);
};

export const deleteExpenseData = (id) => {
  return axios.delete(URL + `/expenses/${id}.json`);
};
