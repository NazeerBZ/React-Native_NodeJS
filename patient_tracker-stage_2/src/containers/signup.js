import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image } from 'react-native';
import { Title, Text, Header, Body, Content, Left, Icon, Right } from 'native-base';
import SignupForm from '../components/signupForm';
import SLMiddleware from '../middlewares/SLMiddleware';
import LoadingMiddleware from '../middlewares/loadingMiddleware';

function mapStateToProps(state) {
    return {
        dataLoadingStatus: state.LogInfo.dataLoadingStatus
    }
}

function mapDispatchToProps(dispatch) {
    return {
        signup: (docterObj, goToLogin) => { dispatch(SLMiddleware.signup(docterObj, goToLogin)) },
        dataLoading: (flag) => { dispatch(LoadingMiddleware.dataLoading(flag)) }
    }
}

class Signup extends Component {

    render() {
        return (
            <Image source={require('../../images/bg.png')} style={style.containerStyle}>
                <Header style={style.headerStyle} >
                    <Left>
                        <Icon name='arrow-back' onPress={() => { this.props.navigation.navigate('login') }} />
                    </Left>
                    <Body>
                        <Title style={{position: 'relative', right: '10%'}}>Create a new account</Title>
                    </Body>
                </Header>

                <SignupForm
                    signup={this.props.signup}
                    goToLogin={this.props.navigation.navigate}
                    dataLoading={this.props.dataLoading}
                    dataLoadingStatus={this.props.dataLoadingStatus}
                />

            </Image>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);


const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent'
    },
    headerStyle: { backgroundColor: '#00bcd4' },
    loginBtn: { backgroundColor: '#00bcd4', marginTop: 9 },
}