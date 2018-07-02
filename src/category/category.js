import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import ProductList from './productlist'
import CategoryMenu from './categorymenu'

class CategoryScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.categoryArea}>
                    <CategoryMenu index={this.props.navigation.getParam('index') || 0} />
                </View>
                <View style={styles.productArea}>
                    <ProductList navigation={this.props.navigation} />
                </View>
            </View>
        );
    }
}

export default CategoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'white', flexDirection: 'row'
    },
    categoryArea: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'lightgray',
    },
    productArea: {
        flex: 3,
        backgroundColor: 'white'
    },
});