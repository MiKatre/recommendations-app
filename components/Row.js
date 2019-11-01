import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'

// onClick => Navigate to movie details (screen)

const Row = props => (
  <TouchableOpacity
  onPress={() => props.navigation.navigate('MovieDetails', {
    title: props.title,
    id: props.id,
  })}
  > 
    <View style={[styles.container, styles.horizontal]}>
      <Image 
      style={styles.image}
      source={{ uri: props.poster }}
      />
      <View style={styles.rightContainer}>
        <Text style={styles.title} >{props.title}</Text> 
        <Text style={styles.meta}>{`${props.year} - (${props.type})`} </Text>
      </View>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
    marginTop: 10,
  },
  horizontal: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    width: 113,
    height: 150,
    margin: 10,
  },
  rightContainer: {
    flex: 1,
    alignSelf: 'flex-start',
    paddingVertical: 10,
  },
  title: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  meta: {
    color: '#FFF',
  },
})

export default Row