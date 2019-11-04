import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, Text } from 'react-native';
import MovieList from '../components/MovieList'
// export default function LinksScreen() {
//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Rechercher </Text>
//     </ScrollView>
//   );
// }

export default class SearchSceeen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Rechercher </Text>
        <MovieList navigation={this.props.navigation}/>
      </ScrollView>
    )
  }
}

SearchSceeen.navigationOptions = {
  // title: 'Links',
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    // backgroundColor: '#1c1c1c',
  },
  title: {
    fontWeight: 'bold',
    // color: '#FFF',
    fontSize: 34,
    marginTop: 40,
    marginLeft: 20,
  },
});