import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Home = ({THEME}) => {
  return (
    <View style={[styles.view]}>
      <Text style={[styles.text]}>Home man yah</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'red',
  },
  text: {
    color: 'red',
  },
});
