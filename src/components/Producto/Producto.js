import React from 'react';
import { View, StyleSheet, Button, Modal, Text } from 'react-native';

const Producto = (props) => (
    <View style={styles.container}>
        <Text>Producto {props.id}</Text>
        <Button title="+" onPress={() => props.onAddProducto()} />
        <Button title="-" onPress={() => props.onRemoveProducto()} />
    </View>
);

const styles = StyleSheet.create({
    container:{
        width:"100%",
        flexDirection:'row',
        justifyContent:'space-between'
    }
});

export default Producto;