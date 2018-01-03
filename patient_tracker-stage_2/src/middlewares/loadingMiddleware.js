import axios from 'axios';
import Actions from '../actions/actions';
import { AsyncStorage } from 'react-native';

export default class LoadingMiddleware {

    static dataLoading(flag) {
        return (dispatch) => {
            dispatch(Actions.dataLoading(flag));
        }
    }
}