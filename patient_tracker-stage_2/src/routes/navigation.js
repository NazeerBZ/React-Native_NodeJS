import { StackNavigator } from 'react-navigation';
import Signup from '../containers/signup';
import Login from '../containers/login';
import DrawerNav from './drawerNav';
import Patient from '../containers/patient';
import { View, Text, Button } from 'react-native';


const Navigation = StackNavigator({

    'login': {
        screen: Login
    },

    'signup': {
        screen: Signup
    },

    'drawerNav': {
        screen: DrawerNav
    },

    'patient': {
        screen: Patient
    }
},

    {
        navigationOptions: {
            header: null
        }
    }
)

export default Navigation;

