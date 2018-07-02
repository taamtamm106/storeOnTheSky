import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { getOrderHistory } from '../firebase/firebase'
import FlatListItem from './flatlistitem'
class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = { order: [] };
    }
    static navigationOptions = ({ navigation }) => {
        return { title: navigation.getParam('title') };
    }

    async componentWillMount() {
        const bb = await getOrderHistory(this.props.user.uid);
        if (bb !== null) {
            await this.setState({ order: bb });
        }
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.order}
                    keyExtractor={(item, index) => item.timestamp}
                    renderItem={({ item, index }) => <FlatListItem
                        item={item}
                        index={index}
                    />}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.user };
}

export default connect(mapStateToProps)(OrderHistory)

const styles = StyleSheet.create({
    orderFrame: {
        flex: 3,
    },
    emptyWorld: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: 20,
    }
});