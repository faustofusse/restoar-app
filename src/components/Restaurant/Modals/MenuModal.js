import React from "react";
import { View, StyleSheet, TextInput, Platform } from "react-native";
import { Modal, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { BACKGROUND, BLUE, GREEN, DARK_PRIMARY, ACCENT } from "../../../styles/colors";
import { Chip, Switch } from "react-native-paper";
import Menu from "../../../screens/RestaurantScreens/Menu";

class MenuModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "", isSwitchOn: false, };
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(text) {
    this.setState({ text });
  }

  render() {
    return (
      <Modal visible={this.props.visible} animationType="fade" transparent>
          <View style={[styles.background, {
            justifyContent: Platform.OS == 'ios' ? (this.state.isSwitchOn ? 'center' : 'flex-start') : "center",
            paddingTop: Platform.OS == 'ios' ? '50%' : 0,}]}>
          <View style={styles.container}>
            <View style={styles.titleBar}>
                <Text style={styles.title}>Agregar Producto</Text>
                <TouchableOpacity style={{aspectRatio: 1}} onPress={() => this.props.close()} >
                  <Icon name="times" size={25} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.middleView}>
                <TextInput 
                    editable={!this.state.isSwitchOn}
                    onSubmitEditing={() => {
                        this.props.accept(this.state.text);
                        this.props.close(); }}
                    keyboardType={this.state.isSwitchOn ? "default" : "numeric"} autoFocus={true}
                    onChangeText={this.onChangeText}
                    placeholder={'Buscar...'} style={styles.input}></TextInput>
                <TouchableOpacity style={styles.rightView} disabled={true} 
                    onPress={()=>this.setState({isSwitchOn: !this.state.isSwitchOn})}>
                    <View style={styles.separator}></View>
                    <Text style={styles.textSwitch}>Menu:</Text>
                    <Switch value={this.state.isSwitchOn}
                    onValueChange={()=>this.setState({isSwitchOn: !this.state.isSwitchOn})} />
                </TouchableOpacity>
            </View>
            {this.state.isSwitchOn ? (<Menu onAddProduct={(product) => {this.props.onAddProduct(product); this.props.close();}}/>) : (
                <TouchableOpacity style={styles.acceptButton}
                    onPress={()=>{
                        this.props.accept(this.state.text);
                        this.props.close();
                    }}>
                    <Text style={styles.acceptButtonText}>Aceptar</Text>
                </TouchableOpacity>
            )}
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
      // Arreglar esto con un KeyboardAvoidingView
      alignItems: "center"
    },
  container: {
      backgroundColor: '#fff',
      width: "90%",
      borderRadius: 10,
      flexDirection: "column",
      // ios
      shadowOffset: { width: 0, height: 13 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      // android (Android +5.0)
      elevation: 5
    },
  titleBar:{
      backgroundColor: DARK_PRIMARY, 
      borderTopLeftRadius: 10, 
      borderTopRightRadius: 10, 
      padding: 15, 
      display:'flex', 
      flexDirection:'row', 
      justifyContent:'space-between'
    },
  title:{
      color: '#fff', 
      fontSize: 22
    },
  icon:{
      color: "#e0e0e0",
      height: "100%",
      textAlign: "center",
      textAlignVertical: "center",
      minHeight: 25
    },
  middleView:{
      backgroundColor: '#eee',
      display:'flex', 
      paddingRight: 10, 
      flexDirection:'row', 
      justifyContent: 'space-between'
    },
  input:{
      padding: 10, 
      fontSize: 20, 
      width: '50%'
    },
  rightView:{
      paddingVertical: 10, 
      display:'flex', 
      flexDirection:'row', 
      justifyContent:'space-around', 
      alignItems: 'center', 
      width: '50%'
    },
  separator:{
      width:1, 
      height: '100%', 
      backgroundColor: '#757575'
    },
  textSwitch:{
      fontSize: 18, 
      color:'#bdbdbd', 
      marginLeft: 5
    },
  acceptButton:{
      padding: 10, 
      backgroundColor:ACCENT, 
      borderBottomLeftRadius: 10, 
      borderBottomRightRadius: 10
    },
  acceptButtonText:{
      color:'#fff', 
      fontSize: 20,
      width: '100%', 
      textAlign:'center'
    },
});

export default MenuModal;
