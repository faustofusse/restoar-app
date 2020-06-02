import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { BLUE, DARK_GREY, GREY, RED } from '../../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
// import socket from '../../../config/sockets';

const renderChevron = (props) => (
    <View style={{height:'100%', display:'flex', flexDirection:'row', alignItems:'center'}}>
        <Icon name={'chevron-right'} size={15} style={{ marginRight: 15, color: '#9e9e9e', display: 'flex', alignContent:'center', alignItems:'center', textAlign:'center' }} />
    </View>
)

const renderPlus = (props) => (
    <TouchableOpacity style={{alignSelf:'stretch', backgroundColor: DARK_GREY, display: 'flex', justifyContent:'center', aspectRatio: 1, borderBottomRightRadius: 15, borderTopRightRadius: 15}} onPress={() => props.onAddProduct()}>
        <Icon name={'plus'} size={15} style={{ color: '#9e9e9e', display: 'flex', alignContent:'center', alignItems:'center', textAlign:'center' }} />
    </TouchableOpacity>
)

const renderWithOptions = (props) => (
    <View style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <TouchableOpacity style={[styles.boton, { backgroundColor: props.quantity > 1 ? BLUE : RED }]}
        onPress={() => props.onRemoveProduct()}>
            <Icon name={props.quantity > 1 ? "minus" : "times"} size={15} style={{ color: '#fff', display: 'flex', alignContent:'center', alignItems:'center', textAlign:'center' }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cantidad} onPress={() => { props.onAddProduct(); }}>
            <Text style={{fontSize: 18}}>{props.quantity}</Text>
        </TouchableOpacity>
        {/* <Text>Hola</Text> */}
    </View>
)

const Product = (props) => (
    <View style={styles.container}>
       <View style={styles.producto}>
            <Text style={styles.nombre}>{props.name}</Text>
            {props.onRemoveProduct === undefined ? null : (
                <TouchableOpacity style={[styles.boton, { backgroundColor: props.quantity > 1 ? BLUE : RED }]}
                    onPress={() => props.onRemoveProduct()}>
                    <Icon name={props.quantity > 1 ? "minus" : "times"} size={15} style={{ color: '#fff', display: 'flex', alignContent:'center', alignItems:'center', textAlign:'center' }} />
                </TouchableOpacity>
            )}
            {props.onAddProduct === undefined ? null : (
                <TouchableOpacity style={styles.cantidad} onPress={() => { props.onAddProduct(props.id); }}>
                    {props.quantity !== undefined ? (
                        <Text style={{fontSize: 18}}>{props.quantity}</Text>
                    ) : (
                        <Text style={{fontSize: 28}}>+</Text>
                        // <Icon name={'plus'} size={25} style={{ color: '#454545', display: 'flex', alignContent:'center', alignItems:'center', textAlign:'center' }} />
                    )}
                </TouchableOpacity>
            )}
        </View>
        {/* {props.agregado !== null ? (
            <View style={styles.agregado}>
                <Text style={{ fontSize: 20, color: '#fff' }}>{props.agregado}</Text>
            </View>
        ) : null} */}
    </View>
);

const styles = StyleSheet.create({
    container: {
        margin: 10,
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
        fontSize: 18
    },
    boton: {
        height: 40,
        aspectRatio: 1,
        // borderRadius: 100,
        // marginRight: 5,
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 25
    },
    cantidad: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 15,
        width: "20%",
        height: "100%",
        alignItems: "center",
        fontSize: 30,
        textAlign: 'center',
        backgroundColor: DARK_GREY
    },
    // agregado: {
    //     width: "95%",
    //     height: 30,
    //     marginTop: 2,
    //     backgroundColor: BLUE,
    //     borderBottomLeftRadius: 8,
    //     borderBottomRightRadius: 8,
    //     paddingLeft: 20
    // }
});

export default Product;