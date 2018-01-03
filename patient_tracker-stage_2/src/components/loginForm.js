import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text, Body, Title, Right, Left, Icon } from 'native-base';
import { AsyncStorage, Image, View } from 'react-native';
import Button from 'apsl-react-native-button';

export default class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nameText: '',
            passwordText: '',
        }
    }

    login = () => {

        if (this.state.nameText !== '' && this.state.passwordText !== '') {
            this.props.login(this.state.nameText, this.state.passwordText, this.props.goToAddPatient);
            this.props.dataLoading(true);
        }
    }

    goToSignup = () => {
        this.props.goToSignup('signup');
    }

    render() {
        return (
            <Content padder contentContainerStyle={style.contentStyle}>
                <View style={style.profileImageStyle}><Image source={require('../../images/doctor.png')} /></View>
                <Form style={style.formStyle}>
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input onChangeText={(nameText) => { this.setState({ nameText }) }} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input secureTextEntry onChangeText={(passwordText) => { this.setState({ passwordText }) }} />
                    </Item>
                    <Button onPress={this.login} style={style.loginBtn} isLoading={this.props.dataLoadingStatus}><Text>Login</Text></Button>
                </Form>
                <Title onPress={this.goToSignup} style={style.createAccountStyle}>Create a new account <Text style={style.signupStyle}>Signup</Text></Title>
            </Content>
        )
    }
}

const style = {
    contentStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '25%'
    },
    formStyle: {
        width: '100%'
    },
    loginBtn: { backgroundColor: '#00bcd4', marginTop: 9 },
    createAccountStyle: { color: 'black', fontSize: 15, marginTop: 7 },
    signupStyle: { color: '#365899' },
    profileImageStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
}