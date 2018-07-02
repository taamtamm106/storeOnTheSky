import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

export default class FlatListItem extends React.Component {
    render() {
        return (
            <View key={this.props.index} style={styles.rowFrame}>
                <View style={styles.imgFrame}>
                    <Image source={{ uri: this.props.obj.item.productImageUrl }} style={styles.imgStyle} />
                </View>

                <View style={styles.contentFrame}>
                    <View style={styles.nameFrame}>
                        <Text style={{ fontSize: 20 }}>{this.props.obj.item.productName}</Text>
                        <Text style={{ fontSize: 20 }}>Price: ${this.props.obj.item.productPrice}</Text>
                    </View>
                    <View style={styles.priceFrame}>
                        <View style={styles.quanityFrame}>
                            <TouchableOpacity onPress={() => this.props.dispatch({ type: 'REMOVE_FROM_CART', item: this.props.obj.item })}>
                                <Icon name='trash-2' size={30} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.dispatch({ type: 'DECREASE', item: this.props.obj.item })}>
                                <Icon name='minus' size={30} />
                            </TouchableOpacity>

                            <View>
                                <Text style={{ fontSize: 24 }}> {this.props.obj.amount} </Text>
                            </View>

                            <TouchableOpacity onPress={() => this.props.dispatch({ type: 'ADD_TO_CART', item: this.props.obj.item })}>
                                <Icon name='plus' size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const { height, width } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    rowFrame: {
        width: width,
        height: height * 0.2,
        flexDirection: 'row',
        marginTop: 10,
    },
    imgFrame: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    imgStyle: {
        flex: 0.8,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    contentFrame: {
        width: width * 0.7,
        borderColor: 'lightgray',
        flexDirection: 'column',
    },
    nameFrame: {
        paddingLeft: 10,
        height: height * 0.1,
        justifyContent: 'center',
    },
    priceFrame: {
        width: width * 0.7,
        height: height * 0.1,
        justifyContent: 'center',
    },
    quanityFrame: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 10,
        paddingLeft: 10,
    }
});
