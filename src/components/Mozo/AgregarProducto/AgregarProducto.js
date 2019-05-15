import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import { View, StyleSheet, TouchableOpacity, Modal, Text, FlatList, Button } from 'react-native';
import { BLUE, FONT_COLOR_WHITE, GREY } from '../../../resources/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Opciones from '../Opciones/Opciones';
import { connect } from 'react-redux';

class AgregarProducto extends Component {

    constructor(props) {
        super(props);
        this.state = { stack: [], agregados: [], agregadosTotales: [], producto: null };
        this.handleOnPressButton = this.handleOnPressButton.bind(this);
        this.handleVolver = this.handleVolver.bind(this);
        this.handleCerrar = this.handleCerrar.bind(this);
        this.handleAgregado = this.handleAgregado.bind(this);
        this.handleAgregarProducto = this.handleAgregarProducto.bind(this);
        this.getLista();
    }

    contieneAgregados = (objeto) => {
        if (objeto[0] === undefined) return false;
        for (var i = 0; i < objeto.length; i++) {
            if (!objeto[i].agregado) return false;
            this.state.agregadosTotales.push(objeto[i]);
        }
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
        console.log(this.state.agregadosTotales);
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
                id = isProducto ? valores[i].id : null
            agregados = isProducto ? valores[i].agregados : null;
            nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
            newLista.push({ key: i, isProducto: isProducto, nombre: nombre, id: id, agregados: agregados });
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
        this.setState({ stack: stack });
        this.props.terminar();
    }

    handleAgregarProducto = (id) => {
        let producto = this.state.stack[this.state.stack.length - 1].lista.find(value => value.id === id);
        if (!producto.agregados) {
            this.props.onAddProducto({ id: id, add: [] });
            this.handleCerrar();
            return;
        }
        let agregadosStack = [];
        for (let i = 0; i < producto.agregados.length; i++) {
            let agregados = new Array();
            for (let b = 0; b < producto.agregados[i].length; b++) {
                let agregadoId = producto.agregados[i][b];
                agregados.push({
                    id: agregadoId, icono: 'plus',
                    titulo: this.state.agregadosTotales.find(value => value.id === agregadoId).nombre,
                    funcion: () => this.handleAgregado(agregadoId)
                });
            }
            agregadosStack.push(agregados);
        }
        console.log(agregadosStack);
        this.setState({ agregados: agregadosStack, producto: { id: id, add: [] } });
    }

    handleAgregado = (id) => {
        let producto = this.state.producto;
        let agregados = this.state.agregados;
        producto.add.push(id);
        agregados.shift();
        this.setState({ producto: producto, agregados: agregados });
        if (agregados.length > 0) return;
        this.props.onAddProducto(producto);
        this.handleCerrar();
    }

    render() {
        return (
            <Modal visible={this.props.visible} >
                <View style={styles.container}>
                    <NavBar titulo={this.state.stack[this.state.stack.length - 1].titulo} />
                    <View style={styles.lista}>
                        <FlatList
                            data={this.state.stack[this.state.stack.length - 1].lista}
                            keyExtractor={item => item.key.toString()}
                            renderItem={(info) => (
                                <TouchableOpacity disabled={info.item.isProducto} style={styles.item} onPress={() => this.handleOnPressButton(info.item.key)}>
                                    <Text style={styles.nombre}>{info.item.nombre}</Text>
                                    {(info.item.isProducto) ? (
                                        <TouchableOpacity style={styles.boton} onPress={() => this.handleAgregarProducto(info.item.id)}>
                                            <Icon name="plus" size={30} color={FONT_COLOR_WHITE} />
                                        </TouchableOpacity>
                                    ) : null}
                                </TouchableOpacity>
                            )} />
                    </View>
                    {(this.state.stack.length !== 1) ? (
                        <Button title="Volver" onPress={() => this.handleVolver()} />
                    ) : null}
                    <Button title="Cerrar" onPress={() => this.props.terminar()} />
                    <Opciones visible={this.state.agregados.length > 0} items={this.state.agregados[0]} cerrar={null} 
                    titulo={'Agregados ' + (this.state.producto === null ? '' : (this.state.agregados.length + this.state.producto.add.length > 1 ? '(' + (this.state.producto.add.length + 1).toString() + ')' : ''))} />
                </View>
            </Modal>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        justifyContent: 'space-between'
    },
    lista: {
        flex: 1,
        padding: 10,
        marginTop: 10
    },
    item: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: GREY,
        borderRadius: 10
    },
    nombre: {
        padding: 15,
        flex: 1,
        fontSize: 25
    },
    boton: {
        height: 60,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: 1,
        backgroundColor: BLUE
    },
    textoBoton: {
        fontSize: 30,
        color: FONT_COLOR_WHITE,
    }
});

const mapStateToProps = state => {
    return {
        menu: state.mozo.menu
    };
}

export default connect(mapStateToProps, null)(AgregarProducto);