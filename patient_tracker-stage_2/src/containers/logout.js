import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button, Icon } from 'native-base';
import patientMiddleware from '../middlewares/patientMiddleware';
import SLMiddleware from '../middlewares/SLMiddleware';
import docterMiddleware from '../middlewares/docterMiddleware';
import { NavigationActions } from 'react-navigation';

function mapDispatchToProps(dispatch) {
    return {
        clearCurrentDocter: () => { dispatch(docterMiddleware.clearCurrentDocter()) },
        clearListOfPatient: () => { dispatch(patientMiddleware.clearListOfPatient()) },
        clearNoPatientMessge: () => { dispatch(patientMiddleware.clearNoPatientMessge()) },
        userLoggedIn: (flag) => { dispatch(SLMiddleware.userLoggedIn(flag)) }
    }
}

class Logout extends Component {

    static navigationOptions = {
        drawerIcon: () => {
            return <Icon name="md-power" />
        }
    }

    componentWillMount() {
        this.props.clearCurrentDocter();
        this.props.clearListOfPatient();
        this.props.clearNoPatientMessge();
        this.props.userLoggedIn(false);

        const resetNavigationStack = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'login' })
            ],
        });

        this.props.navigation.dispatch(resetNavigationStack);
    }

    render() {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }
}

export default connect(null, mapDispatchToProps)(Logout);