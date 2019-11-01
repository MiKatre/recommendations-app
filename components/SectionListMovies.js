import React from 'react'
import {FlatList,Text, View} from 'react-native'

import Row from './Row'

const SectionListMovies = ({data, navigation}) => {
  // console.log(data)
  return (
  <View>
    <FlatList 
      data={data}
      renderItem={({item}) => <Row {...item} navigation={navigation} /> }
      keyExtractor={item => item.id}
    />
  </View>
  )
}

// Title
// Image
// Year
// Typle (movie || series)
// API key: http://www.omdbapi.com/?i=tt3896198&apikey=b7660e11


export default SectionListMovies