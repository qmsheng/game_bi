/**
 * Created by QiuMaoSheng on 2017/06/21
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class RechargeAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryRechargeResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryRecharge(params) {
        ajaxRequest('/admin/queryRechargeInfo', params, this.queryRechargeResponse, 'POST');
    }
}

export default alt.createActions(RechargeAction);