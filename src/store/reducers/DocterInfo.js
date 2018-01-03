
const INITIAL_STATE = {
    username: '',
    docterName: '',
    toastMessage: ''
}

function DocterInfo(state = INITIAL_STATE, action) {

    switch (action.type) {

        case 'CURRENT_DOCTER':
            return Object.assign({}, state, { username: action.username, docterName: action.docterName })

        case 'CLEAR_CURRENT_DOCTER':
            return Object.assign({}, state, { username: action.username, docterName: action.docterName })

        case 'SHOW_TOAST':
            return Object.assign({}, state, { toastMessage: action.msg })

        case 'CLEAR_TOAST_MESSAGE':
            return Object.assign({}, state, { toastMessage: action.msg })

        default: return state
    }
}

export default DocterInfo;