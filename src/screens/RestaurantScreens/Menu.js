import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { connect } from "react-redux";
import ProductsList from "../../components/Restaurant/Lists/ProductsList";
import CategoriesList from "../../components/Restaurant/Lists/CategoriesList";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import Category from "../../components/Restaurant/Items/Category";
import Product from "../../components/Restaurant/Items/Product";
import { ACCENT } from "../../styles/colors";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.menu.categories, 
      isInModal: this.props.onAddProduct !== undefined,
      categories: true,
      products: this.props.menu.products,
      categories: this.props.menu.categories,
    }
  console.log(this.state.isInModal);
  this.onSelectCategory = this.onSelectCategory.bind(this);
  }

  onSelectCategory(category) {
    console.log(category.name);
    let products = this.props.menu.products.filter(p=>p.categories.includes(category));
    this.setState({items: products, categories: false});
  }

  render() {
    return (
      <View style={[(this.props.style !== undefined ? this.props.style : {}), (this.state.isInModal ? {maxHeight: '100%'} : {height:'100%'})]}>
        <FlatList
            style={{paddingBottom: 10}}
            data={this.state.items}
            keyExtractor={item => item._id}
            renderItem={(info) => this.state.categories ? (
                <Category
                  id={info.item._id}
                  name={info.item.name}
                  onSelectCategory={() => this.onSelectCategory(info.item._id)} />
              ):(
                <Product id={info.item._id} name={info.item.name} onAddProduct={this.props.onAddProduct}/>
              )}
           />
           {!this.state.categories ? (
             <TouchableOpacity style={[styles.back,(this.state.isInModal ? {borderBottomLeftRadius: 10, borderBottomRightRadius: 10} : {})]} onPress={() => this.setState({categories: true, items: this.props.menu.categories})}>
               <Text style={styles.backText}>Atras</Text>
             </TouchableOpacity>
           ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    left: 0,
    bottom: 0,
    width: '100%',
    padding: 15,
    backgroundColor: ACCENT
  },
  backText:{
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  }
});

const mapStateToProps = state => {
  return {
    restaurants: state.restaurants.restaurants,
    menu: state.restaurants.restaurants.find(r=>r._id===state.restaurants.active).menu,
    active: state.restaurants.active,
    user: state.user
  };
};

export default connect(mapStateToProps, null)(Menu);
