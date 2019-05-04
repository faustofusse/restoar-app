import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions
  } from 'react-native';

  import { onSignOut } from "../auth";
  const { width: WIDTH} = Dimensions.get('window')
  
  export default class HomeScreen extends Component {
    /*static navigationOptions = {
        header : null
    }*/

  render() {
  console.log('me mande al homescreen');
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />

        <TouchableOpacity style={styles.button} onPress={ () => this.props.navigation.navigate('Login') }>
                                   <Text style={styles.text}>Login</Text>
        </TouchableOpacity>


        <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="Desloguear"
        onPress={() => {
          onSignOut().then(() => this.props.navigation.navigate('SignIn')); //navigation.navigate("SignedIn")); // NEW LOGIC
        }}
      />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  button:{
    width : WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#2D92C4',
    justifyContent: 'center',
    marginTop:30
  },
    text:{
      color: 'rgba(255,255,255,0.7)',
      fontSize: 16,
      textAlign : 'center'
    }
});