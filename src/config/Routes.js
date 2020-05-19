import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import SignUp from '../screens/AuthScreens/Register';
import SignIn from '../screens/AuthScreens/Login';
import Pin from '../screens/AuthScreens/Pin';

import Index from '../screens/index';

export const SignedIn = createSwitchNavigator(
  {
    Pin: { screen: Pin },
    Menu: { screen: Index }
  },
  { initialRouteName: 'Pin' }
)

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: { header: null }
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: { title: "" }
  }
});

//Switch entre Navegaciones Logeado o No logueado
export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: { screen: SignedIn },
      SignedOut: { screen: SignedOut }
    },
    { initialRouteName: signedIn ? "SignedIn" : "SignedOut" }
  );
};