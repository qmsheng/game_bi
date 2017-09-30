/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import PermissionAction from "../actions/PermissionAction";

class PermissionStore {
    constructor() {
        this.bindActions(PermissionAction);
        this.permissions = [];
        this.permission = {permission:'',method:'', id:'', description:''}
        this.showWin = false;
    }

    onSetEditObj(obj) {
        this.permission = obj;
    }

    onShowWin(show) {
        this.showWin = show;
    }

    onSaveResponse(data) {
        if (data.result == 0) {
            PermissionAction.query(this.permissions.current_page ? this.permissions.current_page : 1);
            this.showWin = false;
        }
    }

    onQueryResponse(data) {
        this.permissions = data.data.permissions;
        this.permission = {permission:'',method:'',id:'', description:''}
    }

    onDeleteResponse(data) {
        if (data.result == 0) {
            PermissionAction.query(this.permissions.current_page ? this.permissions.current_page : 1);
        }
    }
}

export default alt.createStore(PermissionStore);
