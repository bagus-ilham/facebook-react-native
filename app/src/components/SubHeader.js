import { View, TextInput, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../utils/Colors";
import FriendStoryImg6 from "../../assets/img6.jpg";
import { ADD_POST } from "../mutations/post";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

const SubHeader = () => {
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [tags, setTags] = useState("");
  const navigation = useNavigation();
  const [addPostMutation, { data, loading, error }] = useMutation(ADD_POST);

  const handleAddPost = () => {
    console.log("mausk")
    const addPostWithHeaders = async () => {
      try {
        const accessToken = await SecureStore.getItemAsync("accessToken");
  
        const result = await addPostMutation({
          variables: { content, tags, imgUrl },
          context: {
            headers: {
              authentication: accessToken,
            },
          },
        });
        setContent("")
        setImgUrl("")
        setTags("")

        console.log("New Post added:", result.data.AddPost);
      } catch (error) {
        console.error("Error adding post:", error.message);
      }
    };
  
    addPostWithHeaders();
  };

  useEffect(() => {
    
  }, [content, tags, imgUrl])
  
  return (
    <View style={styles.container}>
      <View style={styles.containerBox}>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Write something here..."
            value={content}
            onChangeText={(value) => setContent(value)}
            style={styles.inputStyle}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="If tou want to input an image"
            value={imgUrl}
            onChangeText={(value) => setImgUrl(value)}
            style={styles.inputStyle}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="If tou want to input a tag"
            value={tags}
            onChangeText={(value) => setTags(value)}
            style={styles.inputStyle}
          />
        </View>
      </View>
      <View style={styles.containerSend}>
        <Image source={FriendStoryImg6} style={styles.profileStyle} />
        <TouchableOpacity>
        <Text onPress={handleAddPost}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  containerBox: {
    flex: 3,
    flexDirection: "column",
    backgroundColor: Colors.white,
    alignItems: "center",
  },
  containerSend: {
    flex: 1,
    height: 120,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: Colors.borderGrey,
    borderRadius: 30,
    paddingHorizontal: 20,
    width: "100%",
    paddingVertical: 8,
    marginBottom: 10,
  },
  inputStyle: {
    fontSize: 16,
    color: Colors.grey,
  },
});

export default SubHeader;
