import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './views/App'
import Login from './views/Login'
import User from './views/User'
import Role from './views/Role'
import Permission from './views/Permission'
import Platform from './views/Platform'
import Server from './views/Server'
import Menu from './views/Menu'
import SendMail from './views/SendMail'
import SendNotice from './views/SendNotice'
import KickPlayer from './views/KickPlayer'
import QueryPlayer from './views/QueryPlayer'
import QueryOnline from './views/QueryOnline'

import LostReport from './views/LostReport'
import QueryGuard from './views/QueryGuard'
import FrameFrequency from './views/FrameFrequency'
import AllFrameFrequency from './views/AllFrameFrequency'
import NewFrameFrequency from './views/NewFrameFrequency'

import ServerActivity from './views/ServerActivity'

import ServerReport from './views/ServerReport'
import QueryDistributed from './views/QueryDistributed'
import NewReport from './views/NewReport'
import PreserveReport from './views/PreserveReport'
import RoleCopy from './views/RoleCopy'
import ConsumePoint from './views/ConsumePoint'

import QueryConsume from './views/QueryConsume'


import AddTest from './views/AddTest'
import AllServerReport from './views/AllServerReport'
import TotalServerReport from './views/TotalServerReport'
import Recharge from './views/Recharge'
import BindDiamond from './views/BindDiamond'
import DiamondConsume from './views/DiamondConsume'


import InComeReport from './views/InComeReport'
import ChargeOrder from './views/ChargeOrder'
import PayData from './views/PayData'
import DiamondSpread from './views/DiamondSpread'
import CdKey from './views/CdKey'
import CdKeyQuery from './views/CdKeyQuery'

export default (
    <Route>
        <Route path="/" component={App}>
            <Route path="user" component={User} />
            <Route path="role" component={Role} />
            <Route path="permission" component={Permission} />
            <Route path="platform" component={Platform} />
            <Route path="server" component={Server} />
            <Route path="menu" component={Menu} />
            <Route path="lost" component={LostReport} />
            <Route path="consumepoint" component={ConsumePoint} />

            <Route path="userinfo" component={QueryPlayer} />
            <Route path="datadistribute" component={QueryDistributed} />
            <Route path="newguard" component={QueryGuard} />
            <Route path="framefrequencyquery" component={FrameFrequency} />
            <Route path="allframefrequency" component={AllFrameFrequency} />
            <Route path="newframefrequency" component={NewFrameFrequency} />
            <Route path="serveractivity" component={ServerActivity} />
            <Route path="kickplayer" component={KickPlayer} />
            <Route path="compensate" component={SendMail} />
            <Route path="sendnotice" component={SendNotice} />
            <Route path="sendmail" component={SendMail} />
            <Route path="queryconsume" component={QueryConsume} />

            <Route path="report" component={TotalServerReport} />



            <Route path="test" component={AddTest} />
            <Route path="recharge" component={Recharge} />
            <Route path="binddiamond" component={BindDiamond} />
            <Route path="diamondconsume" component={DiamondConsume} />           
            



            <Route path="serversreport" component={AllServerReport} />
            <Route path="serverreport" component={ServerReport} />
            <Route path="preservereport" component={PreserveReport} />
            <Route path="onlinereport" component={QueryOnline} />
            <Route path="newreport" component={NewReport} />
            <Route path="incomereport" component={InComeReport} />
            <Route path="orderreport" component={ChargeOrder} />
            <Route path="paydata" component={PayData} />
            <Route path="diamondspread" component={DiamondSpread} />

            <Route path="cdkey" component={CdKey} />
            <Route path="cdkeysearch" component={CdKeyQuery} />

            <Route path="activity" component={QueryPlayer} />

            <Route path="rolecopy" component={RoleCopy} />

        </Route>
        <Route path="/login" component={Login} />
    </Route>
);