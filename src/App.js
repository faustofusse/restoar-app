import React from "react";
import { YellowBox } from "react-native";
// Navigation
import { createAppContainer } from "react-navigation";
import { createRootNavigator } from "./config/routes";
// Async Storage
import { getUser, updateUser } from "./services/storage";
// API
import { getExtendedUser } from "./services/api";
// Redux
import { Provider } from "react-redux";
import { setUser, setRestaurants } from "./redux/actions";
import configureStore from "./config/store";
// Sockets
// import { socket, connectSocket } from "./services/socket";
import { startSocket } from './services/socket';
// React Native Paper
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

console.ignoredYellowBox = ["Remote debugger"];
YellowBox.ignoreWarnings([
  "Warning: ToastAndroid is not supported on this platform.",
  "Using Math.random is not cryptographically secure! Use bcrypt.setRandomFallback to set a PRNG.",
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?",
  "Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window)."
]);

const theme = { ...DefaultTheme, colors: { ...DefaultTheme.colors,
    // primary: 'tomato',
    // accent: 'yellow',
  }};

const store = configureStore();

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signedIn: false, loading: true };
  }

  async componentDidMount() {
    // Check if user is signed in
    let user = await getUser();
    this.setState({ signedIn: user != null });
    if (user == null) return this.setState({ loading: false });
    // Update shit
    let extendedUser = await getExtendedUser(user._id);
    await store.dispatch(setRestaurants(extendedUser.restaurants));
    await store.dispatch(setUser(extendedUser));
    await updateUser(extendedUser);
    // Connect socket
    startSocket(store);
    // Finished loading
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) return null;
    const AppContainer = createAppContainer(
      createRootNavigator(this.state.signedIn)
    );
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <AppContainer />
        </PaperProvider>
      </Provider>
    );
  }
}
