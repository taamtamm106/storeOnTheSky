import React from 'react'
import { TextInput, View, StyleSheet } from 'react-native'

class SearchBox extends React.Component {
    constructor(props) {
        super(props),
            this.state = { search: '' };
    }
    render() {
        return (
            <View style={styles.motherOfSearchBox}>
                <TextInput
                    onSubmitEditing={() => {
                        this.props.navigation.navigate('Search', { title: this.state.search, string: this.state.search })
                    }}
                    underlineColorAndroid={'transparent'}
                    multiline={false}
                    editable={true}
                    placeholder={"Search..."}
                    placeholderTextColor={'white'}
                    onChangeText={(text) => this.setState({ search: text })}
                    style={styles.searchBox}>
                    {this.state.search}
                </TextInput>
            </View>
        );
    }
}
export default SearchBox

const styles = StyleSheet.create({

    motherOfSearchBox: {
        flex: 1,
        backgroundColor: '#ff9900',
        justifyContent: 'center',
    },
    searchBox: {
        paddingLeft: 20,
        color: 'white',
    }
});