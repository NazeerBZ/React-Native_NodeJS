import React, { Component } from 'react';
import { connect } from 'react-redux';
import PatientForm from '../components/patientForm';
import patientMiddleware from '../middlewares/patientMiddleware';
import { Header, Body, Title, Icon, Button, Left, Fab } from 'native-base';
import { Image } from 'react-native';
import { View, Text, ScrollView } from 'react-native';


function mapStateToProps(state) {
    return {
        username: state.DocterInfo.username,
        isLoggedIn: state.DocterInfo.isLoggedIn
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPatient: (patient) => { dispatch(patientMiddleware.addPatient(patient)) }
    }
}

class AddPatient extends Component {

    static navigationOptions = {
        drawerIcon: () => {
           return  <Icon name="md-person-add" />
        }
    }

    render() {
        return (
            <Image source={require('../../images/bg.png')} style={style.containerStyle}>
                <Header style={style.headerStyle} >
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.navigate('DrawerOpen') }}>
                            <Icon name='menu'/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Add Patient</Title>
                    </Body>
                </Header>

                <PatientForm addPatient={this.props.addPatient} username={this.props.username} />

            </Image>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPatient);


const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent'
    },
    headerStyle: { backgroundColor: '#00bcd4' }
}