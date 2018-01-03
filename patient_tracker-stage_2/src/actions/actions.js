

export default class Actions {

    static currentDocter(payload) {
        return {
            type: 'CURRENT_DOCTER',
            username: payload.username,
            docterName: payload.docterName
        }
    }

    static clearCurrentDocter() {
        return {
            type: 'CLEAR_CURRENT_DOCTER',
            username: '',
            docterName: ''
        }
    }

    static ListOfPatient(payload) {
        return {
            type: 'LIST_OF_PATIENT',
            patientList: payload.patientList
        }
    }

    static clearListOfPatient() {
        return {
            type: 'CLEAR_LIST_OF_PATIENT',
            patientList: []
        }
    }

    static noPatientMessage(msg) {
        return {
            type: 'NO_PATIENT_MESSAGE',
            msg: msg
        }
    }

    static clearNoPatientMessge() {
        return {
            type: 'CLEAR_NO_PATIENT_MESSAGE',
            msg: ''
        }
    }

    static showToast(msg) {
        return {
            type: 'SHOW_TOAST',
            msg: msg
        }
    }

    static clearToastMessage() {
        return {
            type: 'CLEAR_TOAST_MESSAGE',
            msg: ''
        }
    }

    static userLoggedInStatus(flag) {
        return {
            type: 'USER_LOGGED_IN_STATUS',
            flg: flag
        }
    }

    static dataLoading(flag) {
        return {
            type: 'DATA_LOADING',
            flg: flag
        }
    }
}
