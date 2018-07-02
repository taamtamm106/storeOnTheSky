import React from 'react'
import { Text, View, FlatList } from 'react-native'
import { connect } from 'react-redux'
import FlatListItem from '../home/flatlistitem'
import { stringSearch, categorySearch } from '../firebase/firebase'

class SearchScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { whatToRender: [] };
    }

    async componentWillMount() {
        let arr = [];
        if (this.props.navigation.getParam('type') === 'category') {
            arr = await categorySearch(this.props.navigation.getParam('id'));
            console.log(arr);
        }
        else {
            arr = await stringSearch(this.props.navigation.getParam('string'));
        }
        await this.setState({ whatToRender: arr });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('title'),
        };
    };
    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.whatToRender}
                    keyExtractor={(item) => item.productID}
                    numColumns={2}
                    renderItem={({ item, index }) => <FlatListItem
                        item={item}
                        index={index}
                        navigation={this.props.navigation}
                    />}
                />
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {};
}
export default connect(mapStateToProps)(SearchScreen)