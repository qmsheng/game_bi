<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/
Route::group(['prefix' => 'client/api'], function() {
    Route::any('rank', 'Game\ApiController@rank');
    Route::any('fans', 'Game\ApiController@fans');
});


Route::group(['prefix' => 'rpt'], function(){
    Route::any('report_online_num/{server_id}/{online_num}', 'Game\ReportController@reportOnlineNum');
    Route::any('report', 'Game\ReportController@report');
});

Route::group(['prefix' => 'api'], function() {
    Route::any('pay', 'ApiController@pay');
    Route::any('getuserinfo', 'ApiController@getUserInfo');
    Route::any('getonlinenum', 'ApiController@getOnlineNum');
    Route::any('regnum', 'ApiController@getRegNum');
    Route::any('game', 'ApiController@login');
    Route::any('playgame', 'ApiController@playGame');
    Route::any('test', 'ApiController@test');
});

Route::group(['prefix' => 'kongzhong'], function() {
    Route::any('game', 'ApiKongZhongController@game');
    Route::any('pay', 'ApiKongZhongController@pay');
    Route::any('role', 'ApiKongZhongController@getRoleInfo');
});


Route::group(['prefix'=>'admin', 'namespace'=>'Admin'], function(){
    Route::any('/', function(){
        return view('admin');
    });
    Route::any('login', 'AppController@login');
    Route::any('logout', 'AppController@logout');
    Route::any('init', 'AppController@initApp');

    Route::resource('user', 'UserController');
    Route::resource('role', 'RoleController');
    Route::resource('permission', 'PermissionController');
    Route::resource('menu', 'MenuController');
    Route::resource('platform', 'PlatformController');
    Route::resource('server', 'ServerController');
    Route::resource('lost', 'LostReportController');
    Route::resource('consume', 'ConsumePointController');
    Route::resource('cdkey', 'CdKeyController');


    Route::any('queryMGame', 'MGameController@query');
    Route::any('sendMail', 'MGameController@sendMail');
    Route::any('querySendMail', 'MGameController@querySendMail');
    Route::any('sendNotice', 'MGameController@sendNotice');
    Route::any('kickPlayer', 'MGameController@kickPlayer');
    Route::any('freezePlayer', 'MGameController@freezePlayer');
    Route::any('silencePlayer', 'MGameController@silencePlayer');
    Route::any('unfreezePlayer', 'MGameController@unfreezePlayer');
    Route::any('unsilencePlayer', 'MGameController@unsilencePlayer');
    Route::any('copyPlayer', 'MGameController@copyPlayer');
    Route::any('tempAPI', 'MGameController@tempAPI');
    Route::any('generateCdKey', 'MGameController@generateGiftCode');
    Route::any('exportCdKey', 'MGameController@exportCdKey');





    Route::any('addActivityTask', 'QGameController@addActivityTask');
    Route::any('getActivityTask', 'QGameController@getActivityTask');
    Route::any('delActivityTask', 'QGameController@delActivityTask');


    Route::any('makeGSServer', 'ServerController@makeGSServer');
    Route::any('openServer', 'ServerController@openServer');
    Route::any('closeServer', 'ServerController@closeServer');
    Route::any('queryAllServerReport', 'QGameController@queryAllServerReport');
    Route::any('queryTotalServerReport', 'QGameController@queryTotalServerReport');

    Route::any('queryRechargeInfo', 'QGameController@queryRechargeInfo');
    Route::any('bindDiamondOutput', 'QGameController@bindDiamondOutput');
    Route::any('queryDiamondConsume', 'QGameController@queryDiamondConsume');

    Route::any('testFunc', 'MGameController@testFunc');




    Route::any('queryPlayerFrameFrequency', 'MGameController@queryPlayerFrameFrequency');
    Route::any('queryAllPlayerFrameFrequency', 'MGameController@queryAllPlayerFrameFrequency');
    Route::any('queryNewPlayerFrameFrequency', 'MGameController@queryNewPlayerFrameFrequency');
    Route::any('openServerActivityPlan', 'MGameController@openServerActivityPlan');
    Route::any('queryOpenServerActivityPlan', 'MGameController@queryOpenServerActivityPlan');
    Route::any('queryQGame', 'QGameController@queryQGame');
    Route::any('queryPlayer', 'QGameController@queryRoleInfo');
    Route::any('queryOnline', 'QGameController@queryOnline');
    Route::any('queryGuard', 'QGameController@queryGuard');
    Route::any('queryConsume', 'QGameController@queryConsume');
    Route::any('queryInComeReport', 'QGameController@queryInComeReport');
    Route::any('queryChargeOrder', 'QGameController@queryChargeOrder');
    Route::any('queryDiamondSpread', 'QGameController@queryDiamondSpread');
    Route::any('queryPayData', 'QGameController@queryPayData');
    Route::any('queryCdKey', 'QGameController@queryCdKey');

    Route::any('queryFreeze', 'MGameController@queryFreeze');
    Route::any('queryNotice', 'MGameController@queryNotice');
    Route::any('delNotice', 'MGameController@delNotice');
    

    Route::any('queryServerReport', 'QGameController@queryServerReport');
    Route::any('queryDistribute', 'QGameController@queryDistribute');
    Route::any('queryNewReport', 'QGameController@queryNewReport');
    Route::any('queryPreserveReport', 'QGameController@queryPreserveReport');
});


Auth::routes();

Route::get('/home', 'HomeController@index');

Auth::routes();

Route::get('/home', 'HomeController@index');
