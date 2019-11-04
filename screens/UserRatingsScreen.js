import React from 'react';
import { AsyncStorage, ActivityIndicator, Button, View, StatusBar} from 'react-native'
import { WebView } from 'react-native-webview';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Mes Notes',
    // headerStyle: {
    //   backgroundColor: '#346bc2',
    // },
    // headerTintColor: '#fff',
  };

  state = {
    username: null,
    isLoading: true,
  }

  async componentDidMount(){
    const username = await AsyncStorage.getItem('username')
    this.setState({username})
  }

  signOutAsync = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  };

  render() {
    const runFirst = `
    window.isWebView = true;
    true; // note: this is required, or you'll sometimes get silent failures
  `;
    // const {isLoading} = this.state
    const { username, isLoading } = this.state

    // if (!username) return <View></View>

    return (
      <View>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <View style={{ height: '100%', backgroundColor: '#fafafa' }}>
            {/* <Button title="Sign me out" onPress={this.signOutAsync} /> */}
            {
              isLoading &&
              <View style={{display: 'flex', paddingTop: 5, backgroundColor: '#FFF'}}>
                <ActivityIndicator size="small" color="#346bc2"/>
              </View>
            }
            <WebView
              originWhitelist={['*']}
              injectedJavaScript={runFirst}
              source={{ uri: `https://5dc04ffecd9d620008e3f7bf--cinetimes.netlify.com/user/${username}/ratings?d=rnwebview` }}
              style={{ flex: 1, height: '100%' }}
              onLoad={syntheticEvent => {
                this.setState({isLoading: false})
              }}
              // startInLoadingState={true}
              // renderLoading={() => <ActivityIndicator size="small" color="#346bc2"/>}
            />
        </View>
      </View>
    );
  }
}