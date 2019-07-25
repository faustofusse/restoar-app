import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Card, Button, Text, Input } from "react-native-elements";
import { onSignOut } from '../auth';

export default class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.Menu = this.Menu.bind(this);
    this.LogOut = this.LogOut.bind(this);
  }

  Menu = () => {
    this.props.navigation.navigate('Menu');
  }

  LogOut = () => {
    onSignOut();
    this.props.navigation.navigate('SignedOut');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Inserta el Pin:</Text>
        <Button title="Menu" onPress={this.Menu}/>
        <Button title="Logout" onPress={this.LogOut}/>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})