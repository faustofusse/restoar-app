import React from 'react';
import { View, StyleSheet, Button, Modal, Text, FlatList } from 'react-native';
import Producto from '../Producto/Producto';
import NavBar from '../NavBar/NavBar';
import AgregarProducto from '../AgregarProducto/AgregarProducto';

const EditarMesa = (props) => (
    <Modal visible={props.mesa != null} animationType="slide">
        <View style={styles.container}>
            <NavBar titulo={"Mesa " + props.mesa} />
            <View style={styles.productos}>
                {(!props.productos || props.productos.length === 0) ? (
                    <Text style={styles.textoInfo}>Esta mesa no tiene productos.</Text>
                ) : (
                        <FlatList
                            data={props.productos}
                            keyExtractor={item => item._id}
                            renderItem={(info) => (
                                <Producto id={info.item._id}
                                    nombre={info.item.nombre}
                                    cantidad={info.item.cantidad}
                                    agregado={info.item.agregadoNombre}
                                    onAddProducto={() => props.onAddProducto(info.item)}
                                    onRemoveProducto={() => props.onRemoveProducto(info.item._id)} />
                            )} />
                    )}

            </View>
            <AgregarProducto visible={props.agregarProductoModal}
                onAddProducto={(producto) => props.onAddProducto(producto)}
                terminar={() => props.cambiarModalAgregarProducto(false)} />
            <Button title="Agregar Producto" onPress={() => props.cambiarModalAgregarProducto(true)} />
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
    productos: {
        flex: 1,
        width: "100%",
        marginBottom: 15,
        // padding: 10,
        // marginTop: 10,
        flexDirection: "column",
        justifyContent: "center",
    },
    textoInfo: {
        fontSize: 25,
        textAlign: "center",
    }
});

export default EditarMesa;