import {
  View,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../utils/Colors";
import PostHeader from "./PostHeader";
import PostFooter from "./PostFooter";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { GET_POSTS_QUERY } from "../queries/post";

const Post = () => {
  const navigation = useNavigation();
  const [dataFetch, setDataFetch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const accessToken = SecureStore.getItem("accessToken");
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_POSTS_QUERY, {
    context: {
      headers: {
        authentication: accessToken,
      },
    },
  });

  const handleMove = (itemId) => {
    navigation.navigate("PostDetail", { itemId });
  };

  useEffect(() => {
    if (queryError) {
      setError(queryError.message);
    }
    if (data) {
      setDataFetch(data.GetPost);
    }
    setLoading(queryLoading);
  }, [data, dataFetch, queryError, queryLoading]);

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.primary} />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }
  return (
    <View style={styles.postContainer}>
      <FlatList
        data={dataFetch || []}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View key={item._id}>
            <TouchableOpacity onPress={()=>handleMove(item._id)}>
              <PostHeader data={item} />
              {item.imgUrl === "" ? (
                <></>
              ) : (
                <Image source={{ uri: item.imgUrl }} style={styles.postImg} />
              )}
            </TouchableOpacity>
            <PostFooter data={item} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: Colors.white,
    marginTop: 8,
  },
  postImg: {
    width: "100%",
    height: 250,
  },
});

export default Post;
