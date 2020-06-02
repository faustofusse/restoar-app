import React from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { BLUE, DARK_GREY, GREY, RED } from '../../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';

const Category = (props) => (
    <View style={styles.container}>
       <TouchableOpacity style={styles.category} onPress={props.onSelectCategory}>
            <Text style={styles.name}>{props.name}</Text>
            <View style={{height:'100%', display:'flex', flexDirection:'row', alignItems:'center'}}>
                <Icon name={'chevron-right'} size={15} style={{ marginRight: 15, color: '#9e9e9e', display: 'flex', alignContent:'center', alignItems:'center', textAlign:'center' }} />
            </View>
        </TouchableOpacity>
    </View>
);

const styles = StyleSheet.create({
    container: {
        margin: 10,
        marginBottom: 0,
        flexDirection: 'column',
        alignItems: 'center'
    },
    category: {
        // width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: 10,
        backgroundColor: GREY,
        borderRadius: 10
    },
    name: {
        padding: 15,
        flex: 1,
        fontSize: 18
    },
});

export default Category;