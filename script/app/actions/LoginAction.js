/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class LoginAction {
    constructor() {
        this.generateActions(
            'loginSuccess'
        );
    }

    login(params) {
        ajaxRequest('/admin/login', params, this.loginSuccess, 'POST');
    }
}

export default alt.createActions(LoginAction);