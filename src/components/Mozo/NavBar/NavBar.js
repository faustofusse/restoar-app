import React from 'react';
import imagen from '../../../assets/pinguino.jpg';
import {View, StyleSheet, Text, Image} from 'react-native';

const NavBar = (props) => (
    <View style={styles.navbar}> 
        <Image style={styles.imagen} source={imagen}/>
        <Text style={styles.nombre}>{props.nombre}</Text>
    </View> 
);

const styles = StyleSheet.create({
    imagen:{
        width:50,
        height:50,
        borderRadius:50
    },
    navbar: {
        height: "15%",
        width:"100%",
        backgroundColor: '#b71c1c',
        padding: 20,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        // ios
        shadowOffset: {width: 0, height: 13}, 
        shadowOpacity: 0.3,
        shadowRadius: 6,
        // android (Android +5.0)
        elevation: 5,
    },
    nombre:{
        color:'#fff',
        fontSize: 30,
        marginLeft:20
    }
});

export default NavBar;
