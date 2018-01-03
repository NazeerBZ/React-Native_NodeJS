import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button, Body, Title, Right, Left, Icon, Badge, Fab } from 'native-base';
import DatePicker from 'react-native-datepicker';
import { Image, ScrollView, View, Dimensions } from 'react-native';
import patientMiddleware from '../middlewares/patientMiddleware';

function mapDispatchToProps(dispatch) {
    return {
        updatePatient: (patient, goBack) => { dispatch(patientMiddleware.updatePatient(patient, goBack)) },
        deletePatient: (patientId, goBack) => { dispatch(patientMiddleware.deletePatient(patientId, goBack)) }
    }
}

class Patient extends Component {

    constructor(props) {
        super(props)

        this.state = {
            nameText: this.props.navigation.state.params.patientName,
            diseaseText: '',
            medicationText: '',
            arrivalText: this.props.navigation.state.params.dateOfArrival,
            costText: this.props.navigation.state.params.cost,
            deseaseList: this.props.navigation.state.params.diseases,
            medicationList: this.props.navigation.state.params.medications
        }

        this.deviceHeight = Dimensions.get('window').height;
        this.deviceWidth = Dimensions.get('window').width;
    }

    updatePatient = () => {

        if (this.state.nameText !== '' && this.state.deseaseList.length !== 0 && this.state.medicationList !== 0 && this.state.arrivalText !== '' && this.state.costText !== '') {

            var patient = {
                patientId: this.props.navigation.state.params.patientId,
                docUsername: this.props.navigation.state.params.username,
                patientName: this.state.nameText,
                diseases: this.state.deseaseList,
                medications: this.state.medicationList,
                dateOfArrival: this.state.arrivalText,
                cost: this.state.costText
            }

            this.props.updatePatient(patient, this.props.navigation);
        }
    }

    makeDeseaseList = () => {

        if (this.state.diseaseText !== '') {
            this.state.deseaseList.push(this.state.diseaseText)
            this.setState({
                deseaseList: this.state.deseaseList,
                diseaseText: ''
            })
        }
    }

    showBadgesForDeseases = () => {
        if (this.state.deseaseList.length !== 0) {
            return this.state.deseaseList.map((desease, index) => {
                return (
                    <Badge style={style.badgeContent} key={index}>
                        <Text style={{ color: 'black' }}>{desease}</Text>
                        <Icon name="close-circle" onPress={this.removeItemFromDeseaseList.bind(this, index)} style={style.iconStyle}></Icon>
                    </Badge>
                )
            })
        }
    }

    removeItemFromDeseaseList(index) {
        this.state.deseaseList.splice(index, 1);
        this.setState({
            deseaseList: this.state.deseaseList
        })
    }


    makeMedicationList = () => {

        if (this.state.medicationText !== '') {
            this.state.medicationList.push(this.state.medicationText)
            this.setState({
                medicationList: this.state.medicationList,
                medicationText: ''
            })
        }
    }

    showBadgesForMedication = () => {
        if (this.state.medicationList.length !== 0) {
            return this.state.medicationList.map((medicine, index) => {
                return (
                    <Badge style={style.badgeContent} key={index}>
                        <Text style={{ color: 'black' }}>{medicine}</Text>
                        <Icon name="close-circle" onPress={this.removeItemFromMedicationList.bind(this, index)} style={style.iconStyle}></Icon>
                    </Badge>
                )
            })
        }
    }

    removeItemFromMedicationList(index) {
        this.state.medicationList.splice(index, 1);
        this.setState({
            medicationList: this.state.medicationList
        })
    }

    render() {

        return (
            <Image source={require('../../images/bg.png')} style={style.containerStyle}>
                <Header style={style.headerStyle} >
                    <Left>
                        <Icon name='arrow-back' onPress={() => { this.props.navigation.dispatch(NavigationActions.back()) }} />
                    </Left>
                    <Body>
                        <Title>{this.props.navigation.state.params.patientName}</Title>
                    </Body>
                    <Right>
                        <Icon name='md-trash' onPress={() => { this.props.deletePatient(this.props.navigation.state.params.patientId, this.props.navigation) }} />
                    </Right>
                </Header>

                <ScrollView>
                    <Content padder contentContainerStyle={style.contentStyle}>
                        <Form style={style.formStyle}>
                            <Item style={style.itemsStyle}>
                                <Input onChangeText={(nameText) => { this.setState({ nameText }) }} placeholder='Patient Name' value={this.state.nameText} />
                            </Item>
                            <Item style={style.itemsStyle}>
                                <Input onChangeText={(diseaseText) => { this.setState({ diseaseText }) }} placeholder='Diseases' value={this.state.diseaseText} />
                                <Icon active name='add-circle' onPress={this.makeDeseaseList} />
                            </Item>

                            <View style={style.badgeStyle}>{this.showBadgesForDeseases()}</View>

                            <Item style={style.itemsStyle}>
                                <Input onChangeText={(medicationText) => { this.setState({ medicationText }) }} placeholder='Medication Provided' value={this.state.medicationText} />
                                <Icon active name='add-circle' onPress={this.makeMedicationList} />
                            </Item>

                            <View style={style.badgeStyle}>{this.showBadgesForMedication()}</View>

                            <DatePicker
                                style={style.dateStyle}
                                mode="date"
                                placeholder={this.state.arrivalText}
                                format="DD-MM-YYYY"
                                minDate="01-01-2000"
                                maxDate="01-01-2050"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                onDateChange={(arrivalText) => { this.setState({ arrivalText }) }}
                            />

                            <Item style={style.itemsStyle}>
                                <Input onChangeText={(costText) => { this.setState({ costText }) }} placeholder='Cost' value={this.state.costText} />
                            </Item>
                        </Form>
                    </Content>
                </ScrollView>
                <View>
                    <Fab
                        onPress={this.updatePatient}>
                        <Icon name="md-checkmark" />
                    </Fab>
                </View>
            </Image>
        )
    }
}

export default connect(null, mapDispatchToProps)(Patient)

const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent',
    },
    contentStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '25%'
    },
    formStyle: {
        width: '100%'
    },
    headerStyle: { backgroundColor: '#00bcd4' },
    loginBtn: { backgroundColor: '#00bcd4', marginTop: 9 },
    dateStyle: { width: 200, marginTop: 40, marginLeft: 10 },
    itemsStyle: {
        marginTop: 20
    },
    badgeStyle: {
        paddingLeft: 12,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    badgeContent: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: '#cecece',
        marginTop: 4,
        marginLeft: 4
    },
    iconStyle: { color: '#848080', fontSize: 18, position: 'relative', top: 4 },
}

