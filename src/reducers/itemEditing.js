import * as types from '../constants/ActionTypes';

const initialState = {}; 
var myReducer = (state= initialState, action) => {
    switch(action.type){
        case types.EDIT_TASK:
            return action.task
    }
    return state;
}
export default myReducer;