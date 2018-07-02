
import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux'
import store from './src/redux/store'
import RootView from './src/navigation/navigation'
import { YellowBox } from 'react-native';

export default class App extends React.Component {
  componentWillMount() {
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'Remote debugger', 'Setting a timer']);
  }
  render() {
    StatusBar.setHidden(true);
    // return <View />
    return (
      <Provider store={store}>
        <RootView />
      </Provider>
    );
  }
}

