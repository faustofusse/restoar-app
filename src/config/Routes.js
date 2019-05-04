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
  
  //Switch entre Navegaciones Logeado o No logueado
  export const createRootNavigator = (signedIn = false) => {
    return createSwitchNavigator(
      {
        SignedIn: {
          screen: Menu
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