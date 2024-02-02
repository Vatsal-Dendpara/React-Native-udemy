import { StyleSheet, Text, View } from "react-native";

const List = ({ data }) => {
  return data.map((dataPoint, index) => (
    <View style={styles.listItem} key={index}>
      <Text style={styles.itemText}>{dataPoint}</Text>
    </View>
  ));
};

export default List;

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    borderWidth: 2,
    backgroundColor: "#00635D",
    borderColor: "#00635D",
  },
  itemText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
