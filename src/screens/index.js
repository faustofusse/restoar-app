import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import { FONT_COLOR_WHITE, DARK_PRIMARY } from '../styles/colors';
import Tables from './Waiter/Tables'
import Orders from './Waiter/Orders'
import Products from './Waiter/Products'
import Drawer from '../components/Drawer/Drawer';
import Link from '../components/Home/Home';
import Settings from './SettingsScreen/Settings';

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
            style={{ width: 25, height: 25, marginLeft: 5, color: '#fff' }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const Waiter_StackNavigator = createStackNavigator({
  Tables: {
    screen: Tables,
    navigationOptions: ({ navigation }) => ({
      title: 'Mesas',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: DARK_PRIMARY,
      },
      headerTintColor: FONT_COLOR_WHITE,
    }),
  },
  Orders: {
    screen: Orders,
    navigationOptions: ({ navigation }) => ({
      title: `Mesa ${navigation.getParam('code')}`,
      headerStyle: {
        backgroundColor: DARK_PRIMARY,
      },
      headerTintColor: FONT_COLOR_WHITE,
    }),
  },
  Products: {
    screen: Products,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam('order') === null ? 'Nuevo Pedido' : 'Pedido ' + navigation.getParam('order'),
      headerStyle: {
        backgroundColor: DARK_PRIMARY,
      },
      headerTintColor: FONT_COLOR_WHITE,
    }),
  }
});

const Link_StackNavigator = createStackNavigator({
  First: {
    screen: Link,
    navigationOptions: ({ navigation }) => ({
      title: 'Link',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: DARK_PRIMARY,
      },
      headerTintColor: FONT_COLOR_WHITE,
    }),
  },
});

const Settings_StackNavigator = createStackNavigator({
  First: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      title: 'Configuracion',
      headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: DARK_PRIMARY,
      },
      headerTintColor: FONT_COLOR_WHITE,
    }),
  },
});

const DrawerConfig = {
  drawerWidth: WIDTH * 0.83,
  contentComponent: ({ navigation }) => {
    return (<Drawer navigation={navigation} />)
  }
}

export default Menu = createDrawerNavigator(
  {
    //Drawer Optons and indexing
    Mesas: {
      screen: Waiter_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Mozo',
      },
    },
    Link: {
      screen: Link_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Link',
      },
    },
    Settings: {
      screen: Settings_StackNavigator,
      navigationOptions: {
        drawerLabel: 'Configuración',
      },
    },
  },
  DrawerConfig
);