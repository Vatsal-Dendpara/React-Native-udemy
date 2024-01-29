import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [lisOfGoals, setListOfGoals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleAddGoal = (textInput) => {
    setListOfGoals((currentGoal) => [
      ...currentGoal,
      { text: textInput, id: Math.random().toString() },
    ]);
    setIsModalVisible(false);
  };

  const deleteItemHandler = (id) => {
    setListOfGoals((currentGoal) => {
      return currentGoal.filter((goal) => goal.id!== id);
    });
  };

  const handleAddNewGoalHandler = ()=>{
    setIsModalVisible(true);
  }

  const closeModalHandler = ()=>{
    setIsModalVisible(false);
  }

  return (
    <View style={styles.appContainer}>
      <Button title="Add New Goal" color="#103103" onPress={handleAddNewGoalHandler} />
      <GoalInput isModalVisible={isModalVisible} onCancel={closeModalHandler} onAddGoal={handleAddGoal} />
      <View style={styles.goalsContainer}>
        <FlatList
          alwaysBounceVertical={false}
          data={lisOfGoals}
          renderItem={(itemData) => {
            return <GoalItem data={itemData.item} onDelete={deleteItemHandler} />;
          }}
          keyExtractor={(item)=>{
            return item.id;
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});
