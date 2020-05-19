import React from 'react';
import { TouchableOpacity, StyleSheet, Text, FlatList } from 'react-native';
import { ACCENT, FONT_COLOR_WHITE, GREY } from '../../../styles/colors';

// const RESERVED = 'RESERVED', OPEN = 'OPEN', CLOSED = 'CLOSED', BUSY = 'BUSY';
const COLOR_RESERVED = '#00897b', COLOR_OPEN = '#43a047', COLOR_CLOSED = '#e53935', COLOR_BUSY = '#fdd835';
const COLORS = { RESERVED: COLOR_RESERVED, OPEN: COLOR_OPEN, CLOSED: COLOR_CLOSED, BUSY: COLOR_BUSY };

const Order = (props) => (
    <TouchableOpacity style={styles.order} disabled={true} onPress={() => props.navigation.navigate('Products', { order: props })}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Pedido {props.number} - {props.state}</Text>
        <FlatList data={props.products} keyExtractor={p => p._id} renderItem={(product) => (
            <Text>{product.item.name} ({product.item.quantity})</Text>
        )} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    order: {
        backgroundColor: GREY,
        borderRadius: 10,
        margin: 10,
        marginBottom: 0,
        padding: 10
    }
});

export default Order;
