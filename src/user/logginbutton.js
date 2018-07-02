import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native'
import RNAccountKit from 'react-native-facebook-account-kit'
import LinearGradient from 'react-native-linear-gradient';

export default class LogginButton extends React.Component {
    render() {
        return (
            <LinearGradient colors={this.props.colors} style={{ marginTop: 10 }}>
                <TouchableOpacity
                    onPress={() => this.props.onPress()}
                    style={styles.logginButton}>
                    <Text>{this.props.title}</Text>
                </TouchableOpacity>
            </LinearGradient>
        );
    }
}
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    logginButton: {
        width: width * 0.7,
        height: height * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
    },
})