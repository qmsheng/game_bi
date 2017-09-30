/**
 * Created by Administrator on 2016/10/8.
 */

import AppAction from '../actions/AppAction';

export function ajaxRequest(url)
{
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    let params = arguments[1] ? arguments[1] : {};
    let onSuccess = arguments[2] ? arguments[2] : AppAction.success;
    let method = arguments[3] ? arguments[3] : 'POST';

    return $.ajax({
        type: method,
        url: url,
        dataType: "json",
        timeout : 3600000,
        data : params,
        beforeSend:function(){
            //AppAction.startLoading();
        },
        success:function(data) {
            //AppAction.endLoading();
            onSuccess(data);
        },
        error : function(data){
            //AppAction.error(data);
        }
    });
}