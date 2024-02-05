import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FavoriteMealContext } from "../store/context/favoriteMeals";
import { MEALS } from "../data/dummy-data";
import MealsList from "../components/MealsList";
import { useSelector } from "react-redux";

const FavouriteScreen = () => {
  //context
  // const { ids } = useContext(FavoriteMealContext);

  //context
  // const favoriteMeals = MEALS.filter((meal) => ids.includes(meal.id));

  //redux
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealIds.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          You have no favorite meals yet. Start adding some!
        </Text>
      </View>
    );
  }

  return <MealsList items={favoriteMeals} />;
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
