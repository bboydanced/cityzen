import * as types from "./../constants/ActionType";


const initialState = {
        id: '',
        name : '',
        status: false
};

const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_TASK:
          return action.task;

        default:
          return state;
    }
}

export default myReducer;