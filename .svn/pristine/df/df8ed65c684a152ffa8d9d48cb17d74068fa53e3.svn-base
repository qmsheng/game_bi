/**
 * Created by LiuXiao on 2017/2/22.
 */

import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class ChargeOrderAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryChargeOrderResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryChargeOrder(params) {
        ajaxRequest('/admin/queryChargeOrder', params, this.queryChargeOrderResponse, 'POST');
    }
}

export default alt.createActions(ChargeOrderAction);
