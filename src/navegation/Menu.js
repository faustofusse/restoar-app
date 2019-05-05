
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import {createDrawerNavigator, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { FONT_COLOR_WHITE, PRIMARY_COLOR } from '../resources/colors';
import Mesas from '../components/mozo/Mozo';
import Drawer from './Drawer';
import Link from '../screens/Home';
import Configuracion from '../components/configuracion/Configuracion';

const WIDTH = Dimensions.get('window').width;
 
class NavigationDrawerStructure extends Component {
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Icon
          name="bars"
          size={25} 
          style={{ width: 25, height: 25, marginLeft: 5, color: '#fff'}}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
 
const Mesas_StackNavigator = createStackNavigator({
  First: {
    screen: Mesas,
    navigationOptions: ({ navigation }) => ({
      title: 'Mesas',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: PRIMARY_COLOR,
      },
      headerTintColor: FONT_COLOR_WHITE,
    }),
  },
});

const Link_StackNavigator = createStackNavigator({
  Second: {
    screen: Link,
    navigationOptions: ({ navigation }) => ({
      title: 'Link',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: PRIMARY_COLOR,
      },
      headerTintColor: FONT_COLOR_WHITE,
    }),
  },
});

const Configuracion_StackNavigator = createStackNavigator({
  Third: {
    screen: Configuracion,
    navigationOptions: ({ navigation }) => ({
      title: 'Configuración',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: PRIMARY_COLOR,
      },
      headerTintColor: FONT_COLOR_WHITE,
    }),
  },
});

const DrawerConfig = {
	drawerWidth: WIDTH*0.83,
	contentComponent: ({ navigation }) => {
		return(<Drawer navigation={navigation} />)
	}
}

export default  Menu = createDrawerNavigator(
{
  //Drawer Optons and indexing
  Mesas: {
    screen: Mesas_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Mesas',
    },
  },
  Link: {
    screen: Link_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Link',
    },
  },
  Configuracion: {
    screen: Configuracion_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Configuración',
    },
  },
},
  DrawerConfig
);