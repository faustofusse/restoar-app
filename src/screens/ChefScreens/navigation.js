import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { DrawerTrigger } from "../../components/Drawer/DrawerTrigger";

// import Tables from './Tables'
import Orders from "./Orders";
// import Products from './Products'

import { FONT_COLOR_WHITE, DARK_PRIMARY } from "../../styles/colors";

export const ChefNavigator = createStackNavigator({
  Orders: {
    screen: Orders,
    navigationOptions: ({ navigation }) => ({
      title: "Pedidos",
      headerLeft: <DrawerTrigger navigationProps={navigation} />,
      headerStyle: {
        backgroundColor: DARK_PRIMARY
      },
      headerTintColor: FONT_COLOR_WHITE
    })
  }
});
