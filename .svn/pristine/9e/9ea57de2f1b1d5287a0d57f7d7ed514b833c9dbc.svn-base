/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class ServerAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'saveResponse',
            'deleteResponse',
            'showWin',
            'setEditObj'
        );
    }

    query(page) {
        ajaxRequest('/admin/server', {page:page}, this.queryResponse, 'GET');
    }

    save(server) {
        if (server.id == '' || server.id == 0) {
            ajaxRequest('/admin/server', server, this.saveResponse, 'POST');
        } else {
            ajaxRequest('/admin/server/'+server.id, server, this.saveResponse, 'PUT');
        }
    }

    delete(id) {
        ajaxRequest('/admin/server/'+id, {}, this.deleteResponse, 'DELETE');
    }

    openSer(params) {
        ajaxRequest('/admin/openServer', params, this.queryResponse, 'POST');
    }

    closeSer(params) {
        ajaxRequest('/admin/closeServer', params, this.queryResponse, 'POST');
    }

    makeGSSer(params) {
        ajaxRequest('/admin/makeGSServer', params, this.queryResponse, 'POST');
    }    
}

export default alt.createActions(ServerAction);