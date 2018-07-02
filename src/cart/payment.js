import React from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import DeliveryInfo from './deliveryinfo'
import CheckOutModal from './modal'
import { getLocation } from './../location/location'
import { sendOrder } from '../firebase/firebase'

class MakeAPayMent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Name: null, Phone: null, Email: null, Address: null, show: false };
    }
    componentWillMount() {
        this.setState({
            Name: this.props.user.name,
            Phone: this.props.user.phone,
            Email: this.props.user.email,
            Address: this.props.user.address
        })
    }
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title'),
        };
    }
    async getCurrentLocation() {
        const cl = await getLocation();
        this.setState({ Address: cl });
    }

    motherOfTextHandler(text, type) {
        switch (type) {
            case "Name":
                this.setState({ Name: text });
                break;
            case "Phone":
                this.setState({ Phone: text });
                break;
            case "Email":
                this.setState({ Email: text });
                break;
            case "Address":
                this.setState({ Address: text });
                break;
            default:
        }
    }
    saveOrder() {
        this.controlModal(true);
        sendOrder(this.props.user.uid, this.props.Cart);
        this.props.dispatch({ type: 'EMPTY_CART' });
    }

    controlModal(visible) {
        this.setState({ show: visible });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.infoFrame}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Delivery infomation</Text>
                </View>
                {
                    [{ title: "Name", value: this.state.Name },
                    { title: "Phone", value: this.state.Phone },
                    { title: "Email", value: this.state.Email },
                    ].map((obj, i) => (
                        <DeliveryInfo
                            key={i}
                            title={obj.title}
                            value={obj.value}
                            motherOfTextHandler={() => this.motherOfTextHandler()}
                            pHolder={"Cant let this empty"}
                        />
                    ))
                }
                <View style={styles.addressFrame}>
                    <View style={{ flex: 2, paddingLeft: 10, justifyContent: 'center' }}>
                        <Text>Address: </Text>
                    </View>
                    <View style={{ flex: 6, justifyContent: 'center' }} >
                        <TextInput
                            value={this.state.Address}
                            editable={true}
                            multiline={true}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(text) => this.motherOfTextHandler(text, "Address")}
                            onSubmitEditing={(text) => this.motherOfTextHandler(text, "Address")}
                            placeholder={"Press icon to get current location"}
                            style={{ flex: 1 }}
                        />
                    </View>
                    <View style={styles.locationIcon} >
                        <TouchableOpacity onPress={() => this.getCurrentLocation()}>
                            <Icon name="location-on" size={30} />
                        </TouchableOpacity>
                    </View>
                </View >
                <TouchableOpacity style={styles.confirmFrame} onPress={() => this.saveOrder()}>
                    <Text>Confirm</Text>
                </TouchableOpacity>
                <CheckOutModal show={this.state.show} closeModal={() => this.controlModal(false)} navigation={this.props.navigation} />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return { Cart: state.Cart, user: state.user };

}
export default connect(mapStateToProps)(MakeAPayMent)

export const styles = StyleSheet.create({
    infoFrame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(75,244,11)'
    },
    addressFrame: {
        flex: 2,
        flexDirection: 'row',
    },
    confirmFrame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(75,244,11)'
    },
    locationIcon: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    }
});