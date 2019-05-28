import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { BLUE, DARK_GREY, GREY, RED } from '../../../resources/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

let key = 0;

const Producto = (props) => (
    <View style={styles.container}>
        <View style={styles.producto}>
            <Text style={styles.nombre}>{props.nombre}</Text>
            <TouchableOpacity style={[styles.boton, { backgroundColor: props.cantidad > 1 ? BLUE : RED }]}
                onPress={() => props.onRemoveProducto()}>
                <Icon name={props.cantidad > 1 ? "minus" : "times"} size={20} style={{ color: '#fff', marginLeft: 20 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.cantidad} onPress={() => props.onAddProducto()}>
                <Text style={{ fontSize: 25 }}>{props.cantidad}</Text>
            </TouchableOpacity>
        </View>
        {props.agregado !== null ? (
            <View style={styles.agregado}>
                <Text style={{ fontSize: 20, color: '#fff' }}>{props.agregado}</Text>
            </View>
        ) : null}
    </View>
);

const styles = StyleSheet.create({
    container: {
        margin: 15,
        marginBottom: 0,
        flexDirection: 'column',
        alignItems: 'center'
    },
    producto: {
        // width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 10,
        backgroundColor: GREY,
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
        alignItems: "baseline",
        fontSize: 25
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
        backgroundColor: DARK_GREY
    },
    lista: {
        // backgroundColor: '#000',
        width: '95%'
    },
    agregado: {
        width: "95%",
        height: 30,
        marginTop: 2,
        backgroundColor: BLUE,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingLeft: 20
    }
});

export default Producto;