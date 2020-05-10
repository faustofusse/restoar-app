import React from 'react';
// Drawer
import { createDrawerNavigator } from "react-navigation";
import Drawer from "../components/Drawer/Drawer";
// Navigators
import { WaiterNavigator } from "./WaiterScreens/navigation";
import { ChefNavigator } from './ChefScreens/navigation';
import { SettingsNavigator } from "./SettingsScreens/navigation";
// Components
import { Dimensions } from 'react-native';
const { width: WIDTH } = Dimensions.get('window')

const DrawerConfig = {
  drawerWidth: WIDTH * 0.83,
  contentComponent: ({ navigation }) => {
    return <Drawer navigation={navigation} />;
  }
};

export default Menu = createDrawerNavigator(
  {
    Waiter: {
      screen: WaiterNavigator,
      navigationOptions: {
        drawerLabel: "Mozoooo"
      }
    },
    Settings: {
      screen: SettingsNavigator,
      navigationOptions: {
        drawerLabel: "Configuración"
      }
    },
    Chef: {
      screen: ChefNavigator,
      navigationOptions: {
        drawerLabel: 'Cocina'
      }
    }
  },
  DrawerConfig
);
