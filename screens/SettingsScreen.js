import React from 'react';
import { AsyncStorage, Button, View, StatusBar, Platform} from 'react-native'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Paramètres',
  };

  signOutAsync = async () => {
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  };

  render() {

    return (
      <View style={{marginTop: 20}}>
        <StatusBar barStyle="dark-content" backgroundColor="#ecf0f1" />
        <View style={{ height: '100%', backgroundColor: '#fafafa' }}>
          <Button title="Déconnexion" onPress={this.signOutAsync} /> 
        </View>
      </View>
    );
  }
}