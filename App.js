import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import NotesMabel from "./src/activities/NotesMabel";
import Loading from "./src/components/Loading";

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Loading />}>
          <View style={styles.container}>
            <Stack.Navigator
              initialRouteName="NotesMabel"
              screenOptions={{
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: "#f8d533",
                },
                headerTintColor: "#1f1f1f",
                headerTitleStyle: {
                  fontWeight: "bold",
                  fontSize: 25,
                },
              }}>
              <Stack.Screen
                name="NotesMabel"
                component={NotesMabel}
                options={{
                  title: "Notes Mabel",
                }}
              />
            </Stack.Navigator>
            <StatusBar style="auto" />
          </View>
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
