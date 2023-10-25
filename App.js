import { useEffect, useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/color";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

const customFonts = {
  "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  useEffect(() => {
    (async () => {
      await Font.loadAsync(customFonts);
      if (fontLoaded) {
        await SplashScreen.hideAsync();
      }
      setFontLoaded(true);
    })();
  }, [fontLoaded]);

  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function StartNewGameHandler() {
    setGameIsOver(false);
    setUserNumber(null);
    setGuessRounds(0);
  }

  if (!fontLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.Primary700, Colors.accent500]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require("./assets/images/background.png")}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>
            {gameIsOver ? (
              <GameOverScreen
                userNumber={userNumber}
                roundsNumber={guessRounds}
                onStartNewGame={StartNewGameHandler}
              />
            ) : userNumber ? (
              <GameScreen
                userNumber={userNumber}
                onGameOver={gameOverHandler}
              />
            ) : (
              <StartGameScreen onPickNumber={pickedNumberHandler} />
            )}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },

  backgroundImage: {
    opacity: 0.15,
  },
});
