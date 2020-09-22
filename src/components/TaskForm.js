import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions/index";


class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name : '',
            status: false
        }
    }
    UNSAFE_componentWillMount() {
        const { updateTask } =this.props;
        if( updateTask ){
            this.setState({
                id: updateTask.id,
                name: updateTask.name,
                status: updateTask.status,
            });   
        }
        else {
            this.onClear();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if( nextProps && nextProps.updateTask){
            this.setState({
                id: nextProps.updateTask.id,
                name: nextProps.updateTask.name,
                status: nextProps.updateTask.status,
            });   
        } else if (nextProps && nextProps.updateTask === null) {
            this.onClear();
        }
    }

    onClear = () => {
        this.setState({
            id : '',
            name : '',
            status: false
        });
    }

    onChange = (e) => {
        const target = e.target;
        let name = target.name; 
        let value = target.value;
        this.setState({
            [name] : value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        // Redux
        this.props.onSubmit(this.state);
        
        this.onClear();
        this.props.onCloseForm();
    }

    render(){
        const { id } = this.props.updateTask;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <span className="panel-title">
                        { id === '' ? 'Thêm công việc': 'Cập nhật' }
                    </span>
                    <span>
                        <button type="submit" 
                        className="btn btn-info floatright fa fa-close" 
                        onClick= { this.props.onCloseForm}
                        ></button>
                    </span>
                    
                </div>
                <div className="panel-body">
                    <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input  type="text" 
                                    className="form-control" 
                                    name="name" value={ this.state.name } onChange={this.onChange} />
                        </div>
                        <label>Trạng Thái :</label>
                        <select className="form-control" required="required" 
                                name="status" value={ this.state.status } 
                                onChange= {this.onChange}>
                            <option value={ false }>Kích Hoạt</option>
                            <option value={ true }>Ẩn</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Lưu lại
                            </button>
                            &nbsp; 
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>
                                <span className="fa fa-close mr-5"></span>Hủy Bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        updateTask: state.updateTask
    }
}

const mapDispatchToProps = (dispatch, props)=> {
    return {
        onSubmit : (task) => {
            dispatch(actions.addTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
