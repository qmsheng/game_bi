/**
 * Created by Administrator on 2016/9/13.
 */
import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';

export default class Loading extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="ui segment z-full-container">
                <div className="ui active inverted dimmer">
                    <div className="ui medium text loader">
                        <FormattedMessage id="APP_LOADING_DESC" defaultMessage='加载中' />
                    </div>
                </div>
            </div>
        );
    }
}