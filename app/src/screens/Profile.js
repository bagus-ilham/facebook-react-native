import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../utils/Colors";
import { useRoute } from "@react-navigation/native";
import { useQuery, useMutation } from "@apollo/client";
import { FIND_USER_BY_ID } from "../queries/user";
import { FOLLOW } from "../mutations/follow";
import * as SecureStore from "expo-secure-store";

const ProfileScreen = () => {
  const route = useRoute();
  const userId = route.params;
  const accessToken = SecureStore.getItem("accessToken");


  const { loading, error, data } = useQuery(FIND_USER_BY_ID, {
    variables: { id: userId._id },
    context: {
      headers: {
        authentication: accessToken,
      },
    },
  });

  const [Follows] = useMutation(FOLLOW);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error occurred. Please try again later.</Text>;
  }

  const profileData = data?.GetUserById;
  console.log(userId, "ini uid")
  console.log(profileData, "ini data olah")

  const handleFollow = async () => {
    try {
      const response = await Follows({
        variables: { followingId: profileData._id },
        context: {
          headers: {
            authentication: accessToken,
          },
        },
      });
      console.log("Successfully followed user", response);
    } catch (error) {
      console.error("Error following user", error);
      // Handle error
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: profileData.profileImage }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{profileData.name}</Text>
        <Text style={styles.profileEmail}>{profileData.email}</Text>
      </View>
      <View style={styles.profileStats}>
        <View style={styles.statsItem}>
          <Text style={styles.statsCount}>{profileData.userFollower.length}</Text>
          <Text style={styles.statsLabel}>Followers</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsCount}>{profileData.userFollowing.length}</Text>
          <Text style={styles.statsLabel}>Following</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleFollow}>
        <Text style={styles.followButton}>Follow</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  profileHeader: {
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  profileEmail: {
    color: Colors.grey,
    marginBottom: 16,
  },
  profileStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statsItem: {
    alignItems: "center",
  },
  statsCount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statsLabel: {
    color: Colors.grey,
  },
  followButton: {
    color: Colors.blue,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 8,
  },
});

export default ProfileScreen;
