import React from 'react'
import { View, TouchableOpacity, StyleSheet, Text, TextInput, Modal } from 'react-native'
import { connect } from 'react-redux'
import UpdateInfoModal from './modal'
import { getUserInfo, updateUserInfo } from '../firebase/firebase'


class UpdateInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', phone: '', email: '', address: '', showModal: false, result: '' };
    }
    static navigationOptions = ({ navigation }) => {
        return { title: navigation.getParam('title') };
    }
    componentDidMount() {
        this.setState({
            name: this.props.user.name,
            phone: this.props.user.phone,
            email: this.props.user.email,
            address: this.props.user.address
        })
    }

    motherOfHandler(text, id) {
        switch (id) {
            case 0:
                this.setState({ name: text });
                break;
            case 1:
                this.setState({ phone: text });
                break;
            case 2:
                this.setState({ email: text });
                break;
            case 3:
                this.setState({ address: text });
                break;
            default:
        }
    }

    async updateInformation() {
        if (isNaN(this.state.phone) === true) {
            this.setState({ phone: 'Must be a number' });
            return;
        }
        if (this.state.name.length === 0 || this.state.phone.length === 0 || this.state.email.length === 0 || this.state.address.length === 0) {
            return;
        }
        await this.props.dispatch({
            type: 'UPDATE_INFO',
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address
        })
        updateUserInfo(this.props.user);
        this.setState({ showModal: true });
    }
    async closeModal() {
        await this.setState({ showModal: false });
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                {
                    [{ name: 'Name:', value: this.state.name },
                    { name: 'Phone:', value: this.state.phone },
                    { name: 'Email:', value: this.state.email },
                    { name: 'Address:', value: this.state.address }].map((obj, i) => (
                        <View key={i} style={i === 0 ? [styles.bigFrame, styles.firstFrame] : styles.bigFrame} >
                            <View style={styles.smallFrame1}>
                                <Text>{obj.name}</Text>
                            </View>
                            <View style={styles.TextInputFrame}>
                                <TextInput
                                    onSubmitEditing={(text) => this.motherOfHandler(text, i)}
                                    underlineColorAndroid={'transparent'}
                                    multiline={true}
                                    editable={true}
                                    placeholder={'Cant let this empty'}
                                    value={obj.value}
                                    onChangeText={(text) => this.motherOfHandler(text, i)}
                                    style={{ flex: 1 }}
                                />
                            </View>
                        </View>)
                    )
                }
                <View style={styles.updateFrame} >
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={styles.updateButton} onPress={() => this.updateInformation()}>
                            <Text style={{ fontSize: 24, color: 'white' }}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{}}>
                    <UpdateInfoModal showModal={this.state.showModal} closeModal={() => this.closeModal()} />
                </View>
            </View>
        )
    }
}
const mapStateToProps = (state) => {
    return { user: state.user };
}
export default connect(mapStateToProps)(UpdateInfo)


const styles = StyleSheet.create({
    firstFrame: {
        borderTopWidth: 0,
    },
    bigFrame: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: 'orange'
    },
    updateFrame: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderTopWidth: 0,
        backgroundColor: '#00ff00',
        flexDirection: 'row',
    },
    smallFrame1: {
        flex: 2,
        padding: 10,
    },
    TextInputFrame: {
        flex: 8,
    },
    updateButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});