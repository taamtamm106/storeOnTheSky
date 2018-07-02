import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
class DetailScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('item').productName,
        };
    };

    async handleAddToCart(item) {
        if (this.props.logginStatus === true) {
            this.props.dispatch({ type: 'ADD_TO_CART', item: this.props.navigation.getParam('item') });
        }
        else {
            await this.props.dispatch({ type: 'REDIRECT_TO_LOG_IN', gobackScreen: this.props.navigation.getParam('mother') });
            this.props.navigation.navigate('User');
        }
    }

    render() {
        return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <View style={styles.detailScreen}>
                    <View style={styles.frame1}>
                        <View style={styles.imageFrame}>
                            <Image source={{ uri: this.props.navigation.getParam('item').productImageUrl }} style={styles.imageProps} />
                        </View>
                        <View style={styles.textFrame}>
                            <Text style={{ fontSize: 24 }}>{this.props.navigation.getParam('item').productName}</Text>
                            <Text style={{ fontSize: 24 }}>${this.props.navigation.getParam('item').productPrice}</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => this.handleAddToCart()}
                        style={styles.addToCartBar}>
                        <Text>ADD TO CART</Text>
                    </TouchableOpacity>

                    <View style={styles.desciption}>
                        <Text style={{ fontSize: 20 }}>Description: {this.props.navigation.getParam('item').productDescription}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const mapStateToProps = (state) => {
    return { logginStatus: state.logginStatus };
}
export default connect(mapStateToProps)(DetailScreen)

const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    detailScreen: {
        flex: 1,
        marginTop: 20,
    },
    addToCartBar: {
        width: width,
        height: height * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00ff00',
    },
    frame1: {
        width: width,
        height: height * 0.25,
        flexDirection: 'row',
    },
    imageFrame: {
        width: width * 0.4,
        height: height * 0.25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageProps: {
        flex: 0.8,
        aspectRatio: 1,
        resizeMode: 'contain',
    },
    textFrame: {
        width: width * 0.6,
        height: height * 0.25,
        justifyContent: 'center',
    },
    desciption: {
        paddingTop: 20,
        paddingLeft: 10,
    }

});