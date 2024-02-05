import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/IconButton";
import { FavoriteMealContext } from "../store/context/favoriteMeals";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

const MealDetailScreen = ({ route, navigation }) => {
  const mealId = route.params.mealId;

  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  // const { ids, addFavoriteMeal, removeFavoriteMeal } =
  //   useContext(FavoriteMealContext);

  const selectedMeal = MEALS.find((meal) => meal.id == mealId);

  //context
  // const isMealFavorite = ids.includes(mealId);

  //redux
  const isMealFavorite = favoriteMealIds.includes(mealId);

  const onIconButtonPressed = () => {
    if (isMealFavorite) {
      //context
      // removeFavoriteMeal(mealId);

      //redux
      dispatch(removeFavorite({ id: mealId }));
    } else {
      //context
      // addFavoriteMeal(mealId);

      //redux
      dispatch(addFavorite({ id: mealId }));
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            name={isMealFavorite ? "star" : "star-outline"}
            color="white"
            onPress={onIconButtonPressed}
          />
        );
      },
    });
  }, [navigation, onIconButtonPressed]);
  return (
    <ScrollView style={styles.rootContainer}>
      <View>
        <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{selectedMeal.title}</Text>
        <MealDetails
          affordability={selectedMeal.affordability}
          complexity={selectedMeal.complexity}
          duration={selectedMeal.duration}
          textStyle={styles.detailText}
        />
        <View style={styles.listOuterContainer}>
          <View style={styles.listContainer}>
            <Subtitle>Ingredients</Subtitle>
            <List data={selectedMeal.ingredients} />
            <Subtitle>Steps</Subtitle>
            <List data={selectedMeal.steps} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MealDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
  },

  //   detailText: {
  //     // color: "white",
  //   },
  listContainer: {
    width: "80%",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  rootContainer: {
    marginBottom: 32,
  },
});
