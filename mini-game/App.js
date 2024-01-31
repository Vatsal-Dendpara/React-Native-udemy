import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import GameStartScreen from "./screens/GameStartScreen";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState("");

  const [isGameOver, setIsGameOver] = useState(false);

  const [guessRoundsCount, setGuessRoundsCount] = useState(0);

  const pickedNumberHandler = (number) => {
    setUserNumber(number);
  };

  const onStartNewGame = () => {
    setUserNumber(null);
    setIsGameOver(false);
  };

  const onGameOver = (guessRoundsCount) => {
    setIsGameOver(true);
    setGuessRoundsCount(guessRoundsCount);
  };

  let screen = <GameStartScreen onPickNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={onGameOver} />;
  }

  if (isGameOver) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        onStartNewGame={onStartNewGame}
        rounds={guessRoundsCount}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
