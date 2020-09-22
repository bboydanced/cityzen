/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions/index";

class Control extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: ''
        }
    }
    onChange = (e) => {
        let target = e.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name] : value
        });
    }
    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    onClickSort = async(sortBy, sortValue) => {
        await this.props.onSort({
            sortBy: sortBy,
            sortValue: sortValue
        });
    }

    render(){
        let { keyword } = this.state;
        const { sortBy , sortValue } = this.props.sort; 
        return (
            <div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group">
                        <input  type="text" 
                                className="form-control" placeholder="Nhập từ khóa..." 
                                name="keyword"
                                value={ keyword }
                                onChange = { this.onChange }
                        />
                        <span className="input-group-btn">
                            <button className="btn btn-primary" 
                                    type="button"
                                    onClick= { this.onSearch }
                            >
                                <span className="fa fa-search mr-5"></span>Tìm
                            </button>
                        </span>
                    </div>
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" 
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                            Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                            <li onClick={() => this.onClickSort('name', 1)} >
                                <a  role="button" href='#'
                                    className={ (sortBy ==='name' && sortValue === 1) ? "icon-sort-checked" : ''} 
                                >
                                    <span>
                                        <i className="fa fa-sort-alpha-asc mr-5"></i>
                                        <span>Tên A-Z</span>
                                    </span>
                                </a>
                            </li>
                            <li onClick={ ()=> this.onClickSort('name', -1)}>    
                                <a  role="button" href='#'
                                    className={ (sortBy ==='name' && sortValue === -1) ? "icon-sort-checked" : ''} 
                                >
                                    <span >
                                        <i className="fa fa-sort-alpha-desc mr-5"></i>
                                        <span>Tên Z-A</span>
                                    </span>
                                </a>
                            </li>
                            <li role="separator" className="divider"></li>
                            <li onClick={ () => this.onClickSort('status', -1) }>
                                <a role="button" href='#'
                                    className={(sortBy ==='status' && sortValue === -1) ? "icon-sort-checked" : ''} 
                                >Trạng Thái Kích Hoạt</a>
                            </li>
                            <li onClick={ ()=> this.onClickSort('status', 1) }>
                                <a role="button" href='#' 
                                    className={(sortBy ==='status' && sortValue === 1) ? "icon-sort-checked" : ''} 
                                >Trạng Thái Ẩn</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        keyword: state.searchKeyword,
        sort: state.sortTask
    }
}

const mapDispatchToProps = (dispatch, props)=> {
    return {
        onSearch : (keyword) => {
            dispatch(actions.searchTask(keyword));
        },
        onSort: (sort) => {
            dispatch(actions.sortTask(sort));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Control);