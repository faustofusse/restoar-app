
import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import {
  createDrawerNavigator,
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';

import { FONT_COLOR_WHITE, PRIMARY_COLOR } from '../resources/colors';
import Mozo from '../components/mozo/Mozo';

import Drawer from './Drawer';
import Link from '../screens/Home';
import Configuracion from '../components/configuracion/Configuracion';

const WIDTH = Dimensions.get('window').width;

 
class NavigationDrawerStructure extends Component {
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Image
            source={require('../assets/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5, tintColor: '#fff' }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
 
const Mozo_StackNavigator = createStackNavigator({
  //All the screen from the Mozo will be indexed here
  First: {
    screen: Mozo,
    navigationOptions: ({ navigation }) => ({
      title: 'Mozo',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: PRIMARY_COLOR,
      },
      headerTintColor: FONT_COLOR_WHITE,
    }),
  },
});

const Link_StackNavigator = createStackNavigator({
  //All the screen from the Link will be indexed here
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
  //All the screen from the Configuracion will be indexed here
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

const Menu = createDrawerNavigator(
{
  //Drawer Optons and indexing
  Mozo: {
    //Title
    screen: Mozo_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Mozo',
    },
  },
  Link: {
    //Title
    screen: Link_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Link',
    },
  },
  Configuracion: {
    //Title
    screen: Configuracion_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Configuración',
    },
  }
},

DrawerConfig

);
 
export default createAppContainer(Menu);