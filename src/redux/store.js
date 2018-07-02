import {createStore, applyMiddleware} from 'redux'
import reducer from './reducer'
import myMiddleware from './middleware'
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(myMiddleware)));
export default store