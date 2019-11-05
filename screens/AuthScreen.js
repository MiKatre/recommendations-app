import React from 'react'
import {connect} from 'react-redux'
import { AsyncStorage, ActivityIndicator, View, StatusBar} from 'react-native'
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types'


import {logInUser} from '../redux/actions'
import LoginForm from '../components/LoginForm';
import { api } from '../constants/Urls';

class AuthScreen extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    err: PropTypes.string,
    logInUser: PropTypes.func,
  }

  static navigationOptions = {
    title: 'Mes Notes',
  };

  // componentDidUpdate(prevProps) {
  //   if (this.props.token) {
  //     AsyncStorage.setItem('userToken', this.props.token)
  //     this.props.navigation.navigate('Main')
  //   }
  // }

  saveToken = (event) => {
    // console.log(event.nativeEvent.data)
    if (event.nativeEvent.data) {
      let { token, user } = JSON.parse(event.nativeEvent.data)
      console.log(token)
      console.log(user.username)

      // AsyncStorage.setItem('userEmail', user.email)
      // AsyncStorage.setItem('userFirstName', user.first_name)
      // AsyncStorage.setItem('userLastName', user.last_name)
      // AsyncStorage.setItem('userId', user.pk)
      AsyncStorage.setItem('userToken', token)
      AsyncStorage.setItem('username', user.username)
      this.props.navigation.navigate('Main')
    }
    
  }
  
  // signIn = (email, password) => {
  //   this.props.logInUser(email, password)
  // }

  render() {
    const runFirst = `
      window.isWebView = true;
      true; // note: this is required, or you'll sometimes get silent failures
      `;
    return (
      <View>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <View style={{ height: '100%', backgroundColor: '#fafafa', paddingTop: 40 }}>
            <WebView
              originWhitelist={['*']}
              injectedJavaScript={runFirst}
              source={{ uri: `${api}/user/login?d=rnwebview` }}
              style={{ flex: 1, height: '100%' }}
              onLoad={syntheticEvent => {
                this.setState({isLoading: false})
              }}
              startInLoadingState={true}
              renderLoading={() => <ActivityIndicator size="small" color="#346bc2"/>}
              onMessage={this.saveToken}
            />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.user.token,
  err: state.user.loginErr,
})

export default connect(mapStateToProps, {logInUser})(AuthScreen)