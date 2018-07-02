import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
export default class EmptyWorld extends React.Component {
    render() {
        return (
            <View style={styles.container} >
                <Text>Press the guys in your left</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});