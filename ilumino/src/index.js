import React,{Component} from 'react';
import Routes from './routes';
import {YellowBox} from 'react-native';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import logger from './pages/store/middleware';
import reducer from './pages/store/reducer';

YellowBox.ignoreWarnings(["Can´t call setState", "source.uri"])

import './config/StatusBarConfig';

const store = createStore(reducer, applyMiddleware(logger));

//const App = () => <Routes/>;
class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}

export default App;




