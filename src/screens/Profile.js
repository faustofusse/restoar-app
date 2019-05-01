import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Dimensions
  } from 'react-native';

  const { width: WIDTH} = Dimensions.get('window')

export default class DetailsScreen extends Component {
    static navigationOptions = {
        title : 'Profile',
        headerRight : <View/>
    }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}