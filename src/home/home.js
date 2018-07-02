import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import SearchBox from './searchbox'
import ProductList from './productlist'
import { getUserInfo, updateUserInfo } from '../firebase/firebase'
import { _retrieveData, _storeData } from './../asyncstorage/asyncstorage'

class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    }
    async componentDidMount() {
        let status = await _retrieveData("logginStatus");
        if (status === "true") {
            let uid = await _retrieveData("uid");
            this.props.dispatch({ type: 'LOGGIN_DETECTED' });
            this.props.dispatch({ type: 'SET_UID', uid });
            let obj = await getUserInfo(parseInt(this.props.user.uid));
            if (obj) {
                this.props.dispatch({ type: 'SAVE_INFO_LOADED_FROM_DB', userObj: obj });
            }
            else {
                updateUserInfo(this.props.user);
            }
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <SearchBox dispatch={this.props.dispatch} navigation={this.props.navigation} />
                </View>
                <View style={{ flex: 8 }}>
                    <ProductList
                        navigation={this.props.navigation}
                        dispatch={this.props.dispatch} />
                </View>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return { user: state.user };
}
export default connect(mapStateToProps)(HomeScreen)