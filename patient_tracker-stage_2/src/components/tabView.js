import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Text, Button, Tab, Tabs, Title, Icon, Input, Item, TabHeading } from 'native-base';
import { AsyncStorage, View, Alert, Image } from 'react-native';
import DatePicker from 'react-native-datepicker';

export default class TabView extends Component {

    constructor(props) {
        super(props)

        console.log(this.props.patientList)

        this.state = {
            patientsList: this.props.patientList,
            filteredListByName: [],
            filteredListByDate: [],
            isSearchBarUpForName: false,
            isSearchBarUpForDate: false,
            dateText: ''
        }
    }

    deletePatientOfCurrentDr = (index) => {

        this.state.patientsList.splice(index, 1);

        this.setState({
            patientsList: this.state.patientsList
        })

        AsyncStorage.setItem('patients', JSON.stringify(this.state.patientsList))
    }

    allPatientsOfCurrentDr() {
        return (
            <View>
                {this.state.patientsList.length !== 0 ?
                    <List>
                        {this.state.patientsList.map((patObj, index) => {
                            return (
                                <ListItem key={index} onPress={() => {
                                    this.props.goToPatient('patient',
                                        {
                                            patientId: patObj._id,
                                            username: this.props.username,
                                            patientName: patObj.patientName,
                                            diseases: patObj.diseases,
                                            medications: patObj.medications,
                                            dateOfArrival: patObj.dateOfArrival,
                                            cost: patObj.cost
                                        })
                                }}>
                                    <Body>
                                        <Text>{patObj.patientName}</Text>
                                    </Body>
                                    <Right>
                                        <Text note>{patObj.dateOfArrival}</Text>
                                    </Right>
                                </ListItem>
                            )
                        })}
                    </List>
                    :
                    <View style={style.messageViewStyle}>
                        <Text>{this.props.noPatientMessge}</Text>
                    </View>
                }
            </View>
        )
    }

    searchByName = (text) => {
        var NeedToClear = true;

        this.setState({
            filteredListByName: [],
            isSearchBarUpForName: true
        },
            () => {

                if (text !== '') {
                    console.log(text.length)

                    for (var i = 0; i < this.state.patientsList.length; i++) {
                        slicedWord = this.state.patientsList[i].patientName.slice(0, text.length);
                        console.log(slicedWord, text)
                        if (slicedWord.toUpperCase() === text.toUpperCase()) {

                            this.state.filteredListByName.push(this.state.patientsList[i])
                            NeedToClear = false;
                            this.setState({
                                filteredListByName: this.state.filteredListByName
                            })
                            console.log('Add into list')
                        }
                    }

                    if (NeedToClear === true) {
                        this.setState({
                            filteredListByName: []
                        })
                        console.log('2nd clear')
                    }
                }
                else {
                    this.setState({
                        filteredListByName: this.state.patientsList
                    })
                    // console.log('1nd clear')
                }

            })
    }

    allPatientsFilteredByNameOfCurrentDr() {
        return (
            <View>
                <List>
                    {this.state.filteredListByName.map((patObj, index) => {
                        return (
                            <ListItem key={index} onPress={() => {
                                this.props.goToPatient('patient',
                                    {
                                        patientId: patObj._id,
                                        username: this.props.username,
                                        patientName: patObj.patientName,
                                        diseases: patObj.diseases,
                                        medications: patObj.medications,
                                        dateOfArrival: patObj.dateOfArrival,
                                        cost: patObj.cost
                                    })
                            }}>
                                <Body>
                                    <Text>{patObj.patientName}</Text>
                                    <Text note>{patObj.disease}</Text>
                                </Body>
                                <Right>
                                    <Text note>{patObj.dateOfArrival}</Text>
                                </Right>
                            </ListItem>
                        )
                    })}
                </List>
            </View>
        )
    }


    searchByDate = (dateText) => {

        this.setState({
            filteredListByDate: [],
            dateText: dateText,
            isSearchBarUpForDate: true
        })

        for (var i = 0; i < this.state.patientsList.length; i++) {
            if (this.state.patientsList[i].dateOfArrival === dateText) {
                this.state.filteredListByDate.push(this.state.patientsList[i]);
                this.setState({
                    filteredListByDate: this.state.filteredListByDate
                })
            }
        }


        // var duplicateSignal = false;
        // var NeedToClear = true;

        // this.setState({
        //     filteredListByDate: [],
        //     isSearchBarUp: true
        // },
        //     () => {

        //         if (text !== '') {
        //             console.log(text.length)
        //             for (var i = 0; i < this.state.patientsList.length; i++) {
        //                 slicedWord = this.state.patientsList[i].dateOfArrival.slice(0, text.length);
        //                 console.log(slicedWord, text)
        //                 if (slicedWord === text) {

        //                     console.log(this.state.filteredListByDate.length);

        //                     for (var j = 0; j < this.state.filteredListByDate.length; j++) {

        //                         if (this.state.filteredListByDate[j].dateOfArrival === this.state.patientsList[i].dateOfArrival) {
        //                             if (this.state.filteredListByDate[j].patientName === this.state.patientsList[i].patientName) {
        //                                 duplicateSignal = true;
        //                                 NeedToClear = false;

        //                                 this.state.filteredListByDate = [];
        //                                 this.state.filteredListByDate.push(this.state.patientsList[i]);
        //                                 this.setState({
        //                                     filteredListByDate: this.state.filteredListByDate
        //                                 })
        //                                 console.log('duplicate');
        //                             }
        //                         }
        //                     }

        //                     if (duplicateSignal === false) {
        //                         this.state.filteredListByDate.push(this.state.patientsList[i])
        //                         NeedToClear = false;
        //                         this.setState({
        //                             filteredListByDate: this.state.filteredListByDate
        //                         })
        //                         console.log('Add into list')

        //                     }
        //                 }
        //                 else {
        //                     console.log(NeedToClear)
        //                     if (i === this.state.patientsList.length - 1) {
        //                         if (NeedToClear === true) {

        //                             this.setState({
        //                                 filteredListByDate: []
        //                             })
        //                             console.log('2nd clear')
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //         else {
        //             this.setState({
        //                 filteredListByDate: []
        //             })
        //             console.log('1nd clear')
        //         }

        //     })
    }

    allPatientsFilteredByDateOfCurrentDr = () => {
        return (
            <List>
                {this.state.filteredListByDate.map((patObj, index) => {
                    return (
                        <ListItem key={index} onPress={() => {
                            this.props.goToPatient('patient',
                                {
                                    patientId: patObj._id,
                                    username: this.props.username,
                                    patientName: patObj.patientName,
                                    diseases: patObj.diseases,
                                    medications: patObj.medications,
                                    dateOfArrival: patObj.dateOfArrival,
                                    cost: patObj.cost
                                })
                        }}>
                            <Body>
                                <Text>{patObj.patientName}</Text>
                                <Text note>{patObj.disease}</Text>
                            </Body>
                            <Right>
                                <Text note>{patObj.dateOfArrival}</Text>
                            </Right>
                        </ListItem>
                    )
                })}
            </List>
        )
    }

    handleIsSearchBarUpForName = () => {
        this.setState({
            isSearchBarUpForName: false
        })
    }

    handleIsSearchBarUpForDate = () => {
        this.setState({
            isSearchBarUpForDate: false,
            dateText: ''
        })
    }

    handleTabsChange = () => {
        this.handleIsSearchBarUpForName();
        this.handleIsSearchBarUpForDate();
    }

    render() {
        // console.log('filterdList By Name', this.state.filteredListByName)

        return (
            <Content>
                <Tabs onChangeTab={this.handleTabsChange}>
                    <Tab heading={<TabHeading style={style.headerStyle}><Icon name="person" style={{ color: 'white' }}></Icon><Text style={{ color: 'white' }}>Name</Text></TabHeading>} activeTabStyle={style.headerStyle}>

                        <Header searchBar rounded style={style.headerStyle}>
                            <Item>
                                <Icon name="ios-search" />
                                <Input placeholder="search by name" onChangeText={(text) => { this.searchByName(text) }} />
                                <Icon name="ios-people" />
                            </Item>
                        </Header>

                        {
                            this.state.isSearchBarUpForName === true ?
                                this.allPatientsFilteredByNameOfCurrentDr()
                                :
                                this.allPatientsOfCurrentDr()
                        }

                        {
                            this.state.filteredListByName.length === 0 && this.state.isSearchBarUpForName === true ?
                                <View style={style.messageViewStyle}>
                                    <Text>No Result</Text>
                                </View>
                                :
                                null
                        }

                    </Tab>

                    <Tab heading={<TabHeading style={style.headerStyle}><Icon name="grid" style={{ color: 'white' }}></Icon><Text style={{ color: 'white' }}>Date</Text></TabHeading>} activeTabStyle={style.headerStyle}>

                        <Header searchBar rounded style={style.headerStyle}>
                            <Item>
                                {/*<Icon name="ios-search" />*/}
                                {/*<Input placeholder="search by date" onChangeText={(text) => { this.searchByDate(text) }} onBlur={this.handleIsSearchBarUp} />*/}

                                <DatePicker
                                    style={style.dateStyle}
                                    mode="date"
                                    date={this.state.dateText}
                                    placeholder='search by date'
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
                                    onDateChange={(dateText) => { this.searchByDate(dateText) }}
                                />

                                <Icon name="close" onPress={this.handleIsSearchBarUpForDate} />
                            </Item>
                        </Header>

                        {
                            this.state.isSearchBarUpForDate === true ?
                                this.allPatientsFilteredByDateOfCurrentDr()
                                :
                                this.allPatientsOfCurrentDr()
                        }

                        {
                            this.state.filteredListByDate.length === 0 && this.state.isSearchBarUpForDate === true ?
                                <View style={style.messageViewStyle}>
                                    <Text>No Result</Text>
                                </View>
                                :
                                null
                        }

                    </Tab>
                </Tabs>
            </Content>
        );
    }
}

const style = {
    containerStyle: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent'
    },
    headerStyle: { backgroundColor: '#00bcd4' },
    messageViewStyle: {
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        elevation: 5,
        position: 'relative'
    },
    dateStyle: { width: '90%' },
}

{/*<Button onPress={() => { console.log(this.state.filteredListByName) }}><Text>get value</Text></Button>*/ }