import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Mesa from '../Mesa/Mesa';

const ListaMesas = (props) => (
    <FlatList style={styles.mesas}
        data={props.mesas}
        keyExtractor={item => item.key.toString()}
        renderItem={(info) => (
            <Mesa numero={info.item.numero} 
                onPress={() => props.onMesaSeleccionada(info.item.numero)}>
            </Mesa>
    )} />
);

const styles = StyleSheet.create({
    mesas:{
        width: "100%",
        padding: 10
    }
});

export default ListaMesas;
