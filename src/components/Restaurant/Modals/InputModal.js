import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Modal, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BACKGROUND, BLUE, GREEN } from "../../../styles/colors";

class InputModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(text) {
    this.setState({ text });
  }

  render() {
    return (
      <Modal visible={this.props.visible} animationType="fade" transparent>
        <View style={styles.background} style={styles.background}>
          <View style={styles.container}>
            <View style={styles.arriba}>
              <Text style={styles.titulo}>{this.props.title}</Text>
              {this.props.close !== null ? (
                <TouchableOpacity
                  style={styles.cerrar}
                  onPress={() => this.props.close()}
                >
                  <Icon
                    name="times"
                    size={25}
                    style={{
                      color: "#e0e0e0",
                      height: "100%",
                      textAlign: "center",
                      textAlignVertical: "center",
                      minHeight: 25
                    }}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.abajo}>
              <TextInput
                onSubmitEditing={() => {
                  this.props.accept(this.state.text);
                  this.props.close();
                }}
                keyboardType={"numeric"}
                autoFocus
                style={styles.input}
                // ref={ref => (this.ref = ref)}
                onChangeText={this.onChangeText}
              />
              <TouchableOpacity
                style={styles.aceptar}
                onPress={() => {
                  this.props.accept(this.state.text);
                  this.props.close();
                }}
              >
                <Text style={{ color: "#fff", fontSize: 20 }}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#21212130",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    backgroundColor: BACKGROUND,
    width: "80%",
    borderRadius: 10,
    flexDirection: "column",
    // ios
    shadowOffset: { width: 0, height: 13 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // android (Android +5.0)
    elevation: 5
  },
  arriba: {
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: BLUE,
    paddingRight: 15,
    paddingLeft: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  titulo: {
    padding: 17,
    paddingLeft: 0,
    fontSize: 20,
    fontWeight: "700",
    color: "#f5f5f5"
  },
  cerrar: {
    aspectRatio: 1,
    minHeight: 10
  },
  abajo: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  aceptar: {
    width: "50%",
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderBottomRightRadius: 10
  },
  input: {
    width: "50%",
    fontSize: 30,
    textAlign: "center"
  }
});

export default InputModal;
