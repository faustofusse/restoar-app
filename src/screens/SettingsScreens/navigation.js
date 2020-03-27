import React from 'react';
// Drawer
import { createStackNavigator } from "react-navigation";
import { DrawerTrigger } from "../../components/Drawer/DrawerTrigger";
// Screen
import Settings from "./Settings";
// Styles
import { DARK_PRIMARY, FONT_COLOR_WHITE } from "../../styles/colors";

export const SettingsNavigator = createStackNavigator({
  First: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      title: "Configuracion",
      headerLeft: <DrawerTrigger navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: DARK_PRIMARY
      },
      headerTintColor: FONT_COLOR_WHITE
    })
  }
});
