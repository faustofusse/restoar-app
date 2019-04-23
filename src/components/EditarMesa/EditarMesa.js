import React from 'react';
import { View, StyleSheet, Button, Modal, Text, FlatList } from 'react-native';
import Producto from '../Producto/Producto';
import Mesa from '../Mesa/Mesa';

const EditarMesa = (props) => (
    <Modal visible={props.mesa != null} animationType="slide">
        <View style={styles.container}>
            <View style={styles.navbar}>
                <Text style={styles.titulo}>Mesa {props.mesa}</Text>
            </View>
            <View style={styles.productos}>
                <FlatList 
                    data={props.productos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={(info) => (
                        <Producto id={info.item.numero}
                            onAddProducto={()=> props.onAddProducto(info.item.numero)}
                            onRemoveProducto={()=> producto.onRemoveProducto(info.item.numero)} />
                    )} />
            </View>
            <Button title="Cerrar" onPress={() => props.terminar()} />
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex:1,
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
    productos: {
        flex:1,
        backgroundColor: 'black',
        width: "100%"
    }
});

export default EditarMesa;