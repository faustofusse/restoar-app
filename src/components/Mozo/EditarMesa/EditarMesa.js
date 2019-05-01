import React, { Component } from 'react';
import { View, StyleSheet, Button, Modal, Text, FlatList } from 'react-native';
import Producto from '../Producto/Producto';
import AgregarProducto from '../AgregarProducto/AgregarProducto';
import { connect } from 'react-redux';

class EditarMesa extends Component {

    constructor(props) {
        super(props);
        this.state = { stack: [], agregarProducto: false };
        this.handleOnPressButton = this.handleOnPressButton.bind(this);
        this.handleVolver = this.handleVolver.bind(this);
        this.handleCerrar = this.handleCerrar.bind(this);
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
        this.state.stack.push({ valor: valores, lista: newLista, titulo: "Menu", inicio: true });
    }

    handleOnPressButton = (key) => {
        let stack = this.state.stack,
            titulo = stack[stack.length - 1].lista[key].nombre,
            valoresActuales = stack[stack.length - 1].valor,
            valores = Array.isArray(valoresActuales) ? valoresActuales[key] : valoresActuales[titulo.toLowerCase()],
            keys = Object.keys(valores),
            newLista = [];
        valores = Object.values(valores);
        for (var i = 0; i < valores.length; i++) {
            let isProducto = valores[i].id !== undefined,
                nombre = isProducto ? valores[i].nombre : keys[i],
                id = isProducto ? valores[i].id : null;
            nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
            newLista.push({ key: i, isProducto: isProducto, nombre: nombre, id: id });
        }
        stack.push({ valor: valores, lista: newLista, titulo: titulo });
        this.setState({ stack: stack });
    }

    handleVolver = () => {
        let stack = this.state.stack;
        stack.pop();
        this.setState({ stack: stack })
    }

    handleCerrar = () => {
        let stack = [this.state.stack[0]];
        this.setState({ stack: stack, agregarProducto: false });
    }

    render() {
        return (
            <Modal visible={this.props.mesa != null} animationType="slide">
                <View style={styles.container}>
                    <View style={styles.navbar}>
                        <Text style={styles.titulo}>Mesa {this.props.mesa}</Text>
                    </View>
                    <View style={styles.productos}>
                        {(!this.props.productos || this.props.productos.length === 0) ? (
                            <Text style={styles.textoInfo}>Esta mesa no tiene productos.</Text>
                        ) : (
                                <FlatList
                                    data={this.props.productos}
                                    keyExtractor={item => item.key.toString()}
                                    renderItem={(info) => (
                                        <Producto id={info.item.numero}
                                            nombre={info.item.nombre}
                                            cantidad={info.item.cantidad}
                                            onAddProducto={() => this.props.onAddProducto(info.item.key)}
                                            onRemoveProducto={() => this.props.onRemoveProducto(info.item.key)} />
                                    )} />
                            )}

                    </View>
                    <AgregarProducto agregarProducto={this.state.agregarProducto}
                        terminar={this.handleCerrar}
                        handleOnPressButton={this.handleOnPressButton}
                        titulo={this.state.stack[this.state.stack.length - 1].titulo}
                        lista={this.state.stack[this.state.stack.length - 1].lista}
                        volver={this.handleVolver}
                        inicio={this.state.stack.length === 1}
                        onAddProducto={(producto) => { this.props.onAddProducto(producto); this.handleCerrar(); }} />
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
        marginTop: 10,
        flexDirection: "column",
        justifyContent: "center",
    },
    textoInfo: {
        fontSize: 25,
        textAlign: "center",
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