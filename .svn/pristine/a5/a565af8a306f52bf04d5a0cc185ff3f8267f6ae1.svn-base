/**
 * Created by Administrator on 2016/9/14.
 */
import alt from '../alt';
import RoleAction from "../actions/RoleAction";

class RoleStore {
    constructor() {
        this.bindActions(RoleAction);
        this.roles = [];
        this.menus = [];
        this.permissions = [];
        this.showWin = false;
        this.role = {role_name:'',id:'', description:'', current_page:1, last_page:1};
    }

    onSaveRoleResponse(data) {
        if (data.result == 0) {
            RoleAction.query(this.roles.current_page);
            RoleAction.showWin(false);
        }
    }

    onSetEditObj(obj) {
        this.role = obj;
    }

    onShowWin(show) {
        this.showWin = show;
    }

    onQueryRoleResponse(data) {
        this.roles = data.data.roles;
    }

    onDeleteRoleResponse(data) {
        if (data.result == 0) {
            RoleAction.query(this.roles.current_page);
        }
    }

    onQueryMenuResponse(data) {
        this.menus = data.data.menus;
    }
    onQueryPermissionResponse(data) {
        this.permissions = data.data.permissions;
        console.log(this.permissions);
    }

}

export default alt.createStore(RoleStore);
