import React from 'react';
import { View, StyleSheet, Button, TouchableOpacity, Text, FlatList } from 'react-native';
import Order from '../Items/Order';

const OrdersList = (props) => (
    <View style={{ width: '100%', height: '100%' }}>
        <FlatList
            data={props.orders}
            keyExtractor={item => item._id}
            renderItem={(info) => (
                <Order state={getStatus(info.item.historyStatus)} products={info.item.products} number={info.item.number} navigation={props.navigation}/>
            )} />
    </View>
);

let getStatus = (history) => {
    let date = new Date(Math.max.apply(null, history.map(function (e) {
        return new Date(e.created_at);
    })));
    let state = history.find(e => e.created_at === date.toISOString()).type;
    return state;
}

export default OrdersList;