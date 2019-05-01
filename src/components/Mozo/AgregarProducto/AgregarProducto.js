import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, Text, FlatList, Button } from 'react-native';

const AgregarProducto = (props) => (
    <Modal visible={props.agregarProducto} >
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Text style={styles.titulo}>{props.titulo}</Text>
            </View>
            <View style={styles.lista}>
                <FlatList
                    data={props.lista}
                    keyExtractor={item => item.key.toString()}
                    renderItem={(info) => (
                        <TouchableOpacity disabled={info.item.isProducto} style={styles.item} onPress={() => props.handleOnPressButton(info.item.key)}>
                            <Text style={styles.nombre}>{info.item.nombre}</Text>
                            {(info.item.isProducto) ? (
                                <TouchableOpacity style={[styles.boton]} onPress={() => props.onAddProducto({id: info.item.id, add:[]})}><Text style={styles.textoBoton}>+</Text></TouchableOpacity>
                            ) : null}
                        </TouchableOpacity>
                    )} />
            </View>
            {(!props.inicio) ? (
                <Button title="Volver" onPress={() => props.volver()} />
            ) : null}
            <Button title="Cerrar" onPress={() => props.terminar()} />
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        justifyContent: 'space-between'
    },
    navbar: {
        width: "100%",
        backgroundColor: '#b71c1c',
        padding: 20,
        // ios
        shadowOffset: { width: 0, height: 13 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        // android (Android +5.0)
        elevation: 5,
    },
    titulo: {
        color: '#fff',
        fontSize: 30,
        marginLeft: 20
    },
    lista: {
        flex: 1,
        padding: 10,
        marginTop: 10
    },
    item: {
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
        height: 60,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: 1,
        backgroundColor: "#2196f3"
    },
    textoBoton: {
        fontSize: 30,
        color: "#fff",
    }
});

export default AgregarProducto;