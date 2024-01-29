import { useState } from "react";
import { Button, Modal, StyleSheet, TextInput, View } from "react-native";

const GoalInput = (props) => {
  const [textInput, setTextInput] = useState("");

  const handleTextChange = (value) => {
    setTextInput(value);
  };

  const handleAddGoal = () => {
    props.onAddGoal(textInput);
    setTextInput("");
  };

  return (
    <Modal animationType="slide" visible={props.isModalVisible}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Your Course Goals.."
          onChangeText={handleTextChange}
          value={textInput}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.button}>
            <Button title="Add Goal" onPress={handleAddGoal} />
          </View>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onCancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
    padding:8
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
    padding: 8,
  },
  buttonsContainer:{
    flexDirection:'row',
    marginTop:16,
  },
  button:{
    width:100,
    marginHorizontal:8,
  }
});
