import React from 'react';
import { View, StyleSheet, Button, Modal, Text } from 'react-native';

const Producto = (props) => (
    <View style={styles.container}>
        <Text style={styles.nombre}>{props.nombre}</Text>
        <Button style={styles.boton} title="+" onPress={() => props.onAddProducto()} />
        <Button style={styles.boton} title="-" onPress={() => props.onRemoveProducto()} />
        <Text style={styles.cantidad}>{props.cantidad}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: "#eee",
        borderRadius: 10
    },
    nombre: {
        padding: 15,
        flex: 1,
        fontSize: 25
    },
    boton: {
        padding: 10,
        borderRadius: 50
    },
    cantidad: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 15,
        width: "20%",
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: "#e0e0e0"
    }
});

export default Producto;