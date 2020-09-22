import * as types from "./../constants/ActionType";

const initialState = { 
    sortBy:'name',
    sortValue : 1 
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SORT_TASK:    
        return {
            sortBy: action.sort.sortBy,
            sortValue: action.sort.sortValue,
        };
    default:
        return state;
  }
};

export default myReducer;
