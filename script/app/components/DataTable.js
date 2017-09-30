/**
 * Created by Administrator on 2016/9/13.
 */
import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import Page from './Page';

export default class DataTable extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    handleCheckAll(e) {

    }

    render() {

        let headers = [];
        let config = this.props.config;
        let fields = config.fields;
        for(var j = 0; j < fields.length; j++) {
            if (fields[j].type == 'ck') {
                headers.push(
                    <th width={fields[j].width} className={fields[j].styleName}>
                        {fields[j].title}
                    </th>
                );
            } else {
                headers.push(<th width={fields[j].width} className={fields[j].styleName}>{fields[j].title}</th>);
            }
        }

        let bodys = [];
        if (config.data && config.data.length > 0) {
            for (var i = 0; i < config.data.length; i++) {
                let tds = [];
                for(var j = 0; j < fields.length; j++) {
                    if (fields[j].type == 'text') {
                        if (fields[j].subFieldName && fields[j].subFieldName != '') {
                            tds.push(<td className={fields[j].styleName}>{config.data[i][fields[j].fieldName][fields[j].subFieldName]}</td>);
                        } else if(fields[j] && fields[j].subFieldNames && fields[j].subFieldNames != '') {
                            let vals = '';
                            for(let n = 0; n < config.data[i][fields[j].fieldName].length; n++) {
                                vals += "  " + config.data[i][fields[j].fieldName][n][fields[j].subFieldNames];
                            }
                            tds.push(<td className={fields[j].styleName}>{vals}</td>);

                        } else {
                            tds.push(<td className={fields[j].styleName}>{config.data[i][fields[j].fieldName]}</td>);
                        }
                    }
                    else if (fields[j].type == 'op') {
                        let bts = [];
                        if (fields[j].options.edit) {
                            bts.push(<button className="ui button" onClick={fields[j].options.edit.bind(this, config.data[i])}><i className="configure icon"></i></button>);
                        }
                        if (fields[j].options.delete) {
                            bts.push(<button className="ui button" onClick={fields[j].options.delete.bind(this, config.data[i].id)}><i className="trash icon"></i></button>);
                        }
                        tds.push(
                            <td className={fields[j].styleName}>
                                <div className="ui small basic icon buttons">
                                    {bts}
                                </div>
                            </td>
                        );
                    } else if (fields[j].type == 'ck') {
                        let checked = false;
                        if (fields[j].ref) {
                            for(let n = 0; n < fields[j].ref.length; n++) {
                                if (fields[j].ref[n] == config.data[i][fields[j].fieldName]) {
                                    checked = true;
                                    break;
                                }
                            }
                        }
                        tds.push(
                            <td className={fields[j].styleName}>
                                <div className="ui child checkbox">
                                    <input type="checkbox" checked={checked ? 'checked' : ''} onChange={fields[j].options.check.bind(this, config.data[i][fields[j].fieldName])} />
                                    <label></label>
                                </div>
                            </td>
                        );
                    } else if (fields[j].type == 'active') {
                        if (config.data[i][fields[j].fieldName] == 1)
                            tds.push(<td className={fields[j].styleName}><i className="icon checkmark"></i></td>);
                        else
                            tds.push(<td className={fields[j].styleName}><i className="icon close"></i></td>);
                    } else if (fields[j].type == 'buttons') {
                        let bts = [];
                        if (fields[j].options.buttons && fields[j].options.buttons.length > 0) {
                            for(let n = 0; n < fields[j].options.buttons.length; n++) {
                                bts.push(<button className="ui button" onClick={fields[j].options.buttons[n].click.bind(this, config.data[i])}><i className={fields[j].options.buttons[n].styles}></i>{fields[j].options.buttons[n].title}</button>);
                            }
                        }
                        tds.push(
                            <td className={fields[j].styleName}>
                                <div className="ui small basic icon buttons">
                                    {bts}
                                </div>
                            </td>
                        );
                    } else {
                        continue;
                    }
                }
                bodys.push(<tr>{tds}</tr>);
            }
        }

        return (
            <div className="ui segments">
                <div className="ui secondary segment">
                    {this.props.title ? (this.props.title) : (this.props.config.title ? this.props.config.title : '') }
                </div>
                <div className="ui segment">
                    <table className="ui segment selectable celled table">
                        <thead>
                        <tr>
                            {headers}
                        </tr>
                        </thead>
                        <tbody>
                        {bodys}
                        </tbody>
                        {
                            config.page ? (
                                <tfoot>
                                <tr>
                                    <th colSpan={fields.length} className="center aligned">
                                        {
                                            config.query ? (<Page page={config.page} max={config.max}
                                                                  handleClickPage={config.query.bind(this)}/>) : (
                                                <div></div>)
                                        }
                                    </th>
                                </tr>
                                </tfoot>
                            )
                                :
                                <tfoot></tfoot>
                        }
                    </table>
                </div>
            </div>
        );
    }
}