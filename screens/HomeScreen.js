import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  AsyncStorage,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { api } from '../constants/Urls';
import Constants from 'expo-constants';

export default class HomeScreen extends React.Component {
  webview = null;

  state = {
    username: null,
  }

  async componentDidMount(){
    const username = await AsyncStorage.getItem('username')
    this.setState({username})
  }


  handleNavigation = event => {
    if (event.nativeEvent.data) {
      const {title, slug} = JSON.parse(event.nativeEvent.data)
      this.props.navigation.navigate('MovieDetails', {
        slug,
        title,
        // title: slug.split("-").join(" ").replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()}),
      })
    
    }
  }

  render() {
    const { username } = this.state
    return (
      <View>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <View style={{ paddingTop: Constants.statusBarHeight, height: '100%', backgroundColor: '#fafafa' }}>
          <WebView
            ref={ref => (this.webview = ref)}
            originWhitelist={['*']}
            injectedJavaScript={`
              window.isWebView = true;
              // setTimeout(() => {
              //   const links = document.getElementsByTagName('a')
              //   for (i = 0; i < links.length; i++) { 
              //     links[i].addEventListener('click', e => {
              //       e.preventDefault()
              //       const link = e.currentTarget.href.split('/')
              //       const slug = link[link.length - 1]
              //       window.ReactNativeWebView.postMessage(slug)
              //     }
              //   )}
              // }, 500)
              true;
            `}
            onMessage={this.handleNavigation}
            source={{ uri: `${api}/user/${username}/recommendations?d=rnwebview` }}
            style={{ height: '100%' }}
          />
        </View>
      </View>
    );
  }
}


HomeScreen.navigationOptions = {
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

