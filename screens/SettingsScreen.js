import React from 'react';
import {AsyncStorage, Button, View} from 'react-native'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Button title="Sign me out" onPress={this.signOutAsync} />
      </View>
    );
  }
}