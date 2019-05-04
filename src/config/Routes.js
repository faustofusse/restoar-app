import React, {Component} from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import SignUp from '../screens/login/SignUp';
import SignIn from '../screens/login/SignIn';
import Menu from '../navegation/Menu';

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