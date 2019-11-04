import React from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'

import SectionListMovies from './SectionListMovies'
// import {fecthMovieList} from '../api'
import {getPage} from '../api'

removeDuplicate = arr => Array.from(new Set(arr))

class MovieList extends React.Component {
  state = {
    input: '',
    movies: [],
  }


  // Progressively add movies to state acording to user input
  getMovieList = async (input, nextPage = null) => {
    const page = await getPage(input, nextPage)
    
    if (typeof page === 'undefined') return // If somewhy we don't receive a page
    if (this.state.input !== input) return // If user continued typing 

    if (page.data.length) {
      if (this.state.movies.length) {
        this.setState({ movies: removeDuplicate(this.state.movies.concat(page.data)) })
      } else {
        this.setState({ movies: page.data })
      }
    }

    if (page.nextPage && page.data.length < 50) {
      this.getMovieList(input, page.nextPage)
    }

    // if (page.nextPage) {
    //   if (!this.state.movies.length) {
    //     this.setState({ movies: page.data })
    //     this.getMovieList(input, page.nextPage)
    //   } else {
    //     this.setState({ movies: removeDuplicate(this.state.movies.concat(page.data)) })
    //     this.getMovieList(input, page.nextPage)
    //   }
    // } else { // If no next page but results
    //   if (!page.data.length) {
    //     this.setState({ movies: page.data })
    //   } else {
    //     this.setState({ movies: removeDuplicate(this.state.movies.concat(page.data)) })
    //   }
    // }
  }

  handleIpnutChange = string => {
    this.setState({input: string, movies: []})
    string.length > 3 ? this.getMovieList(string) : this.setState({movies: []})
    
  }

  render() {
    {/* placeholderTextColor={'#F1F1F1F1'} */}
    return (
      <View style={styles.container}> 
        <TextInput style={styles.input} placeholder="Chercher un film"  value={this.state.input} onChangeText={this.handleIpnutChange} autoCapitalize="none"/>
        <SectionListMovies data={this.state.movies} navigation={this.props.navigation} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    // borderColor: '#1c1c1c',
    // backgroundColor: '#282828',
    // color: "#FFF",
    borderColor: '#e6e7e9',
    backgroundColor: '#e6e7e9',
    color: "#333",
    minWidth: 100,
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
  },
})

export default MovieList