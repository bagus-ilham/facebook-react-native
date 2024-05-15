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
import { useNavigation } from "@react-navigation/native";
import { REGISTER } from "../mutations/user";
import { useMutation } from "@apollo/client";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [registerFunction, { data, loading, error }] = useMutation(REGISTER);
  const navigation = useNavigation();

  const handleRegister = (event) => {
    registerFunction({ variables: { name, username, password, email } })
      .then(async (data) => {
        console.log(data);
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLogin = (event) => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.logoStyle}
        />
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(value) => setName(value)}
          style={styles.inputBox}
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(value) => setUsername(value)}
          style={styles.inputBox}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(value) => setEmail(value)}
          style={styles.inputBox}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          style={styles.inputBox}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleRegister} style={styles.loginButton}>
          <Text style={styles.login}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newAccount} onPress={onLogin}>
          <Text style={styles.newAccountText}>Already have an account?</Text>
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

export default Register;
