/**
 * Created by LiuXiao on 2017/2/22.
 */

import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class PayDataAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryPayDataResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryPayData(params) {
        ajaxRequest('/admin/queryPayData', params, this.queryPayDataResponse, 'POST');
    }
}

export default alt.createActions(PayDataAction);