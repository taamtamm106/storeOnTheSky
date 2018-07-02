import React, { Component } from 'react';
import { Modal, Text, TouchableOpacity, View, StatusBar } from 'react-native';

export default class UpdateInfoModal extends Component {
    render() {
        StatusBar.setHidden(true);
        return (
            <Modal
                onRequestClose={() => { this.props.closeModal() }}
                animationType="fade"
                transparent={false}
                visible={this.props.showModal}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Successfully update</Text>
                    <TouchableOpacity
                        onPress={() => {                    
                            this.props.closeModal();
                        }}>
                        <Text>Ok</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}