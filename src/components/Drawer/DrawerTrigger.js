import React from "react";
// Components
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export class DrawerTrigger extends React.Component {
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          <Icon
            name="bars"
            size={25}
            style={{ width: 25, height: 25, marginLeft: 5, color: "#fff" }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
