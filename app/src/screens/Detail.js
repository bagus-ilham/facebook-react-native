import React, { useEffect, useState } from "react";
import PostHeader from "../components/PostHeader";
import PostFooter from "../components/PostFooter";
import Comments from "../components/Comments";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { GET_POSTS_BY_ID_QUERY } from "../queries/post";
import { ActivityIndicator, Text } from "react-native";
import { Colors } from "../utils/Colors";
import { useRoute } from '@react-navigation/native';
import AddComment from "../components/AddComment";

const Detail = () => {
  const route = useRoute();
  const { itemId } = route.params;
  const navigation = useNavigation();
  const [dataFetch, setDataFetch] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log(dataFetch)
  const accessToken = SecureStore.getItem("accessToken");
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_POSTS_BY_ID_QUERY, {
    variables: { id: itemId },
    context: {
      headers: {
        authentication: accessToken,
      },
    },
  });

  useEffect(() => {
    if (queryError) {
      setError(queryError.message);
    }
    if (data) {
      setDataFetch(data.GetPostId);
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
    <>
          <PostHeader data={dataFetch} />
          <PostFooter data={dataFetch}/>
          <AddComment data={dataFetch}/>
          <Comments data={dataFetch?.comments}/>
    </>
  );
};

export default Detail;
