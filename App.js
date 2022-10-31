import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { store, persistor } from "./store";
import Notes from "./src/activities/Notes";
import Loading from "./src/components/Loading";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <View style={styles.container}>
            <Stack.Navigator
              initialRouteName="Notas"
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
                component={Notes}
                name="Notas"
                options={{
                  title: "Notas",
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
