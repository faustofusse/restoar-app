import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import { View, StyleSheet, TouchableOpacity, Modal, Text, FlatList, Button } from 'react-native';
import { BLUE, FONT_COLOR_WHITE, GREY } from '../../../styles/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Opciones from '../Opciones/Opciones';
import { connect } from 'react-redux';

const LISTA_INICIAL = [{ _id: '1', nombre: 'Bebidas' }, { _id: '2', nombre: 'Menu' }];
const STATE_INICIAL = {
    tipo: null, categoria: null, nivel: 1,
    lista: LISTA_INICIAL, titulo: 'Carta',
    producto: null, agregados: []
};

class AgregarProducto extends Component {

    constructor(props) {
        super(props);
        this.state = STATE_INICIAL;
        this.reiniciar = this.reiniciar.bind(this);
        this.handleVolver = this.handleVolver.bind(this);
        this.handleCerrar = this.handleCerrar.bind(this);
        this.handleAvanzar = this.handleAvanzar.bind(this);
        this.actualizarLista = this.actualizarLista.bind(this);
        this.handleAddProducto = this.handleAddProducto.bind(this);
    }

    reiniciar = () => this.setState(STATE_INICIAL);

    actualizarLista = () => {
        let lista = [],
            titulo = 'Carta';
        switch (this.state.nivel) {
            case 1: lista = [{ _id: '1', nombre: 'Bebidas' }, { _id: '2', nombre: 'Menu' }]; break;
            case 2: lista = this.props.menu.categorias.filter(element => element.tipo === this.state.tipo); 
                    titulo = this.state.tipo; break;
            case 3: lista = this.props.menu.productos.filter(element => element.categoria === this.state.categoria); 
                    titulo = this.props.menu.categorias.find(value => value._id === this.state.categoria).categoria; break;
        }
        console.log('Lista nivel 2:');
        console.log(lista);
        this.setState({ lista, titulo });
    }

    handleAvanzar = (id) => {
        let tipo = this.state.tipo, categoria = this.state.categoria, nivel = this.state.nivel + 1;
        if (this.state.nivel === 1)
            tipo = this.state.lista.find(value => value._id === id).nombre;
        else
            categoria = this.state.lista.find(value => value._id === id)._id;
        this.setState({ tipo, categoria, nivel }, this.actualizarLista);
    }

    handleVolver = () => {
        this.setState(prevState => ({ nivel: prevState.nivel - 1 }),
            () => this.actualizarLista());
    }

    handleCerrar = (producto) => {
        this.reiniciar();
        if (producto !== null) this.props.onAddProducto(producto);
        this.props.terminar();
    }

    handleAddProducto = (id) => {
        let agregados = [],
            producto = id;
        this.props.menu.agregados.forEach(element => {
            if (element.producto === id)
                agregados.push({
                    id: element.opcion, icono: 'plus',
                    titulo: this.props.menu.opciones.find(value => value._id === element.opcion).nombre,
                    funcion: () => this.handleCerrar({ _id: id, agregado: element.opcion })
                });
        });
        if (agregados.length === 0) {
            this.handleCerrar({ _id: id, agregado: null });
            return;
        }
        this.setState({ agregados, producto });
    }

    render() {
        return (
            <Modal visible={this.props.visible} >
                <View style={styles.container}>
                    <NavBar titulo={this.state.titulo} />
                    <View style={styles.lista}>
                        <FlatList
                            data={this.state.lista}
                            keyExtractor={item => item._id}
                            renderItem={(info) => (
                                <TouchableOpacity disabled={this.state.nivel === 3} style={styles.item} onPress={() => this.handleAvanzar(info.item._id)}>
                                    <Text style={styles.nombre}>{this.state.nivel === 2 ? info.item.categoria : info.item.nombre}</Text>
                                    {(this.state.nivel === 3) ? (
                                        <TouchableOpacity style={styles.boton} onPress={() => this.handleAddProducto(info.item._id)}>
                                            <Icon name="plus" size={30} color={FONT_COLOR_WHITE} />
                                        </TouchableOpacity>
                                    ) : null}
                                </TouchableOpacity>
                            )} />
                    </View>
                    {(this.state.nivel !== 1) ? (
                        <Button title="Volver" onPress={() => this.handleVolver()} />
                    ) : null}
                    <Button title="Cerrar" onPress={() => this.handleCerrar(null)} />
                    <Opciones visible={this.state.agregados.length > 0} items={this.state.agregados} cerrar={null}
                        titulo={'Agregado:'} />
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