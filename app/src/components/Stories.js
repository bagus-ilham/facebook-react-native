import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors} from '../utils/Colors';
import CreateStory from './CreateStory';
import FriendStories from './FriendStory';

const Stories = () => {
  return (
    <View>
    <ScrollView
      horizontal
      style={styles.storiesContainer}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}>
      <CreateStory />
      <FriendStories />
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  storiesContainer: {
    backgroundColor: Colors.white,
    marginTop: 8,
    padding: 15,
  },
  contentContainerStyle: {
    paddingRight: 30,
  },
});

export default Stories;