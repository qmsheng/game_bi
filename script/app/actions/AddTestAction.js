/**
 * Created by QiuMaoSheng on 2017/05/27
 */

import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class AddTestAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'AddTestResponse',
            'setEditObj'
        );
    }

    query(params) {
        ajaxRequest('/admin/getActivityTask', params, this.queryResponse, 'POST');
    }

    AddTest(params) {
        ajaxRequest('/admin/addActivityTask', params, this.AddTestResponse, 'POST');
    }

    DelTest(params) {
        ajaxRequest('/admin/delActivityTask', params, this.AddTestResponse, 'POST');
    }
}

export default alt.createActions(AddTestAction);
