import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import RNAccountKit from 'react-native-facebook-account-kit'
import LogginButton from './logginbutton'
import { getUserInfo, updateUserInfo, updateAvatar } from '../firebase/firebase'
import { _storeData } from './../asyncstorage/asyncstorage'
import { connect } from 'react-redux'


class Login extends React.Component {
    static navigationOptions = {
        header: null
    }
    async getInfoByToken(LoginGetBack, type) {

        if (this.props.fromSomewhereThatNeedLogIn === true) {
            await this.props.navigation.navigate(this.props.gobackScreen);
            this.props.dispatch({ type: 'REMOVE_REDIREC_TO_LOG_IN' });
        }
        await this.props.dispatch({ type: 'LOGGIN_DETECTED' });
        let response = await fetch(`https://graph.accountkit.com/v1.3/me/?access_token=${LoginGetBack.token}`);
        response = await response.json();
        await _storeData("uid", response.id);
        await _storeData("logginStatus", "true");

        this.props.dispatch({ type: 'SET_UID', uid: response.id });

        switch (type) {
            case "phone":
                this.props.dispatch({ type: 'UPDATE_INFO', phone: response.phone.number });
                break;
            case "email":
                this.props.dispatch({ type: 'UPDATE_INFO', email: response.email.address });
                break;
            default:
        }
    }

    FBLogginSDK = async (type) => {
        try {
            const getBack = type === "phone" ? await RNAccountKit.loginWithPhone() : await RNAccountKit.loginWithEmail();
            this.getInfoByToken(getBack, type);
        }
        catch (error) {
            //do nothing
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontSize: 24 }}>You are not logged in</Text>
                <LogginButton colors={['#00ff00', '#00ff00']} onPress={() => this.FBLogginSDK("phone")} title={'Log in via phone number'} />
                <LogginButton colors={['#ff9900', '#ffcc00']} onPress={() => this.FBLogginSDK("email")} title={'Log in via email address'} />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return { fromSomewhereThatNeedLogIn: state.fromSomewhereThatNeedLogIn, gobackScreen: state.gobackScreen };
}
export default connect(mapStateToProps)(Login)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
})