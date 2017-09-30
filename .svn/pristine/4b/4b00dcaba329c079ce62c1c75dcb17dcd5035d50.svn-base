/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import LoginAction from "../actions/LoginAction";

import {NOT_LOGIN_ERROR_ID} from '../utils/Const';

class LoginStore {
    constructor() {
        this.bindActions(LoginAction);
        this.username = "";
        this.passowrd = "";
        this.logined = false;
    }

    onLoginSuccess(data) {
        if (data.result == 0) {
            this.logined = true;
        }
    }
}

export default alt.createStore(LoginStore);
