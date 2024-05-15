import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import NavigationHeader from "./src/components/NavigationHeader";
import { ApolloProvider } from "@apollo/client";
import client from "./src/configs/apoloClient";
import LoginContext from "./src/context/globalContext";
import Detail from "./src/screens/Detail";
import SearchScreen from "./src/screens/Search";
import ProfileScreen from "./src/screens/Profile";

const Stack = createNativeStackNavigator();

function App() {
  const { login, setLogin } = useState(true);
  return (
    <LoginContext.Provider
      value={{
        login,
        setLogin,
      }}
    >
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            {/* {login ? (
              <>
              <Stack.Screen name="PhaseBook" component={NavigationHeader} />
              </>
            ) : (
              <>
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Login"
                  component={Login}
                />
                <Stack.Screen
                  options={{ headerShown: false }}
                  name="Register"
                  component={Register}
                />
              </>
            )} */}
            
          <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
          <Stack.Screen name="PhaseBook" component={NavigationHeader} />
          <Stack.Screen options={{headerShown: false}} name="Register" component={Register} />
          <Stack.Screen name="PostDetail" component={Detail} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </LoginContext.Provider>
  );
}

export default App;
