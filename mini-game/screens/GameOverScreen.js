import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

const GameOverScreen = ({ rounds, userNumber, onStartNewGame }) => {
  const { height, width } = useWindowDimensions();
  let imageSize = 300;

  if (width < 380) {
    imageSize = 150;
  }

  if (height < 485) {
    imageSize = 100;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.rootContainer}>
        <Title>Game is over</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>
        <Text style={styles.summaryText}>
          Your Phone needed <Text style={styles.highlightText}>{rounds}</Text>{" "}
          rounds to guess the{" "}
          <Text style={styles.highlightText}>{userNumber}.</Text>
        </Text>
        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontSize: 20,
    textAlign: "center",
    marginVertical: 22,
  },
  highlightText: {
    fontWeight: "bold",
    color: Colors.primary500,
  },
});
