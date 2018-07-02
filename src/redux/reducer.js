import { _storeData } from "../asyncstorage/asyncstorage";

let firstState = {
    logginStatus: false,
    fromSomewhereThatNeedLogIn: false,
    gobackScreen: null,
    Cart: [],
    cid: null,
    user: { uid: null, name: '', phone: '', email: '', address: '', avatarUrl: '' }
}
const reducer = (state = firstState, action) => {
    switch (action.type) {
        case 'LOGGIN_DETECTED':
            return { ...state, logginStatus: true };
        case 'SET_UID':
            return { ...state, user: { ...state.user, uid: action.uid } };
        case 'SAVE_INFO_LOADED_FROM_DB':
            return {
                ...state, user: {
                    ...state.user,
                    name: action.userObj.name === undefined ? state.user.name : action.userObj.name,
                    phone: action.userObj.phone === undefined ? state.user.phone : action.userObj.phone,
                    email: action.userObj.email === undefined ? state.user.email : action.userObj.email,
                    address: action.userObj.address === undefined ? state.user.address : action.userObj.address,
                    avatarUrl: action.userObj.avatarUrl === undefined ? state.user.avatarUrl : action.userObj.avatarUrl
                }
            };
        case 'UPDATE_INFO':
            return {
                ...state, user: {
                    ...state.user,
                    name: action.name === undefined ? '' : action.name,
                    phone: action.phone === undefined ? '' : action.phone,
                    email: action.email === undefined ? '' : action.email,
                    address: action.address === undefined ? '' : action.address,
                }
            }
        case 'UPDATE_AVATAR':
            return { ...state, user: { ...state.user, avatarUrl: action.avatarUrl } };

        case 'ADD_TO_CART':
            //Get in {item}
            if (state.Cart.length === 0 || state.Cart.map(obj => obj.item.productID).indexOf(action.item.productID) === -1) {
                return {
                    ...state,
                    Cart: [...state.Cart, { item: action.item, amount: 1 }]
                };
            }
            else {
                return { ...state, Cart: state.Cart.map(obj => obj.item.productID === action.item.productID ? { item: obj.item, amount: ++obj.amount } : obj) }
            }
        case 'DECREASE':
            return {
                ...state,
                Cart: state.Cart.map(obj => obj.item.productID === action.item.productID ? { item: obj.item, amount: obj.amount > 1 ? --obj.amount : obj.amount } : obj)
            };
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                Cart: state.Cart.filter(obj => obj.item.productID !== action.item.productID)
            };
        case 'EMPTY_CART':
            return { ...state, Cart: [] };
        case 'LOG_OUT':
            _storeData("logginStatus", "false");
            return {
                ...state, logginStatus: false, user:
                    { uid: null, name: '', phone: '', email: '', address: '', avatarUrl: '' }
            };

        case 'UPDATE_AVATAR':
            return { ...state, user: { ...state.user, info: { ...state.user.info, avatarUrl: action.url } } };
        case 'SET_CID':
            return { ...state, cid: action.cid };
        case 'REDIRECT_TO_LOG_IN':
            return { ...state, fromSomewhereThatNeedLogIn: true, gobackScreen: action.gobackScreen };
        case 'REMOVE_REDIREC_TO_LOG_IN':
            return { ...state, fromSomewhereThatNeedLogIn: false, gobackScreen: null };
        default:
            return state;

    }
}
export default reducer