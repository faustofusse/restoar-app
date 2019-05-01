import React, {Component} from 'react';
import {

  View,
  
  TouchableOpacity,
  StyleSheet,
  Dimensions
  } from 'react-native';
  import { Card, Button, Text, Input } from "react-native-elements";

  


export default ({ navigation }) => (
  <View style={{ paddingVertical: 20 }}>
  <Card title="REGISTRARSE">
      <Text style={{ paddingVertical: 10 }}>Email</Text>
      <Input placeholder="Email..." />
      <Text style={{ paddingVertical: 10 }}>Password</Text>
      <Input secureTextEntry placeholder="Password..." />
      <Text style={{ paddingVertical: 10 }}>Confirmar Password</Text>
      <Input secureTextEntry placeholder="Confirmar Password..." />

      <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="Registrarse"
        
      />
    </Card>
  </View>
);