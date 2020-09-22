import { combineReducers } from "redux";
import tasks from "./Task";
import isDisplayForm from "./DisplayForm"
import updateTask from "./UpdateTask";
import filterTask from "./FilterTable";
import searchKeyword from "./SearchKeyword";
import sortTask from "./SortTask";

const myReducer = combineReducers({
    tasks, //tasks:tasks,
    isDisplayForm,
    updateTask,
    filterTask,
    searchKeyword,
    sortTask
})

export default myReducer;