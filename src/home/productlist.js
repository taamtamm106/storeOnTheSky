import React from 'react'
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import FlatListItem from './flatlistitem'
import { getList } from '../firebase/firebase'

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { categoryList: [], productList: [] };
    }
    async componentDidMount() {
        const cList = await getList("category");
        const pList = await getList("products");
        this.setState({ categoryList: cList, productList: pList });
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: 'white' }} showsVerticalScrollIndicator={false}>
                {
                    this.state.categoryList.map((obj, i) => (
                        <View key={i}>
                            <TouchableOpacity onPress={() => {
                                this.props.dispatch({ type: 'SET_CID', cid: obj.categoryID });
                                this.props.navigation.navigate('Category', { index: i })
                            }}>
                                <Text style={{ fontSize: 26, margin: 10 }}>{obj.categoryName}</Text></TouchableOpacity>
                            <View style={{
                                borderBottomWidth: 1,
                                borderColor: 'lightgreen',
                            }} />
                            <FlatList
                                data={this.state.productList.filter(obj2 => obj2.categoryID === obj.categoryID)}
                                keyExtractor={(item) => item.productID}
                                numColumns={2}
                                renderItem={({ item, index }) => <FlatListItem
                                    item={item}
                                    index={index}
                                    navigation={this.props.navigation}
                                />}
                            />
                        </View>)
                    )
                }
            </ScrollView>
        );
    }
}

export default ProductList

