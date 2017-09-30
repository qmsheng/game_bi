/**
 * Created by QiuMaoSheng on 2017/06/21
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class BindDiamondAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryBindDiamondResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryBindDiamond(params) {
        ajaxRequest('/admin/bindDiamondOutput', params, this.queryBindDiamondResponse, 'POST');
    }
}

export default alt.createActions(BindDiamondAction);