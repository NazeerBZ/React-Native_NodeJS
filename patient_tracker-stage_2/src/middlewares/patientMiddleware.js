import axios from 'axios';
import Actions from '../actions/actions';
import { NavigationActions } from 'react-navigation';
import { AsyncStorage } from 'react-native';
import rootURL from '../constants';

export default class patientMiddleware {

    static addPatient(patient) {
        return (dispatch) => {

            AsyncStorage.getItem('token')
                .then((result) => {
                    axios.post(`${rootURL}/api/addPatient`, patient, { headers: { authorization: result } })
                        .then((res) => {
                            console.log(res.data) //message: Patient successfully added"
                            dispatch(Actions.showToast(res.data.message));
                            dispatch(Actions.clearListOfPatient())
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    static getAllPatient(username) {
        return (dispatch) => {

            AsyncStorage.getItem('token')
                .then((result) => {
                    axios.get(`${rootURL}/api/getAllPatient`, { headers: { authorization: result, username: username } })
                        .then((res) => {
                            if (res.data.message) {
                                dispatch(Actions.noPatientMessage(res.data.message))
                            }
                            else {
                                dispatch(Actions.ListOfPatient(res.data))
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    static clearListOfPatient() {
        return (dispatch) => {
            dispatch(Actions.clearListOfPatient())
        }
    }

    static clearNoPatientMessge() {
        return (dispatch) => {
            dispatch(Actions.clearNoPatientMessge())
        }
    }

    static updatePatient(patient, goBack) {
        return (dispatch) => {

            AsyncStorage.getItem('token')
                .then((result) => {
                    axios.put(`${rootURL}/api/updatePatient`, patient, { headers: { authorization: result } })
                        .then((res) => {
                            console.log(res.data);
                            dispatch(Actions.showToast(res.data.message));
                            dispatch(Actions.clearListOfPatient());
                            goBack.dispatch({
                                type: 'Navigation/NAVIGATE',
                                routeName: 'drawerNav',
                                action: {
                                    type: 'Navigation/NAVIGATE',
                                    routeName: 'All Patient',
                                },
                            });
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })

        }
    }

    static deletePatient(patientId, goBack) {
        return (dispatch) => {

            AsyncStorage.getItem('token')
                .then((result) => {
                    axios.delete(`${rootURL}/api/deletePatient`, { headers: { authorization: result, patientId: patientId } })
                        .then((res) => {
                            console.log(res.data);
                            dispatch(Actions.showToast(res.data.message));
                            dispatch(Actions.clearListOfPatient());
                            goBack.dispatch({
                                type: 'Navigation/NAVIGATE',
                                routeName: 'drawerNav',
                                action: {
                                    type: 'Navigation/NAVIGATE',
                                    routeName: 'All Patient'
                                }
                            });
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

}