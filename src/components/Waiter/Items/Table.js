import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ACCENT, FONT_COLOR_WHITE } from '../../../styles/colors';

// const RESERVED = 'RESERVED', OPEN = 'OPEN', CLOSED = 'CLOSED', BUSY = 'BUSY';
const COLOR_RESERVED = '#00897b', COLOR_OPEN = '#43a047', COLOR_CLOSED = '#e53935', COLOR_BUSY = '#fdd835';
const COLORS = { RESERVED: COLOR_RESERVED, OPEN: COLOR_OPEN, CLOSED: COLOR_CLOSED, BUSY: COLOR_BUSY };

const Table = (props) => (
    <TouchableOpacity style={[styles.table, { backgroundColor: COLORS[props.state] }]}
        onPress={() => props.selectTable()}>
        <Text style={styles.texto}>Mesa {props.code} ({props.state})</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    table: {
        width: "45%",
        padding: 10,
        margin: "2.5%",
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 15,
        // ios
        shadowOffset: { width: 0, height: 13 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        // android (Android +5.0)
        elevation: 5,
    },
    texto: {
        fontSize: 20,
        color: FONT_COLOR_WHITE,
        textAlign: 'center'
    }
});

export default Table;
