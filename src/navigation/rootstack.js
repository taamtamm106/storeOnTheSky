import React from 'react'
import { Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from 'react-navigation'
import { HomeStack, CategoryStack, CartStack, UserStack } from './stack'

const { height } = Dimensions.get('window');

const RootStack = createBottomTabNavigator(
    {
        Home: { screen: HomeStack },
        Category: { screen: CategoryStack },
        Cart: { screen: CartStack },
        User: { screen: UserStack },
    },

    {
        initialRouteName: 'Home',
        navigationOptions: ({ navigation }) => ({
            header: null,
            tabBarIcon: ({ focused, tintColor }) => {
                let iconName;
                if (navigation.state.key === 'Home') {
                    iconName = 'ios-home-outline';
                } else if (navigation.state.key === 'Cart') {
                    iconName = 'ios-cart-outline';
                } else if (navigation.state.key === 'Category') {
                    iconName = 'ios-list-outline';
                } else if (navigation.state.key === 'User') {
                    iconName = 'ios-contact-outline';
                }
                return (
                    <Icon name={iconName} size={48} color={focused ? 'red' : 'black'} />
                )
            },
        }),
        tabBarOptions: {
            showLabel: false,
            style: {
                height: height * 0.1,
                borderTopColor: 'transparent',
            },
        },
        header: null,
    }
);

export default RootStack