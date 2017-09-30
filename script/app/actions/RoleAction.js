/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';

import {ajaxRequest} from '../utils/Net'

class RoleAction {
    constructor() {
        this.generateActions(
            'queryRoleResponse',
            'saveRoleResponse',
            'deleteRoleResponse',
            'queryMenuResponse',
            'queryPermissionResponse',
            'showWin',
            'setEditObj'
        );
    }

    queryMenu(page) {
        ajaxRequest('/admin/menu', {page:page}, this.queryMenuResponse, 'GET');
    }

    queryPermission(page) {
        ajaxRequest('/admin/permission', {page:page}, this.queryPermissionResponse, 'GET');
    }

    query(page) {
        ajaxRequest('/admin/role', {page:page}, this.queryRoleResponse, 'GET');
    }

    save(role) {
        if (role.id == '' || role.id == 0) {
            ajaxRequest('/admin/role', role, this.saveRoleResponse, 'POST');
        } else {
            ajaxRequest('/admin/role/'+role.id, role, this.saveRoleResponse, 'PUT');
        }
    }

    delete(id) {
        ajaxRequest('/admin/role/'+id, {}, this.deleteRoleResponse, 'DELETE');
    }
}

export default alt.createActions(RoleAction);