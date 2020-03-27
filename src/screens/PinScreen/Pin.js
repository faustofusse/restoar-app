import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { onSignOut } from '../../services/storage';
import { setUser } from '../../redux/actions/index';
import { connect } from 'react-redux';
import { DARK_PRIMARY, ACCENT } from '../../styles/colors';
import { URL } from '../../config/settings';
import axios from 'axios';
import bcrypt from 'react-native-bcrypt';

class Pin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: this.props.pin,
      inputs: '----'
    }
    this.LogOut = this.LogOut.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.checkPin = this.checkPin.bind(this);
    this.onSetPin = this.onSetPin.bind(this);

    // SALTEO EL PIN ----------------------
    this.props.navigation.navigate('Menu');
  }

  LogOut = () => {
    onSignOut();
    this.props.navigation.navigate('SignedOut');
  }

  onSetPin = () => {
    // No esta del todo checkeado esto!!

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.state.inputs, salt);
    let url = URL + 'api/users/' + this.props._id;
    console.log('Updating pin...')
    axios.put(url, { pin: hash }).then(response => {
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        console.log(response.data);
        this.props.onSetUser(response.data);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  onInputChange = (i, n) => {
    let inputs = this.state.inputs;
    inputs = inputs.substr(0, i) + n + inputs.substr(i + 1);
    if (i < 3 && n.length > 0) this.refs[i + 1].focus();
    this.setState({ inputs }, () => {
      if (this.state.pin !== undefined) this.checkPin();
    });
  }

  checkPin = () => {
    if (bcrypt.compareSync(this.state.inputs, this.state.pin)) {
      this.props.navigation.navigate('Menu');
    } else {
      console.log('Pin incorrecto');
    }
  }

  render() {
    const config = this.state.pin === undefined || this.state.pin === null;
    return (
      <View style={styles.container}>
        <View style={{ justifyContent: 'center' }}>
          {/* <TouchableOpacity style={{padding: 10, alignSelf: 'flex-start'}} onPress={() => console.log('logout')} >
            <Icon name="caret-left" size={60} color={'#fff'} />
            </TouchableOpacity> */}
          <Text style={{ color: '#fff', fontSize: 35, fontWeight: 'bold', marginHorizontal: 15, marginBottom: 10, marginTop: '30%' }}>
            Hola de nuevo, {this.props.firstName}!</Text>
          <Text style={{ color: '#fff', fontSize: config ? 25 : 20, marginHorizontal: 15, marginBottom: 40 }}>
            Por favor {config ? 'configura tu' : 'ingresa tu'} pin:</Text>
          <View style={styles.inputs}>
            <TextInput keyboardType={'numeric'} autoFocus
              style={styles.input}
              maxLength={1} ref={'0'}
              onChangeText={(n) => this.onInputChange(0, n)} />
            <TextInput keyboardType={'numeric'}
              style={styles.input}
              maxLength={1} ref={'1'}
              onChangeText={(n) => this.onInputChange(1, n)} />
            <TextInput keyboardType={'numeric'}
              style={styles.input}
              maxLength={1} ref={'2'}
              onChangeText={(n) => this.onInputChange(2, n)} />
            <TextInput keyboardType={'numeric'}
              style={styles.input}
              maxLength={1} ref={'3'}
              onChangeText={(n) => this.onInputChange(3, n)} />
          </View>

        </View>
        {config ? (
          <TouchableOpacity style={{ width: '100%', backgroundColor: ACCENT, paddingVertical: 10 }} onPress={this.onSetPin}>
            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 25 }}>Aceptar</Text>
          </TouchableOpacity>
        ) : (
            <TouchableOpacity style={{ justifyContent: 'center' }} onPress={this.LogOut}>
              <Text style={{ textAlign: 'center', color: '#fff', fontSize: 20, marginBottom: 15 }}>Volver</Text>
            </TouchableOpacity>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: DARK_PRIMARY
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 30,
    width: '20%',
    textAlign: 'center',
    borderRadius: 10
  }
});

const mapStateToProps = state => {
  return {
    pin: state.user.pin,
    firstName: state.user.firstName,
    _id: state.user._id
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSetUser: (user) => dispatch(setUser(user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pin);