/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import AppAction from "../actions/AppAction";

import {NOT_LOGIN_ERROR_ID} from '../utils/Const';

class AppStore {
    constructor() {
        this.bindActions(AppAction);
        this.loading = false;
        this.inited = false;
        this.error = 0;
        this.loginFailed = false;
        this.user = [];
    }

    onStartLoading() {
        this.loading = true;
    }
    onEndLoading() {
        this.loading = false;
    }
    onError(error_id) {
        this.error = error_id;
    }
    onInitAppSuccess(data) {
        this.inited = true;
        if (data.result == 0) {
            this.user = data.data;
            this.loginFailed = false;
        } else {
            this.loginFailed = true;
        }
    }
    onLogoutResponse(data){
        this.loginFailed = true;
    }
}

export default alt.createStore(AppStore);
