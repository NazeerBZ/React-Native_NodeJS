import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';
import DocterInfo from './reducers/DocterInfo';
import PatientInfo from './reducers/PatientInfo';
import LogInfo from './reducers/logInfo';

const rootReducer = combineReducers({
    DocterInfo,
    PatientInfo,
    LogInfo
})

export default Store = createStore(rootReducer, undefined, compose(applyMiddleware(thunk), autoRehydrate()));