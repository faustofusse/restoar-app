import React, {Component} from 'react';
import { View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import SignUp from '../screens/login/SignUp';
import SignIn from '../screens/login/SignIn';
import Home from '../screens/Home';
import Profile from '../screens/Profile';

 const SignedInStack = createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={30} color={tintColor} />
        )
      }
    },
    Details: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profile",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={30} color={tintColor} />
        )
      }
    }
  });
  export const SignedIn = createAppContainer(SignedInStack);  

  const SignedOutStack = createStackNavigator({
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: "Registrarse",
      }
    },
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        header : null
      }
    }
  },
  {
    initialRouteName: 'SignIn',
  });
  export const SignedOut = createAppContainer(SignedOutStack);
  