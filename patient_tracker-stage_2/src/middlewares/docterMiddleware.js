import axios from 'axios';
import Actions from '../actions/actions';
import { AsyncStorage } from 'react-native';

export default class docterMiddleware {

    static clearCurrentDocter() {
        return (dispatch) => {
            dispatch(Actions.clearCurrentDocter())
        }
    }


    static clearToastMessage() {
        return (dispatch) => {
            dispatch(Actions.clearToastMessage())
        }
    }

}