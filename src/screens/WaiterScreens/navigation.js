import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { DrawerTrigger } from '../../components/Drawer/DrawerTrigger'

import Tables from './Tables'
import Orders from './Orders'
import Products from './Products'

import { FONT_COLOR_WHITE, DARK_PRIMARY } from "../../styles/colors";

export const WaiterNavigator = createStackNavigator({
    Tables: {
      screen: Tables,
      navigationOptions: ({ navigation }) => ({
        title: 'Mesas',
        headerLeft: <DrawerTrigger navigationProps={navigation} />,
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
        title: navigation.getParam('order') === null ? 'Nuevo Pedido' : 'Pedido ' + navigation.getParam('order').number,
        headerStyle: {
          backgroundColor: DARK_PRIMARY,
        },
        headerTintColor: FONT_COLOR_WHITE,
      }),
    }
  });