import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from "./actions/index"

class App extends Component {
  findIndex = (id) => {
    let result = -1;
    this.tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }
  onOpenForm = () => {
    const {updateTask} = this.props;
    if (updateTask && updateTask.id !== '') {
      this.props.onOpenForm();
    }
    else {
      this.props.onToggleForm();
    }
    this.props.onClearSubmit({
      id:'',
      name: '',
      status: false
    });
  }

  render(){
    const { isDisplayForm } = this.props;

    const elementTaskForm = isDisplayForm ? <TaskForm /> : "";
    return (
      <div className="App">
        <div className="container">
          <div className="text-center">
              <h1>I'm Fine! This is Todo List</h1>
              <hr/>
          </div>
          
          <div className="row">
              <div className= "col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  { elementTaskForm }
              </div>

              <div className={ isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                  <button type="button" 
                          className="btn btn-primary mb-15"
                          onClick= { this.onOpenForm }
                          >
                      <span className="fa fa-plus mr-5 "></span>Thêm Công Việc
                  </button>
                  <button 
                      type="button" 
                      className="btn btn-danger mb-15 ml-15"
                      onClick={ this.onGenerateData }
                      >
                      <span className="fa fa-plus mr-5"></span>Reset
                  </button>
                  <div className="row mt-15 mb-15">
                      <Control />
                  </div>
                  <div className="row mt-15">
                      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <TaskList />
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isDisplayForm: state.isDisplayForm,
    updateTask: state.updateTask
  }  
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm : () => {
      dispatch(actions.toggleForm());
    },
    onCloseForm : () => {
      dispatch(actions.closeForm());
    },
    onOpenForm : () => {
      dispatch(actions.openForm());
    },
    onClearSubmit : (task) => {
      dispatch(actions.updateTask(task));
    },
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
