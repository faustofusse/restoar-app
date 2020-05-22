import React from 'react';
import { TouchableOpacity, StyleSheet, Text, FlatList, View } from 'react-native';
import { ACCENT, FONT_COLOR_WHITE, GREY, GREEN } from '../../../styles/colors';
import InsetShadow from 'react-native-inset-shadow';
import Icon from 'react-native-vector-icons/FontAwesome';

// const RESERVED = 'RESERVED', OPEN = 'OPEN', CLOSED = 'CLOSED', BUSY = 'BUSY';
const COLOR_RESERVED = '#00897b', COLOR_OPEN = '#43a047', COLOR_CLOSED = '#e53935', COLOR_BUSY = '#fdd835';
const COLORS = { RESERVED: COLOR_RESERVED, OPEN: COLOR_OPEN, CLOSED: COLOR_CLOSED, BUSY: COLOR_BUSY };

const Order = (props) => (
    <View style={styles.container}>
        <TouchableOpacity style={styles.order} disabled={true} onPress={() => props.navigation.navigate('Products', { order: props })}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Pedido {props.number} - {props.state}</Text>
            <FlatList data={props.products} keyExtractor={p => p._id} renderItem={(product) => (
                <Text>{product.item.name} ({product.item.quantity})</Text>
            )} />
        </TouchableOpacity>
        { props.showButton ? (
            <InsetShadow elevation={4} right={false} top={false} bottom={false}>
                <TouchableOpacity style={styles.button} onPress={() => props.orderDone(props)}>
                    <Icon name={'check'} style={{color:FONT_COLOR_WHITE, fontSize: 20}}/>
                </TouchableOpacity>
            </InsetShadow>
        ) : null }
    </View>
);

const styles = StyleSheet.create({
    container:{
        backgroundColor: GREY,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent:"space-between",
        //shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1
    },
    order: {
        marginBottom: 0,
        padding: 10,
    },
    button:{
        flex: 1, 
        alignSelf: 'center',
        backgroundColor: GREEN,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15
    }
});

export default Order;
