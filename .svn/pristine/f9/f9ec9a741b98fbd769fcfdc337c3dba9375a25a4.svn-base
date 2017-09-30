/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class KickPlayerAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'kickPlayerResponse',
            'queryFreezeResponse',
            'setFreeze',
            'sendFreezeResponse',
            'setEditObj'
        );
    }

    query() {
        ajaxRequest('/admin/queryMGame', {}, this.queryResponse, 'POST');
    }

    kickPlayer(role_id, server_id) {
        let params = {role_id : role_id, server_id: server_id};
        ajaxRequest('/admin/kickPlayer', params, this.kickPlayerResponse, 'POST');
    }

    queryFreezeInfo(params) {
        ajaxRequest('/admin/queryFreeze', params, this.queryFreezeResponse, 'POST');
    }

    sendFreeze(params) {
        console.log(params);
        if (params.type == 'silence') {
            ajaxRequest('/admin/silencePlayer', params, this.sendFreezeResponse, 'POST');
        } else if(params.type == 'freeze') {
            ajaxRequest('/admin/freezePlayer', params, this.sendFreezeResponse, 'POST');
        }
    }

    sendUnSilence(role_id, server_id) {
        let params = {role_id : role_id, server_id: server_id};
        ajaxRequest('/admin/unsilencePlayer', params, this.sendFreezeResponse, 'POST');
    }

    sendUnFreeze(role_id, server_id) {
        let params = {role_id : role_id, server_id: server_id};
        ajaxRequest('/admin/unfreezePlayer', params, this.sendFreezeResponse, 'POST');
    }
}

export default alt.createActions(KickPlayerAction);