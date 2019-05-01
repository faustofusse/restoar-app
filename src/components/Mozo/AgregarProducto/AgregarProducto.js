import React from 'react';
import NavBar from '../NavBar/NavBar';
import { View, StyleSheet, TouchableOpacity, Modal, Text, FlatList, Button } from 'react-native';
import { BLUE, FONT_COLOR_WHITE, GREY } from '../../../resources/colors';
 
const AgregarProducto = (props) => (
    <Modal visible={props.agregarProducto} >
        <View style={styles.container}>
            <NavBar titulo={props.titulo} />
            <View style={styles.lista}>
                <FlatList
                    data={props.lista}
                    keyExtractor={item => item.key.toString()}
                    renderItem={(info) => (
                        <TouchableOpacity disabled={info.item.isProducto} style={styles.item} onPress={() => props.handleOnPressButton(info.item.key)}>
                            <Text style={styles.nombre}>{info.item.nombre}</Text>
                            {(info.item.isProducto) ? (
                                <TouchableOpacity style={[styles.boton]} onPress={() => props.onAddProducto({ id: info.item.id, add: [] })}><Text style={styles.textoBoton}>+</Text></TouchableOpacity>
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
        backgroundColor: GREY,
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
        backgroundColor: BLUE
    },
    textoBoton: {
        fontSize: 30,
        color: FONT_COLOR_WHITE,
    }
});

export default AgregarProducto;