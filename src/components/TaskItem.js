import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions/index"

class TaskItem extends Component {
    onUpdate = () => {
        this.props.onOpenForm();
        this.props.onUpdate(this.props.task);
    }
    onDelete = () => {
        this.props.onDelete(this.props.task.id);
        this.props.onCloseForm();
    }
    render(){   
        const { task, index } = this.props;
        return (
            <tr className="task-item">
                <td>{ index + 1}</td>
                <td>{ task.name }</td>
                <td className="text-center">
                    <span className={ task.status === false ? 'label label-success padding-icon' : 'label label-danger padding-icon1'}
                        onClick={ () => this.props.onUpdateStatus(task.id) }
                    >{ task.status === false ? 'Kích hoạt' : 'Ẩn'}
                    </span>
                </td>
                <td className="text-center">
                    <button type="button" className="btn btn-warning" onClick={ this.onUpdate} >
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <button type="button" className="btn btn-danger" onClick={ this.onDelete } >
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        // ...state , co the su dung, nhung k nen . Vi khi click update status cung co the lam render lai het
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStatus : (id) => {
            dispatch(actions.updateStatus(id));
        },
        onDelete: (id) => {
            dispatch(actions.deleteTask(id))
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        },
        onOpenForm : () => {
            dispatch(actions.openForm());
        },
        onUpdate : (task) => {
            dispatch(actions.updateTask(task));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
