import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Title, Text, Header, Body, Content, View } from 'native-base';
import LoginForm from '../components/loginForm';
import SLMiddleware from '../middlewares/SLMiddleware';
import LoadingMiddleware from '../middlewares/loadingMiddleware';

function mapStateToProps(state) {
    return {
        username: state.DocterInfo.username,
        patientList: state.PatientInfo.patientList,
        noPatientMessge: state.PatientInfo.noPatientMessge,
        dataLoadingStatus: state.LogInfo.dataLoadingStatus
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (username, password, goToAddPatient) => { dispatch(SLMiddleware.login(username, password, goToAddPatient)) },
        dataLoading: (flag) => { dispatch(LoadingMiddleware.dataLoading(flag)) }
    }
}

class Login extends Component {

    render() {
        return (
            <Image source={require('../../images/bg.png')} style={style.containerStyle}>
                <Header style={style.headerStyle} >
                    <Body>
                        <Title>Patient Tracker</Title>
                    </Body>
                </Header>

                <LoginForm
                    login={this.props.login}
                    goToAddPatient={this.props.navigation.navigate}
                    goToSignup={this.props.navigation.navigate}
                    dataLoading={this.props.dataLoading}
                    dataLoadingStatus={this.props.dataLoadingStatus}
                />
            </Image>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent'
    },
    headerStyle: { backgroundColor: '#00bcd4' },
}
