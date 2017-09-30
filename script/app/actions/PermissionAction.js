/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class PermissionAction {
    constructor() {
        this.generateActions(
            'queryResponse',
            'saveResponse',
            'deleteResponse',
            'showWin',
            'setEditObj'
        );
    }

    query() {
        ajaxRequest('/admin/permission', {}, this.queryResponse, 'GET');
    }

    save(role) {
        if (role.id == '' || role.id == 0) {
            ajaxRequest('/admin/permission', role, this.saveResponse, 'POST');
        } else {
            ajaxRequest('/admin/permission/'+role.id, role, this.saveResponse, 'PUT');
        }
    }

    delete(id) {
        ajaxRequest('/admin/permission/'+id, {}, this.deleteResponse, 'DELETE');
    }
}

export default alt.createActions(PermissionAction);