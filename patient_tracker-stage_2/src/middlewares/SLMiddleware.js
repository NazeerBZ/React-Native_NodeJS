import axios from 'axios';
import Actions from '../actions/actions';
import { AsyncStorage } from 'react-native';
import { Content, Button, Text, Root, Toast } from 'native-base';
import rootURL from '../constants';

export default class SLMiddleware {

    static signup(docterObj, goToLogin) {
        return (dispatch) => {
            // console.log(docterObj);

            axios.post(`${rootURL}/api/addDocter`, docterObj)
                .then((res) => {

                    dispatch(Actions.dataLoading(false));

                    if (res.data.message || res.data.error) {
                        dispatch(Actions.showToast(res.data.message || res.data.error.errors.password.message));
                    }
                    else {
                        // console.log(res.data);
                        goToLogin('login');
                    }

                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    static login(username, password, goToAddPatient) {
        return (dispatch) => {

            var userCredential = {
                username: username,
                password: password
            }

            axios.post(`${rootURL}/api/login`, userCredential)
                .then((res) => {

                    dispatch(Actions.dataLoading(false));

                    if (res.data.error) {
                        dispatch(Actions.showToast(res.data.error));
                    }
                    else {
                        AsyncStorage.setItem('token', res.data.token);
                        dispatch(Actions.currentDocter(res.data));
                        dispatch(Actions.userLoggedInStatus(true));
                        goToAddPatient('drawerNav');
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    static userLoggedIn(flag) {
        return (dispatch) => {
            dispatch(Actions.userLoggedInStatus(flag))
        }
    }
}












































