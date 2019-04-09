import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import Mesa from '../Mesa/Mesa';

onPressMesa = (numero) => {
    alert(numero);
}

const ListaMesas = (props) => (
    <FlatList style={styles.mesas}
        data={props.mesas}
        keyExtractor={item => item.key.toString()}
        renderItem={(info) => (
            <Mesa numero={info.item.numero} onPress={onPressMesa}></Mesa>
    )} />
);

const styles = StyleSheet.create({
    mesas:{
        width: "100%",
        padding: 10
    }
});

export default ListaMesas;
