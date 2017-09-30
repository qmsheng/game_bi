/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class AppAction {
    constructor() {
        this.generateActions(
            'startLoading',
            'endLoading',
            'error',
            'initAppSuccess',
            'logoutResponse'
        );
    }

    initApp() {
        ajaxRequest('/admin/init',{},this.initAppSuccess, 'POST');
    }

    logout() {
        ajaxRequest('/admin/logout',{},this.logoutResponse, 'POST');
    }
}

export default alt.createActions(AppAction);