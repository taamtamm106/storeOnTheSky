import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'


export default class ProductItem extends React.Component {
    render() {
        return (

            <View style={styles.pItem}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', { item: this.props.item, mother: 'Category' })}>
                    <View style={styles.itemImageFrame}>
                        <Image source={{ uri: this.props.item.productImageUrl }} style={styles.image} />
                    </View>
                    <View style={styles.itemShortDescriptionFrame}>
                        <Text style={styles.itemShortDescriptionText}>Price: ${this.props.item.productPrice}</Text>
                        <Text style={styles.itemShortDescriptionText}>{this.props.item.productName}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({

    pItem: {
        height: width * 3 / 4 / 2 * 1.3,
        width: '50%',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: 'lightgray',
    },

    itemImageFrame: {
        height: '70%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 0.8,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    itemShortDescriptionFrame: {
        height: '30%',
        width: '100%',
        justifyContent: 'center',
        paddingLeft: '5%',
    },
    itemShortDescriptionText: {
        fontSize: 12,
    },
});