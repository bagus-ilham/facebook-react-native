import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import VectorIcon from "../utils/VectorIcons";
import { Colors } from "../utils/Colors";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const Header = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync('accessToken');
      
      navigation.navigate("Login");
    } catch (error) {
      console.error('Gagal melakukan logout', error);
    }
  };

  const handleSearch = () => {
    navigation.navigate("Search");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/phasebook.png")}
        style={styles.fbLogoStyle}
      />
      <View style={styles.headerIcons}>
        <View style={styles.searchBg}>
          <TouchableOpacity onPress={handleSearch} style={styles.searchBg}>
          <VectorIcon
            name="search"
            type="FontAwesome5"
            size={19}
            color={Colors.grey}
          />
          </TouchableOpacity>
        </View>
        <View style={styles.searchBg}>
          <TouchableOpacity onPress={handleLogout} style={styles.searchBg}>
            <VectorIcon
              name="outdent"
              type="Fontisto"
              size={22}
              color={Colors.grey}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fbLogoStyle: {
    marginTop: 8,
    height: 25,
    width: 130,
  },
  searchBg: {
    backgroundColor: Colors.lightgrey,
    height: 35,
    width: 35,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerIcons: {
    flexDirection: "row",
  },
});

export default Header;
