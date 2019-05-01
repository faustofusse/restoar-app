import React, { Component } from 'react';
import { View, StyleSheet, Button, Modal, Text, FlatList } from 'react-native';
import Producto from '../Producto/Producto';
import AgregarProducto from '../AgregarProducto/AgregarProducto';
import { connect } from 'react-redux';
import { addProducto, removeProducto } from '../../../actions/index';

class EditarMesa extends Component {

    constructor(props) {
        super(props);
        this.state = { lista: [], agregarProducto: false };
        this.handleOnPressButton = this.handleOnPressButton.bind(this);
        this.handleVolver = this.handleVolver.bind(this);
        this.getLista();
    }

    contieneAgregados = (objeto) => {
        if (objeto[0] === undefined) return false;
        for (var i = 0; i < objeto.length; i++)
            if (!objeto[i].agregado)
                return false;
        return true;
    }

    getLista = () => {
        let menu = this.props.menu,
            lista = Object.keys(menu),
            valores = Object.values(menu),
            newLista = [];
        for (var i = 0; i < lista.length; i++) {
            let nombre = lista[i].charAt(0).toUpperCase() + lista[i].slice(1);
            if (!this.contieneAgregados(valores[i]))
                newLista.push({ key: i, nombre: nombre })
        }
        this.state.lista.push({ valor: valores, lista: newLista, titulo: "Menu", inicio: true });
    }

    handleOnPressButton = (key) => {
        let lista = this.state.lista,
            titulo = lista[lista.length - 1].lista[key].nombre,
            valoresActuales = lista[lista.length - 1].valor,
            valores = Array.isArray(valoresActuales) ? valoresActuales[key] : valoresActuales[titulo.toLowerCase()],
            keys = Object.keys(valores),
            newLista = [];
        valores = Object.values(valores);
        for (var i = 0; i < valores.length; i++) {
            let isProducto = valores[i].id !== undefined,
                nombre = isProducto ? valores[i].nombre : keys[i];
            nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
            newLista.push({ key: i, isProducto: isProducto, nombre: nombre });
        }
        lista.push({ valor: valores, lista: newLista, titulo: titulo });
        this.setState({ lista: lista });
    }

    handleVolver = () => {
        let lista = this.state.lista;
        lista.pop();
        this.setState({ lista: lista })
    }

    render() {
        return (
            <Modal visible={this.props.mesa != null} animationType="slide">
                <View style={styles.container}>
                    <View style={styles.navbar}>
                        <Text style={styles.titulo}>Mesa {this.props.mesa}</Text>
                    </View>
                    <View style={styles.productos}>
                        <FlatList
                            data={this.props.productos}
                            keyExtractor={item => item.key.toString()}
                            renderItem={(info) => (
                                <Producto id={info.item.numero}
                                    nombre={info.item.nombre}
                                    cantidad={info.item.cantidad}
                                    onAddProducto={() => this.props.handleOnAddProducto(info.item.key)}
                                    onRemoveProducto={() => this.props.handleOnRemoveProducto(info.item.key)} />
                            )} />
                    </View>
                    <AgregarProducto agregarProducto={this.state.agregarProducto}
                        terminar={() => this.setState({ agregarProducto: false })}
                        handleOnPressButton={this.handleOnPressButton}
                        titulo={this.state.lista[this.state.lista.length - 1].titulo}
                        lista={this.state.lista[this.state.lista.length - 1].lista}
                        volver={this.handleVolver} 
                        inicio={this.state.lista.length === 1}/>
                    <Button title="Agregar Producto" onPress={() => this.setState({ agregarProducto: true })} />
                    <Button title="Cerrar" onPress={() => this.props.terminar()} />
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        justifyContent: 'space-between'
    },
    navbar: {
        width: "100%",
        backgroundColor: '#b71c1c',
        padding: 20,
        // ios
        shadowOffset: { width: 0, height: 13 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        // android (Android +5.0)
        elevation: 5,
    },
    titulo: {
        color: '#fff',
        fontSize: 30,
        marginLeft: 20
    },
    productos: {
        flex: 1,
        width: "100%",
        padding: 10,
        marginTop: 10
    }
});

const mapStateToProps = state => {
    return {
        menu: state.mozo.menu
    };
}

const mapDispatchToProps = dispatch => {
    return {
        // onAddProducto: (producto) => dispatch(addProducto(producto)),
        // onRemoveProducto: (producto) => dispatch(removeProducto(producto))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditarMesa);