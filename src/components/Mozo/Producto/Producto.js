import React from 'react';
import { View, StyleSheet, Button, Modal, Text, TouchableOpacity } from 'react-native';

const Producto = (props) => (
    <View style={styles.container}>
        <Text style={styles.nombre}>{props.nombre}</Text>
        <TouchableOpacity style={styles.boton} onPress={() => props.onRemoveProducto()}>
            <Text style={{ fontSize: 30, color: "#fff" }}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cantidad} onPress={() => props.onAddProducto()}>
            <Text style={{ fontSize: 25 }}>{props.cantidad}</Text>
        </TouchableOpacity>
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
        height: 50,
        aspectRatio: 1,
        // borderRadius: 100,
        // marginRight: 5,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 25,
        // backgroundColor:"#1976d2"
        backgroundColor: "#2196f3"
    },
    cantidad: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 15,
        width: "20%",
        height: "100%",
        alignItems: "center",
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: "#e0e0e0"
    }
});

export default Producto;