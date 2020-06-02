import React from 'react';
import { FlatList, View } from 'react-native';
import Product from '../Items/Product';

export default ProductsList = (props) => (
    <View style={props.style}>
        <FlatList
            data={props.products}
            keyExtractor={item => item._id}
            renderItem={(info) => (
                <Product id={info.item._id}
                    name={info.item.name}
                    quantity={info.item.quantity}
                    onAddProduct={() => props.onAddProduct(info.item._id)}
                    onRemoveProduct={() => props.onRemoveProduct(info.item._id)} />
            )} />
    </View>
);