import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Mesa from '../Mesa/Mesa';

const ListaMesas = (props) => (
    <View style={styles.mesas}>
        <FlatList data={props.mesas}
            keyExtractor={item => item.numero.toString()}
            renderItem={(info) => (
                <Mesa numero={info.item.numero}
                    onPress={() => props.onMesaSeleccionada(info.item.numero)}>
                </Mesa>
            )} />
    </View>
);

const styles = StyleSheet.create({
    mesas: {
        width: "100%",
        padding: 10
    }
});

export default ListaMesas;
