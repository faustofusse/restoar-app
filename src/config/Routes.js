import React, {Component} from 'react';
import { View } from 'react-native';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import SignUp from '../screens/login/SignUp';
import SignIn from '../screens/login/SignIn';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
 
import Menu from '../navegation/Menu';

/*  const SignedOutStack = createStackNavigator({
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
  export const SignedOut = createAppContainer(SignedOutStack);*/

  
  export const SignedOut = createStackNavigator({
    SignIn: {
      screen: SignIn,
      navigationOptions: {
        header : null
        
      }
    },
    SignUp: {
      screen: SignUp,
      navigationOptions: {
        title: "",
        
      }
    }
  });
  
  export const SignedIn = createStackNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: {
          title: "Home",
        }
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          title: "Profile", 
        }
      }
    }
  );
  
  export const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
      {
        SignedIn: {
          screen: Menu//SignedIn
        },
        SignedOut: {
          screen: SignedOut
        }
      },
      {
        initialRouteName: signedIn ? "SignedIn" : "SignedOut"
      }
    );
  };