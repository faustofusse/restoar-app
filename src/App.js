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

YellowBox.ignoreWarnings([
  "Using Math.random is not cryptographically secure! Use bcrypt.setRandomFallback to set a PRNG."
]);

const store = configureStore();

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      loading: true
    };
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
        <AppContainer />
      </Provider>
    );
  }
}
