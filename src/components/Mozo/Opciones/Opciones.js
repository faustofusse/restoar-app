import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Text, FlatList } from 'react-native';
import { BACKGROUND, DARK_PRIMARY, BLUE } from '../../../resources/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const Opciones = (props) => (
    < Modal visible={props.visible} transparent={true} >
        <TouchableOpacity style={styles.background} disabled={props.cerrar === null} onPress={() => props.cerrar()}>
            <View style={styles.container}>
                <View style={styles.arriba}>
                    <Text style={styles.titulo}>{props.titulo}</Text>
                    {props.cerrar !== null ? (
                        <TouchableOpacity style={styles.cerrar} onPress={() => props.cerrar()}>
                            <Icon name="times" size={30} style={{ color: '#e0e0e0', height: '100%', textAlign: 'center', textAlignVertical: 'center' }} />
                        </TouchableOpacity>
                    ) : null}
                </View>
                <FlatList data={props.items}
                    keyExtractor={item => item.id.toString()}
                    renderItem={(info) => (
                        <TouchableOpacity onPress={info.item.funcion} style={styles.item}>
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}> */}
                            {/* <Icon name='caret-right' size={20} style={{ color: '#bdbdbd', fontWeight: '100', marginRight: 10 }} /> */}
                            <Text style={styles.tituloItem}>{info.item.titulo}</Text>
                            {/* </View> */}
                            {info.item.icono !== null ? (
                                <Icon name={info.item.icono} size={23} style={{ color: BLUE, fontWeight: '100', marginRight: 10 }} />
                            ) : null}

                        </TouchableOpacity>
                    )}
                />
            </View>
        </TouchableOpacity>
    </Modal >
);

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#21212130',
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        backgroundColor: BACKGROUND,
        width: "80%",
        borderRadius: 10,
        flexDirection: "column",
        // ios
        shadowOffset: { width: 0, height: 13 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        // android (Android +5.0)
        elevation: 5,
    },
    arriba: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: BLUE,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    titulo: {
        padding: 17,
        paddingLeft: 15,
        fontSize: 30,
        fontWeight: '700',
        color: '#f5f5f5'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        borderTopWidth: 1,
        borderColor: '#e0e0e0'
    },
    tituloItem: {
        fontSize: 25,
        paddingLeft: 5
    },
    cerrar: {
        aspectRatio: 1
    }
});

export default Opciones;