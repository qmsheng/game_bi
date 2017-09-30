/**
 * Created by LiuXiao on 2017/2/22.
 */

import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class DiamondSpreadAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryDiamondSpreadResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryDiamondSpread(params) {
        ajaxRequest('/admin/queryDiamondSpread', params, this.queryDiamondSpreadResponse, 'POST');
    }
}

export default alt.createActions(DiamondSpreadAction);
