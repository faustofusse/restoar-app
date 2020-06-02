import React from "react";
import { FlatList, View } from "react-native";
import Product from "../Items/Product";
import Category from "../Items/Category";

export default CategoriesList = (props) => (
  <View style={props.style}>
    <FlatList
      data={props.categories}
      keyExtractor={(item) => item._id}
      renderItem={(info) => (
        <Category
          id={info.item._id}
          name={info.item.name}
          onSelectCategory={() => props.onSelectCategory(info.item._id)}
        />
      )}
    />
  </View>
);
