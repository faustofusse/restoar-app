// Components
import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { Card, Button, Text, Input } from "react-native-elements";
// Async Storage
import { updateUser } from "../../services/storage";
// Redux
import { connect } from "react-redux";
import { setUser, setRestaurants } from "../../redux/actions/index";
// Authentication
import { login } from "../../services/authentication";
import { getExtendedUser } from '../../services/api';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.loginButton = this.loginButton.bind(this);
    this.state = {
      formValid: false,
      userEmail: "",
      userPassword: "",
      loading: false,
      response: {}
    };
  }

  async loginButton() {
    this.setState({ loading: true });
    const { userEmail, userPassword } = this.state;
    console.log("Logging in...");
    let user = await login(userEmail, userPassword);
    if (user == null) return this.setState({ loading: false });
    // Esto se repite en App.js - Hay que hacer algo al respecto
    let extendedUser = await getExtendedUser(user._id);
    await this.props.onSetUser(extendedUser);
    await this.props.onSetRestaurants(extendedUser.restaurants);
    await updateUser(extendedUser);
    this.props.navigation.navigate("SignedIn");
  }

  handleCloseNotification() {
    this.setState({ formValid: true });
  }

  render() {
    const { formValid } = this.state;
    const showNotification = formValid ? false : true;
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="ff0000" />
        ) : (
          <View>
            <Card title="INGRESO">
              <Text style={{ paddingVertical: 10 }}>Email</Text>
              <Input
                placeholder="Email..."
                onChangeText={userEmail => this.setState({ userEmail })}
              />
              <Text style={{ paddingVertical: 10 }}>Password</Text>
              <Input
                secureTextEntry
                placeholder="Password..."
                onChangeText={userPassword => this.setState({ userPassword })}
              />

              <Button
                buttonStyle={{ marginTop: 20 }}
                backgroundColor="#03A9F4"
                title="Ingresar"
                onPress={this.loginButton}
              />
              <Button
                buttonStyle={{ marginTop: 20 }}
                backgroundColor="transparent"
                textStyle={{ color: "#bcbec1" }}
                title="Registrarse"
                type="clear"
                onPress={() => this.props.navigation.navigate("SignUp")}
              />
            </Card>
          </View>
        )}
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
    justifyContent: "center"
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onSetUser: user => dispatch(setUser(user)),
    onSetRestaurants: restaurants => dispatch(setRestaurants(restaurants))
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
