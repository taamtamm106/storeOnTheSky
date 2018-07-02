import { createStackNavigator } from 'react-navigation'
import HomeScreen from '../home/home'
import CategoryScreen from '../category/category'
import SearchScreen from '../search/search'
import DetailScreen from '../detail/detail'
import CartScreen from '../cart/cart'
import MakeAPayMent from './../cart/payment'
import UserScreen from './../user/user'
import UpdateInfo from '../user/updateinfo'
import OrderHistory from './../user/orderhistory'


export const CartStack = createStackNavigator(
    {
        Review: { screen: CartScreen },
        Payment: { screen: MakeAPayMent }
    },
    {
        initialRouteName: 'Review',
    },
)


export const CategoryStack = createStackNavigator(
    {
        Category: { screen: CategoryScreen },
        Detail: { screen: DetailScreen },
    },
    {
        initialRouteName: 'Category',
    },
)



export const HomeStack = createStackNavigator(
    {
        Home: { screen: HomeScreen },
        Detail: { screen: DetailScreen },
        Search: { screen: SearchScreen },
    },
    {
        initialRouteName: 'Home',
    },
);





export const UserStack = createStackNavigator(
    {
        UserScreen: { screen: UserScreen },
        UpdateInfo: { screen: UpdateInfo },
        OrderHistory: { screen: OrderHistory }
    },
    {
        initialRouteName: 'UserScreen',
    }
)