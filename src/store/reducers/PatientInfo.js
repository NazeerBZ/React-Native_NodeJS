
const INITIAL_STATE = {
    patientList: [],
    noPatientMessge: ''
}

function PatientInfo(state = INITIAL_STATE, action) {

    switch (action.type) {

        case 'LIST_OF_PATIENT':
            return Object.assign({}, state, { patientList: action.patientList });

        case 'CLEAR_LIST_OF_PATIENT':
            return Object.assign({}, state, { patientList: action.patientList });

        case 'NO_PATIENT_MESSAGE':
            return Object.assign({}, state, { noPatientMessge: action.msg });

        case 'CLEAR_NO_PATIENT_MESSAGE':
            return Object.assign({}, state, { noPatientMessge: action.msg });

        default: return state
    }
}

export default PatientInfo;