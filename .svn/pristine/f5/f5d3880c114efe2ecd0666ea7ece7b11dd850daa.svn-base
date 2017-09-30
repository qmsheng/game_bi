/**
 * Created by QiuMaoSheng on 2017/07/14
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class DiamondConsumeAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryDiamondConsumeResponse',
            'setEditFormObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryDiamondConsume(params) {
        ajaxRequest('/admin/queryDiamondConsume', params, this.queryDiamondConsumeResponse, 'POST');
    }
}

export default alt.createActions(DiamondConsumeAction);