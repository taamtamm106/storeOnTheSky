import React from 'react'
import { View, Text,  TextInput, StyleSheet } from 'react-native'

export default class DeliveryInfo extends React.Component {
    render() {
        return (
            <View style={styles.rowFrame}>
                <View style={{ flex: 2, paddingLeft: 10 }}>
                    <Text>{this.props.title}: </Text>
                </View>
                <View style={{ flex: 8 }} >
                    <TextInput
                        value={this.props.value}
                        editable={true}
                        multiline={true}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(text) => this.props.motherOfTextHandler(text, this.props.title)}
                        onSubmitEditing={(text) => this.props.motherOfTextHandler(text, this.props.title)}
                        placeholder={this.props.pHolder}
                    />
                </View>
            </View >
        );
    }
}

export const styles = StyleSheet.create({
    rowFrame: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgb(75,244,11)'
    },
});