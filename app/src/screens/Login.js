import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../utils/Colors";
import * as SecureStore from "expo-secure-store";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { LOGIN } from "../mutations/user";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [loginFunction, { data, loading, error }] = useMutation(LOGIN);

  const handleLogin = (event) => {
    loginFunction({ variables: { username, password } })
      .then(async (data) => {
        console.log(data)
        await SecureStore.setItemAsync(
          "accessToken",
          data.data.Login.accessToken
        );
        const check = await SecureStore.getItemAsync("accessToken");
        console.log(check);
        navigation.navigate("PhaseBook");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onCreateAccount = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logoStyle}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(value) => setUsername(value)}
          style={styles.inputBox}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          style={styles.inputBox}
          secureTextEntry
        />
        <TouchableOpacity
          onPress={() => {
            handleLogin();
          }}
          style={styles.loginButton}
        >
          <Text style={styles.login}>Log in</Text>
        </TouchableOpacity>
        <Text style={styles.forgotPass}>Forgot Password?</Text>
        <TouchableOpacity style={styles.newAccount} onPress={onCreateAccount}>
          <Text style={styles.newAccountText}>Create new account</Text>
        </TouchableOpacity>
        <Image
          source={require("../../assets/meta-logo.png")}
          style={styles.metaLogoStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoStyle: {
    height: 50,
    width: 50,
    marginVertical: "20%",
  },
  container: {
    padding: 16,
  },
  subContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    padding: 10,
    borderRadius: 12,
    width: "95%",
    marginTop: 12,
  },
  loginButton: {
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 20,
    width: "95%",
    alignItems: "center",
    marginTop: 12,
  },
  login: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "500",
  },
  forgotPass: {
    color: Colors.grey,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 15,
  },
  newAccount: {
    borderColor: Colors.primaryColor,
    borderWidth: 1,
    padding: 10,
    borderRadius: 18,
    width: "95%",
    alignItems: "center",
    marginTop: "35%",
  },
  newAccountText: {
    color: Colors.primaryColor,
    fontSize: 14,
    fontWeight: "400",
  },
  metaLogoStyle: {
    height: 15,
    width: 70,
    marginTop: 15,
  },
});

export default Login;
