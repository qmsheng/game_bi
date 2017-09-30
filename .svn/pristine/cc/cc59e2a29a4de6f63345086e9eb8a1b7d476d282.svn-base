/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class RoleCopyAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'queryPlayerResponse',
            'copyPlayerResoibse',
            'setCopy',
            'setEditObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryMGame', {}, this.queryResponse, 'POST');
    }

    queryPlayer(params) {
        ajaxRequest('/admin/queryPlayer', params, this.queryPlayerResponse, 'POST');
    }

    copyPlayer(params){
        ajaxRequest('/admin/copyPlayer', params, this.copyPlayerResoibse, 'POST');
    }
}

export default alt.createActions(RoleCopyAction);