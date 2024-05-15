import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Like from "../../assets/like.jpeg";
import Shock from "../../assets/shock.jpeg";
import Heart from "../../assets/heart.jpeg";
import { Colors } from "../utils/Colors";
import VectorIcon from "../utils/VectorIcons";
import * as SecureStore from "expo-secure-store";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { LIKE_POST } from "../mutations/post";

const PostFooter = ({ data }) => {
  const postId = data?._id
  const likes = data?.likes?.length;
  const comments = data?.comments?.length;
  const navigation = useNavigation();
  const [likePost, { data: dataLikes, loading, error }] =
    useMutation(LIKE_POST);
  const accessToken = SecureStore.getItem("accessToken");

  const handleLike = (event) => {
    likePost({
      variables: { postId : postId },
      context: {
        headers: {
          authentication: accessToken,
        },
      }
    })
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleComment = (event) => {
  };

  return (
    <View style={styles.postFotterContainer}>
      <View style={styles.footerReactionSec}>
        <View style={styles.row}>
          <Image source={Like} style={styles.reactionIcon} />
          <Image source={Shock} style={styles.reactionIcon} />
          <Image source={Heart} style={styles.reactionIcon} />
          <Text style={styles.reactionCount}>{likes}</Text>
        </View>
        <Text style={styles.reactionCount}>{comments} comments</Text>
      </View>
      <View style={styles.userActionSec}>
        <View style={styles.row}>
          <VectorIcon
            name="like2"
            type="AntDesign"
            size={25}
            color={Colors.grey}
            />
            <TouchableOpacity>
          <Text style={styles.reactionCount} onPress={handleLike}>Like</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <VectorIcon
            name="chatbox-outline"
            type="Ionicons"
            size={25}
            color={Colors.grey}
          />
          <Text style={styles.reactionCount} onPress={handleComment}>Comment</Text>
        </View>

        <View style={styles.row}>
          <VectorIcon
            name="arrow-redo-outline"
            type="Ionicons"
            size={25}
            color={Colors.grey}
          />
          <Text style={styles.reactionCount}>Share</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reactionIcon: {
    height: 20,
    width: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  postFotterContainer: {
    padding: 16,
  },
  reactionCount: {
    color: Colors.grey,
    fontSize: 14,
    paddingLeft: 5,
  },
  footerReactionSec: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightgrey,
    paddingBottom: 15,
  },
  userActionSec: {
    marginTop: 15,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default PostFooter;
