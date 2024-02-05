import { FlatList, StyleSheet, Text, View } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList";

const MealsOverVIewScreen = ({ route, navigation }) => {
  const id = route.params.categoryId;

  const displayedMeals = MEALS.filter((meal) => {
    return meal.categoryIds.includes(id);
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((meal) => meal.id === id).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [navigation, id]);

  return <MealsList items={displayedMeals} />;
};

export default MealsOverVIewScreen;
