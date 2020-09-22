// import { act } from "react-dom/test-utils";
import * as types from "./../constants/ActionType";

const s4 = () => {
    return Math.floor((1+ Math.random()) * 0x10000).toString(16).substring(1);
  }

const generateID = () => {
    return s4() + '-' + s4() + "-" + s4();
}
const data = JSON.parse(localStorage.getItem("tasks"))

const initialState = data ? data : [
    {
      id : generateID() ,
      name : 'Học lập trình Front-End',
      status : true
    },
    {
      id : generateID(),
      name : 'Học Back-End với PHP, NodeJs',
      status : false
    },
    {
      id : generateID() ,
      name : 'Học ReactJS',
      status : true
    }
  ];
const findIndex = (tasks, id) => {
    let result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
}
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
          return state;

        // add task
        case types.ADD_TASK:
            let newTask = {
              id: action.task.id,
              name: action.task.name,
              status: action.task.status === "true" ? true : false
            }
            if (!newTask.id) {
              newTask.id = generateID();   
              state.push(newTask);
            }
            else {
              let index = findIndex(state, newTask.id);
              state[index] = newTask;
            }
            localStorage.setItem("tasks", JSON.stringify(state))
          return [...state];

        //update status
        case types.UPDATE_STATUS_TASK:
            var id = action.id;
            var index = findIndex(state, id);
            state[index] = {
              ...state[index],
              status : !state[index].status
            };
            localStorage.setItem('tasks', JSON.stringify(state));
          return [...state];

        //delete
        case types.DELETE_TASK:
          id = action.id;
          index = findIndex(state, id);
          state.splice(index, 1);
          
          localStorage.setItem('tasks', JSON.stringify(state));

          return [...state];
        default:
          return state;
    }
}

export default myReducer;