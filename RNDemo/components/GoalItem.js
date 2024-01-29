import { Pressable, StyleSheet, Text, View } from "react-native";

const GoalItem = (props) => {
  const onDeleteHandler = ()=>{
    props.onDelete(props.data.id);
  }
    return (
      <Pressable onPress={onDeleteHandler}>
        <View style={styles.goalItem}>
          <Text  style={styles.goalText}>{props.data.text}</Text>
        </View>
        </Pressable>
    );
}

export default GoalItem;

const styles = StyleSheet.create({
    goalItem:{
        margin:8,
        padding:8,
        borderRadius:5,
        backgroundColor:'chocolate'
      },
      goalText:{
        color:'white'
      }
})