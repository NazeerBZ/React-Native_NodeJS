import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text, Body, Title, Right, Left, Icon } from 'native-base';
import { AsyncStorage, Image, Alert } from 'react-native';
import Button from 'apsl-react-native-button';

export default class SignupForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nameText: '',
            docterNameText: '',
            emailText: '',
            passwordText: ''
        }
    }

    signup = () => {

        if (this.state.nameText !== '' && this.state.docterNameText !== '' && this.state.emailText !== '' && this.state.passwordText !== '') {

            var validationcode = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (validationcode.test(this.state.emailText)) {

                var docterObj = {
                    username: this.state.nameText,
                    docterName: this.state.docterNameText,
                    docterEmail: this.state.emailText,
                    password: this.state.passwordText
                }

                this.props.signup(docterObj, this.props.goToLogin);
                this.props.dataLoading(true);
            }
            else {
                Alert.alert(
                    'error',
                    'invalid Email'
                )
            }
        }
        else {
            Alert.alert(
                'error',
                'you missed any field')
        }
    }

    render() {

        return (
            <Content padder contentContainerStyle={style.contentStyle}>
                <Form style={style.formStyle} >
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input onChangeText={(nameText) => { this.setState({ nameText }) }} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Your Name</Label>
                        <Input onChangeText={(docterNameText) => { this.setState({ docterNameText }) }} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Email</Label>
                        <Input onChangeText={(emailText) => { this.setState({ emailText }) }} />
                    </Item>
                    <Item floatingLabel>
                        <Label>Password</Label>
                        <Input secureTextEntry onChangeText={(passwordText) => { this.setState({ passwordText }) }} />
                    </Item>
                    <Button block onPress={this.signup} style={style.loginBtn} isLoading={this.props.dataLoadingStatus}><Text>Signup</Text></Button>
                </Form>
            </Content>
        )
    }
}


const style = {
    loginBtn: { backgroundColor: '#00bcd4', marginTop: 9 },
    contentStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '25%'
    },
    formStyle: {
        width: '100%'
    },
}
