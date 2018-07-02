import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default class FlatListItem extends React.Component {
    render() {
        return (
            <View key={this.props.index} style={styles.bigFrame}>
                <View style={styles.timeFrame}>
                    <Text>{(new Date(parseInt(this.props.item.timestamp))).toLocaleString()}</Text>
                </View>
                {this.props.item.cart.map((obj, i) => (
                    <View key={i} style={styles.listFrame} >
                        <View style={styles.nameFrame}>
                            <Text>Name : {obj.item.productName}</Text>
                        </View>
                        <View style={styles.quanityFrame}>
                            <Text style={{}}>Quanity: {obj.amount}</Text>
                        </View>
                    </View>))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    bigFrame: {
        borderBottomWidth: 1,
        borderColor: 'lightgray',
    },
    listFrame: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    timeFrame: {
        padding: 10,
    },
    nameFrame: {
        flex: 7,
        paddingLeft: 20,
    },
    quanityFrame: {
        flex: 3,
    }
})