/**
 * Created by LiuXiao on 2017/2/28.
 */

import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class CdKeyQueryAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryCdKeyResponse'
        );
    }

    query() {
        ajaxRequest('/admin/queryQGame', {}, this.queryResponse, 'POST');
    }

    queryCdKey(params) {
        ajaxRequest('/admin/queryCdKey', params, this.queryCdKeyResponse, 'POST');
    }
}

export default alt.createActions(CdKeyQueryAction);