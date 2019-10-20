import React from 'react'
import {connect} from 'react-redux'
import { AsyncStorage } from 'react-native'
import PropTypes from 'prop-types'

import {logInUser} from '../redux/actions'
import LoginForm from '../components/LoginForm';

class AuthScreen extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    err: PropTypes.string,
    logInUser: PropTypes.func,
  }

  static navigationOptions = {
    title: 'Sign in'
  }

  componentDidUpdate(prevProps) {
    if (this.props.token) {
      AsyncStorage.setItem('userToken', this.props.token)
      this.props.navigation.navigate('Main')
    }
  }
  
  signIn = (email, password) => {
    this.props.logInUser(email, password)
  }

  render() {
    return (
      <LoginForm onSubmit={this.signIn} err={this.props.err}/>
    );
  }
}

const mapStateToProps = state => ({
  token: state.user.token,
  err: state.user.loginErr,
})

export default connect(mapStateToProps, {logInUser})(AuthScreen)