import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { ACCENT, FONT_COLOR_WHITE, GREEN } from '../../../styles/colors';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const RESERVED = 'RESERVED', OPEN = 'OPEN', CLOSED = 'CLOSED', BUSY = 'BUSY';
const COLOR_RESERVED = '#00897b', COLOR_OPEN = '#43a047', COLOR_CLOSED = '#e53935', COLOR_BUSY = '#fdd835';
const COLORS = { RESERVED: COLOR_RESERVED, OPEN: COLOR_OPEN, CLOSED: COLOR_CLOSED, BUSY: COLOR_BUSY };

const Table = (props) => (
    // <TouchableOpacity style={[styles.table, { backgroundColor: COLORS[props.state] }]}
    //     onPress={() => props.selectTable()}>
    //     <Text style={styles.texto}>Mesa {props.code} ({props.state})</Text>
    // </TouchableOpacity>
    <TouchableOpacity style={[styles.table, {borderColor:COLORS[props.state]+'99'}]}
        onPress={() => props.selectTable()}>
        <View style={styles.holder}>
            {/* <View style={[styles.stateRectangle, {backgroundColor: COLORS[props.state]}]}></View> */}
            <Text style={styles.tableText}>Mesa {props.code} </Text>
            <Text style={styles.stateText}>({props.state[0]})</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    table: {
        backgroundColor: FONT_COLOR_WHITE,
        width: '45%',
        margin: '2.5%',
        paddingVertical: 10,
        paddingHorizontal: 7,
        borderRadius: 5,
        // ios
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        // android (Android +5.0)
        elevation: 3,
        // borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: 2
    },
    tableText: {
        fontSize: 20,
        color: '#000',
        marginLeft: 5,
    },
    stateText: {
        fontSize: 20,
        color: '#bdbdbd',
    },
    stateRectangle: {
        width: 5,
        marginRight: 3,
        borderRadius: 5,
        height: '100%',
    },
    holder: {
        display:'flex', 
        flexDirection:'row', 
        minHeight: 35, 
        alignItems: 'center' 
    }
});

// const styles = StyleSheet.create({
//     table: {
//         width: "45%",
//         padding: 10,
//         margin: "2.5%",
//         borderBottomLeftRadius: 15,
//         borderTopRightRadius: 15,
//         // ios
//         shadowOffset: { width: 0, height: 13 },
//         shadowOpacity: 0.3,
//         shadowRadius: 6,
//         // android (Android +5.0)
//         elevation: 5,
//     },
//     texto: {
//         fontSize: 20,
//         color: FONT_COLOR_WHITE,
//         textAlign: 'center'
//     }
// });

export default Table;
