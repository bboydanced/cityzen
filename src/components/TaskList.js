import React, { Component } from "react";
import { connect } from "react-redux";
import TaskItem from "./TaskItem";
import * as actions from "./../actions/index";

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterName: "",
      filterStatus: -1,
    };
  }
  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;
    let filter = {
        name : name === 'filterName' ? value : this.state.filterName,
        status : name === 'filterStatus' ? value : this.state.filterStatus 
    };
    this.props.onFilterTable(
        filter
    );

    this.setState({
      [name]: value,
    });
  };
  render() {
    let { tasks, filterTable, keyword, sort } = this.props;
    const { filterName, filterStatus } = this.state;
    
    //filter
    if (filterTable) {
      if (filterName !== ''){
        tasks = tasks.filter(task => {
          return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
        });
      }
      if (filterStatus !== -1) {
        tasks = tasks.filter(task => {
          if (filterTable.status === -1) {
            return task; 
          } else {
            return task.status === (filterTable.status === 1 ? false : true) ;
        }
        })
      }
    }
    //search
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      }); 
    }
    //sort 
    if (sort.sortBy === 'name') {
      tasks.sort((a, b) => {
        let nameA = a.name.toLowerCase();
        let nameB = b.name.toLowerCase();
        if (nameA > nameB ) return sort.sortValue;
        else if (nameA < nameB ) return -sort.sortValue;
        else return 0;
      });
    } else {
      tasks.sort((a, b) => {
        if (a.status > b.status ) return -sort.sortValue;
        else if (a.status < b.status ) return sort.sortValue;
        else return 0;
      });
    }

    // map item
    const elementTask = tasks.map((task, index) => {
      return <TaskItem key={task.id} index={index} task={task} />;
    });

    return (
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th className="text-center">STT</th>
            <th className="text-center">Tên công việc</th>
            <th className="text-center">Trạng Thái</th>
            <th className="text-center">Hành Động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                className="form-control"
                name="filterName"
                value={filterName}
                onChange={this.onChange}
              />
            </td>
            <td>
              <select
                className="form-control"
                name="filterStatus"
                value={filterStatus}
                onChange={this.onChange}
              >
                <option value="-1">Tất Cả</option>
                <option value="0">Ẩn</option>
                <option value="1">Kích Hoạt</option>
              </select>
            </td>
            <td></td>
          </tr>
          {elementTask}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    filterTable : state.filterTask,
    keyword: state.searchKeyword,
    sort: state.sortTask
  };
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable: (filter) => {
      dispatch(actions.filterTask(filter));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
