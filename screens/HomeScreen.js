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

  state = {
    username: null,
    clientHeight: 1000,
  }

  async componentDidMount(){
    const username = await AsyncStorage.getItem('username')
    this.setState({username})
  }

  render() {
    const { username, clientHeight } = this.state
    return (
      // <View style={styles.container}>
      // <ScrollView contentContainerStyle={styles.contentContainer} style={{ flex: 1 }}>
          //<Text style={styles.title}>Regarder</Text>
          <View>
            <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
            <View style={{ paddingTop: Constants.statusBarHeight, height: '100%', backgroundColor: '#fafafa' }}>
              <WebView
                originWhitelist={['*']}
                injectedJavaScript={`
                  window.isWebView = true;
                  // setTimeout(() => window.ReactNativeWebView.postMessage(document.body.clientHeight), 2000 )
                  true;
                `}
                source={{ uri: `${api}/user/${username}/recommendations?d=rnwebview` }}
                // source={{ uri: `${api}/search?query=harr&d=rnwebview` }}
                style={{ height: '100%' }}
                // onMessage={e => {
                //   this.setState({clientHeight: Number(e.nativeEvent.data) })
                // }}
              />
            </View>
          </View>
        //</ScrollView>
      //</View> 
    );
  }
  // return (
  //   <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
  //     <WebView source={{ uri: 'https://github.com/react-native-community/react-native-webview/issues/22' }}
  //              style={{ height: 100 }}/>
  //     <WebView source={{ uri: 'https://bbc.co.uk/news' }} style={{ height: 100 }}/>
  //   </ScrollView>)
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

