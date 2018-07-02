import React from 'react'
import { connect } from 'react-redux'
import FlatListItem from './flatlistitem'
import { View, FlatList, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'


class CartScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    async handleRedirectToLogin() {
        await this.props.dispatch({ type: 'REDIRECT_TO_LOG_IN', gobackScreen: 'Cart' });
        this.props.navigation.navigate('User');
    }
    render() {
        return (
            <View style={styles.container}>
                {this.props.logginStatus === true ?
                    <View>
                        <Text style={{ fontSize: 22, padding: 10 }}>
                            {this.props.Cart.map(obj =>
                                obj.amount).reduce(function (accumulator, currentValue) { return accumulator + currentValue; }, 0)}
                            <Text> item added to cart</Text>
                        </Text>
                        <Text style={{ fontSize: 22, padding: 10 }}>Total cost: ${this.props.Cart.map(obj => obj.amount * obj.item.productPrice).reduce(function (accumulator, currentValue) { return accumulator + currentValue; }, 0)
                        }</Text>
                        {this.props.Cart.length > 0 ?
                            <View>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('Payment', { title: 'Process to checkout', navigation: this.props.navigation })}
                                    style={styles.checkOutButton}>
                                    <Text>Process to checkout</Text>
                                </TouchableOpacity>

                                <FlatList
                                    data={this.props.Cart}
                                    keyExtractor={(item, index) => item.item.productID}
                                    numColumns={1}
                                    renderItem={({ item, index }) => <FlatListItem
                                        obj={item}
                                        index={index}
                                        dispatch={this.props.dispatch} />
                                    }
                                />
                            </View> : <View />
                        }
                    </View> :
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <TouchableOpacity onPress={() => this.handleRedirectToLogin()}><Text>Press to login first</Text></TouchableOpacity>
                    </View>
                }

            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return { Cart: state.Cart, logginStatus: state.logginStatus };
}
export default connect(mapStateToProps)(CartScreen)
const { height, width } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },

    checkOutButton: {
        backgroundColor: '#ff9900',
        width: width,
        height: height * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
    },

});