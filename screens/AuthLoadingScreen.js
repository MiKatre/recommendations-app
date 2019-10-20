import React from 'react'
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native'

export default class AuthLoadingScreen extends React.Component {
  constructor(props){
    super(props)
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('userToken')

    // Navigate to App or Auth screen. Current screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Main' : 'Auth' )
  }

  // render some sort of loading indicator
  render() {
    return (
      <View >
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    )
  }
}