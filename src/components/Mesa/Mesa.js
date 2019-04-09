import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const Mesa = (props) => (
    <TouchableOpacity style={styles.mesa} 
        onPress={props.onPress}>
        <Text style={styles.texto}>Mesa {props.numero}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    mesa:{
        width: "100%",
        padding: 20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor:"#ff5722",
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
        // ios
        shadowOffset: {width: 0, height: 13}, 
        shadowOpacity: 0.3,
        shadowRadius: 6,
        // android (Android +5.0)
        elevation: 5,
    },
    texto:{
        fontSize:20,
        color:'#fff',
        textAlign:'center'
    }
});

export default Mesa;
