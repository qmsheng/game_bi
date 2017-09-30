/**
 * Created by LiuXiao on 2017/2/27.
 */

import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class CdKeyAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'generateCdKeyResponse',
            'exportCdKeyResponse',
        );
    }

    query(page) {
        ajaxRequest('/admin/cdkey', {page:page}, this.queryResponse, 'GET');
    }

    generateCdKey(params) {
        ajaxRequest('/admin/generateCdKey', params, this.generateCdKeyResponse, 'POST');
    }

    exportCdKey(batch) {
        let params = {batch : batch};
        ajaxRequest('/admin/exportCdKey', params, this.exportCdKeyResponse, 'POST');
    }
}

export default alt.createActions(CdKeyAction);