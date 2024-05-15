import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { FIND_USER_BY_USERNAME } from "../queries/user";
import FriendStoryImg4  from '../../assets/img4.jpg'
import { useNavigation } from "@react-navigation/native";

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const accessToken = SecureStore.getItem("accessToken");

  const { data, loading, error } = useQuery(FIND_USER_BY_USERNAME, {
    variables: { name: searchQuery },
    context: {
      headers: {
        authentication: accessToken,
      },
    },
  });

  // console.log(data, loading, error);

  const handleSearch = async () => {};

  const handleProfile = (dataId) => {
    console.log(dataId, "masuk")
    navigation.navigate("Profile" , dataId)
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for people"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <View style={styles.buttonContainer}>
        <Button title="Search" onPress={handleSearch} />
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>No User Found</Text>
      ) : (
        <View style={styles.card}>
          <TouchableOpacity onPress={()=> handleProfile(data.SearchUser)}>
          <Image source={FriendStoryImg4} style={styles.cardImage} />
          <Text style={styles.cardName}>{data.SearchUser.name}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  flatList: {
    flex: 1,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SearchScreen;
