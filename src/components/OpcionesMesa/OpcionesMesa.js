import React from 'react';
import {View, StyleSheet, Button} from 'react-native';

const OpcionesMesa = (props) => (
    <View style={styles.container}>
        <Button title="Editar" style={styles.editar} onPress={()=>props.editarMesa()}/>
        <Button title="Terminar" color="#ffc107" style={styles.terminar} onPress={()=>props.terminarMesa()}/>
    </View>
);

const styles = StyleSheet.create({
    container:{
        height:"10%",
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-around"
    },
    editar:{
        backgroundColor:"#ffca28",
        
    },
    terminar:{
        backgroundColor:"#43a047",
        flex:1
    }
});

export default OpcionesMesa;
