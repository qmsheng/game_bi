/**
 * Created by QiuMaoSheng on 2017/08/31
 */

import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class ServerActivityAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'ServerActivityResponse',
            'setEditObj'
        );
    }

    query(params) {
        ajaxRequest('/admin/queryOpenServerActivityPlan', {}, this.queryResponse, 'POST');
    }

    ServerActivity(params) {
        ajaxRequest('/admin/openServerActivityPlan', params, this.ServerActivityResponse, 'POST');
    }
}

export default alt.createActions(ServerActivityAction);
