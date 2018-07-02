import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, Text, View } from 'react-native'

export default class CategoryMenuFlatListItem extends React.Component {

    render() {
        return (
            <View style={this.props.index === 0 ? [styles.categoryButton, styles.firstItem] : styles.categoryButton}>
                <TouchableOpacity
                    style={this.props.obj.categoryID === this.props.cid ? [styles.button, styles.activeButton] : styles.button}
                    activeOpacity={0}
                    onPress={() => this.props.dispatch({ type: 'SET_CID', cid: this.props.obj.categoryID })} >
                    <Text>{this.props.obj.categoryName}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({

    firstItem: {
        borderTopWidth: 0,
    },
    categoryButton: {
        height: height * 0.15,
        borderTopWidth: 1,
        borderColor: 'white',
    },
    button: {
        flex: 1,
        paddingLeft: 5,
        justifyContent: 'center',
    },
    activeButton: {
        backgroundColor: 'white',
    }
});
