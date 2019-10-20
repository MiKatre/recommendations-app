import React from 'react'
import {Button, KeyboardAvoidingView, Platform, StyleSheet, TextInput, Text, View} from 'react-native'

export default class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    isFormValid: false,
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.email !== prevState.email || this.state.password !== prevState.password) {
      this.validateForm()
    }
  }

  getHandler = key => val => {
    this.setState({[key]: val})
  }

  validateForm = () => {
    if (this.state.email.length > 4 && this.state.password.length > 5) {
      this.setState({isFormValid: true})
    } else {
      this.setState({isFormValid: false})
    }
  }

  handleSubmit = () => {
    this.props.onSubmit(this.state.email,this.state.password)
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.error}>{this.props.err}</Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={this.getHandler('email')}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={this.state.password}
          onChangeText={this.getHandler('password')}
          placeholder="Password"
          secureTextEntry
        />
        <View style={styles.button}>
          <Button title="Submit" onPress={this.handleSubmit} disabled={!this.state.isFormValid} />
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   paddingTop: 15,
  //   backgroundColor: '#fff',
  // },
  container: {
    justifyContent: 'center',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    minWidth: 100,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
  button: {
    ...Platform.select({
      ios: {
      },
      android: {
        minWidth: 100,
        marginTop: 20,
        marginHorizontal: 20,
      },
    }),
  },
})
