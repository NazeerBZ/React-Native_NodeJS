import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Text, Button } from 'native-base';
import { DrawerNavigator } from 'react-navigation';
import AddPatient from '../containers/addPatient';
import AllPatient from '../containers/allPatient';
import Logout from '../containers/logout';

const DrawerNav = DrawerNavigator({

    "Add Patient": {
        screen: AddPatient
    },

    "All Patient": {
        screen: AllPatient
    },

    "Logout": {
        screen: Logout
    }
})

export default DrawerNav;