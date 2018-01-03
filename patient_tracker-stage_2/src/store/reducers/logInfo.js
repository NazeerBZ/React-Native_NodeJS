
const INITIAL_STATE = {
    isLoggedIn: false,
    dataLoadingStatus: false
}

function LogInfo(state = INITIAL_STATE, action) {

    switch (action.type) {

        case 'USER_LOGGED_IN_STATUS':
            return Object.assign({}, state, { isLoggedIn: action.flg });

        case 'DATA_LOADING':
            return Object.assign({}, state, { dataLoadingStatus: action.flg });

        default: return state
    }
}

export default LogInfo;