import React from 'react'
import { Modal, StatusBar, View, Text, TouchableOpacity } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

export default class CheckOutModal extends React.Component {
    render() {
        StatusBar.setHidden(true);
        return (
            <Modal
                onRequestClose={() => { this.props.closeModal() }}
                animationType="fade"
                transparent={false}
                visible={this.props.show}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Thanks for choosing us, all items will be deliveried soon.</Text>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.closeModal();
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'Review' })],
                            });
                            this.props.navigation.dispatch(resetAction);
                        }}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}