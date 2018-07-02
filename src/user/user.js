import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import Login from './login'
import Dashboard from './dashboard'
import { _retrieveData } from './../asyncstorage/asyncstorage'

class UserScreen extends React.Component {
    static navigationOptions = {
        header: null
    }

    async componentWillMount() {
        let status = await _retrieveData("logginStatus");
        if (status === "true") {
            let uid = await _retrieveData("uid");
            await this.props.dispatch({ type: 'LOGGIN_DETECTED', uid });
        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.props.logginStatus === true ?
                    <Dashboard navigation={this.props.navigation} /> : <Login navigation={this.props.navigation} />
                }
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return { logginStatus: state.logginStatus }
}
export default connect(mapStateToProps)(UserScreen)