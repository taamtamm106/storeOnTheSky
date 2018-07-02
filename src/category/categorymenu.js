import React from 'react'
import { FlatList, Dimensions } from 'react-native'
import { getList } from '../firebase/firebase'
import { connect } from 'react-redux'
import CategoryMenuFlatListItem from './menuitem'
const { height, widdth } = Dimensions.get('window')

class CategoryMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = { categoryList: [] };
    }

    async componentDidMount() {
        const arr = await getList("category");
        this.setState({ categoryList: arr });

    }
    render() {
        return (
            <FlatList
                ref={(ref) => { this.flatListRef = ref }}
                showsVerticalScrollIndicator={false}
                data={this.state.categoryList}
                keyExtractor={(item) => item.categoryID}
                numColumns={1}
                extraData={this.props.cid}
                renderItem={({ item, index }) => <CategoryMenuFlatListItem
                    cid={this.props.cid}
                    obj={item}
                    index={index}
                    navigation={this.props.navigation}
                    dispatch={this.props.dispatch}
                />}
            />
        );
    }
}
const mapStateToProps = (state) => {
    return { cid: state.cid };
}

export default connect(mapStateToProps)(CategoryMenu)


