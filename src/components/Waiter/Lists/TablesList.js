import React from 'react';
import { View, StyleSheet, Button, Modal, Text, FlatList } from 'react-native';
import Table from '../Items/Table';

let state = '';
let separator = true;

const TablesList = (props) => (
    <View style={styles.list}>
        <FlatList numColumns={2}
            data={props.tables}
            // data={props.tables.filter(t => t.state === 'OPEN' || t.state == 'BUSY')}
            keyExtractor={item => item._id}
            // ItemSeparatorComponent={() => {
            //     return (
            //         <View
            //             style={{
            //                 height: separator ? 1 : 0,
            //                 width: "100%",
            //                 backgroundColor: "#000",
            //             }}
            //         />
            //     );
            // }}
            renderItem={(info) => {
                // if (info.item.state !== state) {
                //     separator = true;
                //     state = info.item.state;
                // } else {
                //     separator = false;
                // }
                return (
                    <Table code={info.item.code} state={info.item.state} selectTable={() => props.selectTable(info.item._id)} />
                )
            }} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        justifyContent: 'space-between'
    },
    list: {
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

export default TablesList;