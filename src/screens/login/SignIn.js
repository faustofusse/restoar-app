import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, Button, Text, Input } from "react-native-elements";

export default class SignIn extends Component {
  render() {
    return (  
    <View style={{ paddingVertical: 20 }}>
    <Card title="INGRESO">
      <Text style={{ paddingVertical: 10 }}>Email</Text>
      <Input placeholder="Email..." />
      <Text style={{ paddingVertical: 10 }}>Password</Text>
      <Input secureTextEntry placeholder="Password..." />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="Ingresar"
      
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
    );
  }
}