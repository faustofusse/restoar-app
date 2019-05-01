import React from 'react';
import imagen from '../../../assets/pinguino.jpg';
import { View, StyleSheet, Text, Image } from 'react-native';
import { FONT_COLOR_WHITE, PRIMARY_COLOR } from '../../../resources/colors';

const NavBar = (props) => (
    <View style={styles.navbar}>
        {(props.imagen) ? (<Image style={styles.imagen} source={props.imagen} />) : null}
        <Text style={styles.nombre}>{props.titulo}</Text>
    </View>
);

const styles = StyleSheet.create({
    imagen: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    navbar: {
        height: "15%",
        width: "100%",
        backgroundColor: PRIMARY_COLOR,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // ios
        shadowOffset: { width: 0, height: 13 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        // android (Android +5.0)
        elevation: 5,
    },
    nombre: {
        color: FONT_COLOR_WHITE,
        fontSize: 30,
        marginLeft: 20
    }
});

export default NavBar;
