import React from 'react';
import { AsyncStorage, ActivityIndicator, Button, View, StatusBar, RefreshControl} from 'react-native'
import { WebView } from 'react-native-webview';
import { api } from '../constants/Urls';
import { withNavigationFocus } from 'react-navigation';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Mes Notes',
  };
  
  webview = null;

  state = {
    username: null,
    isLoading: true,
    refreshing: false,
  }

  async componentDidMount(){
    const username = await AsyncStorage.getItem('username')
    this.setState({username})
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused === true && this.props.isFocused === false) {
      this.webview.reload();
    }
  }

  signOutAsync = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  }

  render() {
    const runFirst = `
      window.isWebView = true;
      true; // note: this is required, or you'll sometimes get silent failures
`;

    const { username, isLoading } = this.state
    return (
      <View style={{ backgroundColor: '#fafafa' }}>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <View style={{ height: '100%', backgroundColor: '#fafafa' }} >
            {/* <Button title="Sign me out" onPress={this.signOutAsync} /> */}
            {
              isLoading &&
              <View style={{display: 'flex', paddingTop: 5, backgroundColor: '#FFF'}}>
                <ActivityIndicator size="small" color="#346bc2"/>
              </View>
            }
            <WebView
              ref={ref => (this.webview = ref)}
              originWhitelist={['*']}
              injectedJavaScript={runFirst}
              source={{ uri: `${api}/user/${username}/ratings?d=rnwebview` }}
              style={{ flex: 1, height: '100%' }}
              onLoad={syntheticEvent => {
                this.setState({isLoading: false})
              }}
              onHttpError={syntheticEvent => {
                const { nativeEvent } = syntheticEvent;
                console.warn(
                  'WebView received error status code: ',
                  nativeEvent.statusCode,
                );
              }}
              // startInLoadingState={true}
              // renderLoading={() => <ActivityIndicator size="small" color="#346bc2"/>}
            />
        </View>
      </View>
    );
  }
}

export default withNavigationFocus(SettingsScreen)