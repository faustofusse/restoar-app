import React, { Component } from 'react';
import { View, ActivityIndicator,StyleSheet} from 'react-native';
import { Card, Button, Text, Input } from "react-native-elements";
import { onSignIn } from "../../auth";
import Notificacion from '../../components/form/Notificacion';

export default class SignIn extends Component {
  constructor(Props){
    super(Props);
    this.handleCloseNotification=this.handleCloseNotification.bind(this);
    this.state={
      formValid: false,
        userEmail: '',
        userPassword: '',
        loading: false,
        usuario : {},
        respuesta: {},
        url : 'http://restoar.herokuapp.com/api/usuario/'
    }
  }
  async getUsuarioPost(){
    this.setState({loading : true})
    const {userEmail,userPassword} = this.state;
    let collection = {}
    collection.mail=userEmail;
    collection.clave=userPassword;
    return await fetch(this.state.url+'login',
        {
            method: 'POST',
            body: JSON.stringify(collection),
            headers: new Headers({'Content-Type':'application/json'})
        })
        .then(res => res.json())
        .catch(error => console.error('Error: ', error))
        .then(res => {
            this.setState({
                respuesta : res,
                loading : false
            });
        });
  }

  login =  async() => {
    //---redirecciono para no validar login
    onSignIn().then(this.props.navigation.navigate('SignedIn'));
    return
    //---------

    await this.getUsuarioPost();
    if(this.state.respuesta.existe){
      onSignIn().then();
      this.props.navigation.navigate('SignedIn')
    }else{
      alert('Datos de ingreso no validos')
    }
  }

  handleCloseNotification(){
    this.setState({formValid:true});
  }

  render() {
    const {formValid} = this.state;
    const showNotification = formValid ? false : true;
    return (  
    <View style={styles.container}>
      { this.state.loading ? 
      <ActivityIndicator size="large" color="ff0000"/>
      :
      <View>
        <Card title="INGRESO">
          <Text style={{ paddingVertical: 10 }}>Email</Text>
          <Input placeholder="Email..." onChangeText={userEmail => this.setState({userEmail})}/>
          <Text style={{ paddingVertical: 10 }}>Password</Text>
          <Input secureTextEntry placeholder="Password..." onChangeText={userPassword => this.setState({userPassword})}/>

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="Ingresar"
            onPress={
              this.login
            }
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: "#bcbec1" }}
            title="Registrarse"
            type="clear"
            onPress={() => this.props.navigation.navigate('SignUp')}
          />  
        </Card>
      </View>
      }
     {/* <View style={showNotification ? {marginTop:10}:{  }}>
        <Notificacion
          showNotification={showNotification}
          handleCloseNotification={this.handleCloseNotification}
          type="Error"
          firstLine="Datos de ingreso no válidos."
          secondLine="Por favor, ingrese nuevamente"
        />
    </View>*/}
    </View>
    );
  }
}

var styles = StyleSheet.create({
  container:{
    flex : 1,
    justifyContent: 'center',

  }
})