import React from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'

export default class FlatListItem extends React.Component {
    render() {
        return (

            <View style={this.props.index % 2 === 0 ? styles.evenItem : [styles.evenItem, styles.oddItem]}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail', { item: this.props.item, mother: 'Home' })}>
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

    evenItem: {
        height: width / 2 * 1.2,
        width: '50%',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: 'lightgreen',
        flexDirection: 'column'
    },
    oddItem: {
        borderRightWidth: 0,
        borderBottomWidth: 1,
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
        paddingLeft: '10%',
    },
    itemShortDescriptionText: {
        fontSize: 16,
    },
});