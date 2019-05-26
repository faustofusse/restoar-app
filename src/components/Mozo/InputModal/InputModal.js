import React from 'react';
import { View, StyleSheet, TextInput, Modal, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DARK_PRIMARY, BACKGROUND, BLUE } from '../../../resources/colors';

const InputModal = (props) => (
    <Modal visible={props.visible} animationType="fade" transparent>
        <View style={styles.background} style={styles.background}>
            <View style={styles.container}>
                <View style={styles.arriba}>
                    <Text style={styles.titulo}>{props.titulo}</Text>
                    {props.cerrar !== null ? (
                        <TouchableOpacity style={styles.cerrar} onPress={() => props.cerrar()}>
                            <Icon name="times" size={30} style={{ color: '#e0e0e0', height: '100%', textAlign: 'center', textAlignVertical: 'center' }} />
                        </TouchableOpacity>
                    ) : null}
                </View>
                <View style={styles.abajo}>
                    <TextInput onSubmitEditing={() => {props.aceptar(); props.cerrar();}} 
                        keyboardType={'numeric'}
                        onChangeText={props.onChangeText}
                        ref={ref => (this.ref = ref)}/>
                    <TouchableOpacity style={styles.cerrar} onPress={props.aceptar}>
                        <Icon name="times" size={30} style={{ color: '#e0e0e0', height: '100%', textAlign: 'center', textAlignVertical: 'center' }} />
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
        height: 80,
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: BLUE,
        paddingRight: 15,
        paddingLeft: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    titulo: {
        padding: 17,
        paddingLeft: 0,
        fontSize: 30,
        fontWeight: '700',
        color: '#f5f5f5'
    },cerrar: {
        aspectRatio: 1
    }
});

export default InputModal;