import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import TabView from '../components/tabView';
import patientMiddleware from '../middlewares/patientMiddleware';

function mapStateToProps(state) {
    return {
        username: state.DocterInfo.username,
        patientList: state.PatientInfo.patientList,
        noPatientMessge: state.PatientInfo.noPatientMessge
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPatient: (username) => { dispatch(patientMiddleware.getAllPatient(username)) }
    }
}

class AllPatient extends Component {

    static navigationOptions = {
        drawerIcon: () => {
            return <Icon name="md-contacts" />
        }
    }

    constructor(props) {
        super(props)

        this.props.getAllPatient(this.props.username);
        console.log('constructor');
    }

    render() {

        if (this.props.patientList.length !== 0) {
            return (
                <TabView patientList={this.props.patientList} goToPatient={this.props.navigation.navigate} username={this.props.username} />
            )
        }
        else if (this.props.noPatientMessge !== '') {
            return (
                <TabView patientList={this.props.patientList} noPatientMessge={this.props.noPatientMessge} />
            )
        }
        else if (this.props.patientList.length === 0 || this.props.noPatientMessge === '') {
            return (
                <ActivityIndicator
                    color="black"
                    size="large"
                    style={style.centering}
                />
            )
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllPatient);

const style = {
    centering: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    }
}

