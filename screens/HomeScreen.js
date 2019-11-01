import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}>

      <Text style={styles.title}>Regarder </Text>

      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#1c1c1c',
  },
  title: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 34,
    marginTop: 40,
    marginLeft: 20,
  },
});

