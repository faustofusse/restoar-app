import React from "react";
// Navigation
import { createAppContainer } from "react-navigation";
import { createRootNavigator } from "./config/routes";
// Async Storage
import { getUser, updateUser } from "./services/storage";
// API
import { getUserById } from "./services/api";
// Redux
import { Provider } from "react-redux";
import { setUser, setRestaurants } from "./redux/actions";
import configureStore from "./config/store";

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
    let updatedUser = await getUserById(user._id);
    await store.dispatch(setRestaurants(updatedUser.restaurants));
    await store.dispatch(setUser(updatedUser));
    await updateUser(updatedUser);
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
