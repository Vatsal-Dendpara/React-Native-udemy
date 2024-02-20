import { StatusBar } from "expo-status-bar";
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    async function configurePushNotification() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        return Alert.alert(
          "Permission Required",
          "Push Notification need the appropriate permissions."
        );
      }
      const tokenData = await Notifications.getExpoPushTokenAsync({
        projectId: "49139932-9625-4b2e-bc96-87046270d016",
      });
      console.log(tokenData);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotification();
  }, []);
  useEffect(() => {
    const notification = Notifications.addNotificationReceivedListener((n) => {
      console.log(n);
    });

    const receivedNotification =
      Notifications.addNotificationResponseReceivedListener((n) => {
        console.log(n);
      });

    return () => {
      notification.remove();
      receivedNotification.remove();
    };
  }, []);
  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Local Notification",
        body: "this is body of notification",
        data: {
          userName: "ABcd",
        },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[9GO1M0D-H2JP-E6i2JjIpk]",
        title: "Test - send from a device",
        body: "This is a test",
      }),
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <Button
        title="Send Push Notification"
        onPress={sendPushNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
