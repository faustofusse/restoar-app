import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { BACKGROUND } from '../../../resources/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const Opciones = (props) => (
    <Modal visible={props.visible} transparent={true}>
        <View style={styles.background}>
            <View style={styles.container}>
                <View style={styles.arriba}>
                    <Text style={styles.titulo}>{props.titulo}</Text>
                    <TouchableOpacity style={styles.cerrar} onPress={() => props.cerrar()}>
                        <Icon
                            name="times"
                            size={25}
                            style={{ width: 25, height: 25, marginLeft: 5, color: 'blue' }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
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
        justifyContent: "space-between"
    },
    titulo: {
        padding: 10,
        fontSize: 25,
    },
    cerrar: {
        aspectRatio: 1
    }
});

export default Opciones;