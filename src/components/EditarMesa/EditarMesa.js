import React from 'react';
import {View, StyleSheet, Button, Modal, Text} from 'react-native';

const EditarMesa = (props) => (
    <Modal visible={props.mesa != null} animationType="slide"> 
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Text style={styles.titulo}>Mesa {props.mesa}</Text>
            </View>
            <Button title="Cerrar" onPress={()=>props.terminar()}/>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    container:{
        width:"100%",
    },
    navbar:{
        width:"100%",
        backgroundColor: '#b71c1c',
        padding: 20,
        // ios
        shadowOffset: {width: 0, height: 13}, 
        shadowOpacity: 0.3,
        shadowRadius: 6,
        // android (Android +5.0)
        elevation: 5,
    },
    titulo:{
        color:'#fff',
        fontSize: 30,
        marginLeft:20
    }
});

export default EditarMesa;