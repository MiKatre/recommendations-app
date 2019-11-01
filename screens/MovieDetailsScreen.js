import React from 'react'
import { Image, ScrollView, View, StyleSheet, Text } from 'react-native'
import { fetchMovieData } from '../api'

const processRatings = rating => (        
  <View key={rating.Value}>
    <Text style={styles.bold}>{rating.Source}</Text>
    <Text style={styles.text}>{rating.Value}</Text>
  </View> 
)

class MovieDetailsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return ({
      title: navigation.state.params.title,
    })  
  }

  state = {
    title: null,
    poster: null,
    storyline: null,
    awards: null,
    ratings: null,
    boxOffice: null,
  }

  componentDidMount() {
    this.getMovieData()
  }

  getMovieData = () => {
    fetchMovieData(this.props.navigation.state.params.id)
    .then(res => this.setState({
      title: res.title,
      poster: res.poster,
      storyline: res.storyline,
      awards: res.awards,
      ratings: res.ratings,
      boxOffice: res.boxOffice,
    }))
  }

  render() {
    const {params} = this.props.navigation.state
    const {title, id} = params

    const { storyline, awards, boxOffice, ratings } = this.state 

    let processedRatings = ratings ? ratings.map(processRatings) : null

    if (!(this.state.poster && this.state.title)) return (<Text>Loading...</Text>)

    return (
      <ScrollView style={styles.container}> 
        <View style={[styles.topContainer, styles.m10]}>
          <Image
            style={{width: 182, height: 268}}
            source={{uri: this.state.poster}}
          />
          <View style={[styles.container, styles.mh10, styles.spaceBetween]}>
            <View>
              <Text style={[styles.title, styles.bold]}>{title}</Text>
              <Text style={styles.text}>{awards}</Text>
            </View>
            <View>
              <Text style={styles.bold}>Box Office:</Text>
              <Text style={styles.text}>{boxOffice}</Text>
            </View>

            {processedRatings}

          </View>
        </View>
        
        <View style={styles.mh10}>
          <Text style={[styles.text, styles.bold]}>
            Storyline: 
          </Text>

          <Text style={styles.text}>
            {storyline}
          </Text>
        </View>

      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#FFF',
  },
  text: {
    color: '#FFF',
  },
  bold: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  topContainer: {
    flexDirection: 'row',
  },
  m10: {
    margin: 10,
  },
  mh10: {
    marginHorizontal: 10,
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
})

export default MovieDetailsScreen