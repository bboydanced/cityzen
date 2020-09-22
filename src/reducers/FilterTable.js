import * as types from "./../constants/ActionType";

const initialState = {
  filter: {
    name: "",
    status: -1,
  },
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FILTER_TASK:
        action.filter.status = parseInt(action.filter.status);
        action.filter.name =  action.filter.name.toLowerCase()
        // filter theo ten , trang thai

        
        return action.filter;

    default:
      return state;
  }
};

export default myReducer;
