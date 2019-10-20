import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text } from 'react-native';

export default function LinksScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rechercher </Text>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  // title: 'Links',
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    margin: 30,
  },
});