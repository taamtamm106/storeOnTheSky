import React from 'react'
import { View, TouchableOpacity, Image, Text, ScrollView } from 'react-native'
import RNAccountKit from 'react-native-facebook-account-kit'
import { connect } from 'react-redux'
import { updateAvatar, uploadLocalFile } from '../firebase/firebase'
import { ImagePicker, options } from '../imagepicker/imagepicker'
class Dashboard extends React.Component {


    handleLogout() {
        RNAccountKit.logout();
        this.props.dispatch({ type: 'LOG_OUT' });
    }

    async updateAvatar() {
        await ImagePicker.showImagePicker(options, async (response) => {
            if (response.didCancel || response.error || response.customButton) {
                //do nothing, image picker cancelled
            }
            else {
                const downloadLink = await uploadLocalFile(response.uri, this.props.user.uid);
                updateAvatar(this.props.user.uid, downloadLink);
                this.props.dispatch({ type: 'UPDATE_AVATAR', avatarUrl: downloadLink });
            }
        });
    }
    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'lightgray' }}>
                <View style={styles.topRow}>
                    <View style={styles.textFrame}>
                        <View style={{ paddingLeft: 10 }}>
                            <Text style={{ fontSize: 20 }}>{this.props.user.name}</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => this.updateAvatar()} >
                        <Image source={{ uri: this.props.user.avatarUrl.length === 0 ? "http://noithatmanhhe.com/images/site/no-image.jpg" : this.props.user.avatarUrl }} style={styles.avatar} />
                    </TouchableOpacity>
                </View>

                <View style={styles.middleRow}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('OrderHistory', { title: 'Order history' })}><Text>Order history</Text></TouchableOpacity>
                </View>
                <View style={styles.middleRow}>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('UpdateInfo', { title: 'Update info' })}
                    ><Text>Update info</Text></TouchableOpacity>
                </View >
                <View style={styles.middleRow}>
                    <TouchableOpacity style={styles.button} onPress={() => this.handleLogout()}>
                        <Text>Log out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.user }
}
export default connect(mapStateToProps)(Dashboard)

import { Dimensions, StyleSheet } from 'react-native'
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    topRow: {
        backgroundColor: 'gray',
        flexDirection: 'row',
        width: width,
        height: height * 0.9 * 0.15,
    },
    middleRow: {
        width: width,
        height: height * 0.9 * 0.15,
        borderBottomWidth: 1,
        borderColor: 'white',

    },
    button: {
        flex: 1,
        paddingLeft: 20,
        justifyContent: 'center'
    },
    textFrame: {
        width: width - height * 0.9 * 0.15,
        height: height * 0.9 * 0.15,
        justifyContent: 'center',
    },

    avatar: {
        width: height * 0.9 * 0.15,
        height: height * 0.9 * 0.15,
        borderRadius: height * 0.15 * 0.9 / 2,
    }
});