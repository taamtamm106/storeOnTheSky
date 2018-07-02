import React from 'react'
import { View, FlatList } from 'react-native'
import { categorySearch } from './../firebase/firebase'
import { connect } from 'react-redux'
import ProductItem from './productitem'
import EmptyWorld from './emptyworld'

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { whatToRender: [] };
    }
    async componentDidMount() {
        if (this.props.cid !== null) {
            try {
                let arr = await categorySearch(this.props.cid);
                this.setState({ whatToRender: arr });
            }
            catch (error) {
                //do nothing
            }
        }
    }
    async componentWillReceiveProps(nextProps) {
        if (nextProps.cid !== this.props.cid) {
            try {
                let arr = await categorySearch(nextProps.cid);
                this.setState({ whatToRender: arr });
            }
            catch (error) {
                //do nothing
            }
        }
    }


    render() {
        return (
            <View style={{ flex: 1 }} >
                {this.props.cid === null ? <EmptyWorld /> :
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.whatToRender}
                        keyExtractor={(item) => item.productID}
                        numColumns={2}
                        renderItem={({ item, index }) => <ProductItem
                            item={item}
                            index={index}
                            navigation={this.props.navigation}
                        />}
                    />
                }

            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return { cid: state.cid };
}

export default connect(mapStateToProps)(ProductList)
