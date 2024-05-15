import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const Comments = ({data}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View style={styles.viewBox}>
            <Text style={styles.boxName}>{item.username}</Text>
            <Text style={styles.boxContent}>{item.content}</Text>
          </View>
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewBox: {
        padding: 15,
        borderColor: '#ececec',
        borderWidth: 3,
    },
    boxName: {
        fontSize: 20,
        paddingBottom: 8
    },
    boxContent: {
        fontSize: 15,
        paddingLeft: 15,
    }
})

export default Comments;
