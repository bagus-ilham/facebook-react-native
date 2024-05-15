import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { ADD_COMMENT } from "../mutations/post";

const AddComment = (dataFetch) => {
  const [commentContent, setCommentContent] = useState("");
  const [addComment, { data, loading, error }] = useMutation(ADD_COMMENT);
  const accessToken = SecureStore.getItem("accessToken");
    // console.log(data, loading, error)
  const handleComment  = () => {
    if (commentContent.trim() !== "") {
      addComment({
        variables: { content: commentContent, postId: dataFetch.data._id },
        context: {
          headers: {
            authentication: accessToken,
          },
        },
      })
        .then((data) => {
          console.log(data);
          setCommentContent("");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.commentInput}
        placeholder="Add a comment"
        onChangeText={(text) => setCommentContent(text)}
        value={commentContent}
      />
      <TouchableOpacity onPress={handleComment}>
        <Text style={styles.postButton}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
  },
  postButton: {
    color: "#007BFF",
    marginLeft: 10,
    fontSize: 16,
  },
});

export default AddComment;
