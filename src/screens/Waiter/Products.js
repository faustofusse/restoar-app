import React, { Component } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';

class Products extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Productss de la mesa {this.props.navigation.getParam('table')}</Text>
            </View>
        )
    }
}

export default Products;