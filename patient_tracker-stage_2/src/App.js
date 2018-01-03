import React, { Component } from 'react';
import { Container, Header, Content, Body, Right, Title } from 'native-base';
import { Provider } from 'react-redux';
import { View, Text } from 'react-native';
import Store from './store/Store';
import Routes from './routes/routes';
// import { Root } from 'native-base';


class App extends Component {

    render() {
        return (
            <Provider store={Store}>
                <Routes />
            </Provider>
        )
    }
}

export default App;
