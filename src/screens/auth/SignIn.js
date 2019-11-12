import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Card, Button, Text, Input } from 'react-native-elements';
import { onSignIn } from "../../services/storage";
import Notificacion from '../../components/form/Notificacion';
import { URL } from '../../resources/url';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import { setUser } from '../../actions/index';
import { connect } from 'react-redux';


class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      formValid: false,
      userEmail: '',
      userPassword: '',
      loading: false,
      response: {}
    }
  }

  login() {
    this.setState({ loading: true });
    const { userEmail, userPassword } = this.state;
    console.log('Logging in...');
    axios.post(URL + 'api/users/login', {
      email: userEmail,
      password: userPassword
    }).then((response) => {
      this.setState({ loading: false });
      if (response.data.success) {
        let token = response.data.success;
        let user = jwt_decode(token)
        console.log(user);
        this.props.onSetUser(user);
        onSignIn(user).then();
        this.props.navigation.navigate('SignedIn');
      } else {
        console.log('Error: ' + response.data.error);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  handleCloseNotification() {
    this.setState({ formValid: true });
  }

  render() {
    const { formValid } = this.state;
    const showNotification = formValid ? false : true;
    return (
      <View style={styles.container}>
        {this.state.loading ?
          <ActivityIndicator size="large" color="ff0000" />
          :
          <View>
            <Card title="INGRESO">
              <Text style={{ paddingVertical: 10 }}>Email</Text>
              <Input placeholder="Email..." onChangeText={userEmail => this.setState({ userEmail })} />
              <Text style={{ paddingVertical: 10 }}>Password</Text>
              <Input secureTextEntry placeholder="Password..." onChangeText={userPassword => this.setState({ userPassword })} />

              <Button
                buttonStyle={{ marginTop: 20 }}
                backgroundColor="#03A9F4"
                title="Ingresar"
                onPress={
                  this.login
                }
              />
              <Button
                buttonStyle={{ marginTop: 20 }}
                backgroundColor="transparent"
                textStyle={{ color: "#bcbec1" }}
                title="Registrarse"
                type="clear"
                onPress={() => this.props.navigation.navigate('SignUp')}
              />
            </Card>
          </View>
        }
        {/* <View style={showNotification ? {marginTop:10}:{  }}>
        <Notificacion
          showNotification={showNotification}
          handleCloseNotification={this.handleCloseNotification}
          type="Error"
          firstLine="Datos de ingreso no válidos."
          secondLine="Por favor, ingrese nuevamente"
        />
    </View>*/}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
})

const mapDispatchToProps = dispatch => {
  return {
    onSetUser: (user) => dispatch(setUser(user)),
  };
}

export default connect(null, mapDispatchToProps)(SignIn);