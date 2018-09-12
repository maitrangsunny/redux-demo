import * as types from '../constants/ActionTypes';

const initialState = {
    sortBy : '',
    sortValue: 1 // 1: up, -1: down
}; 
var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SORT:
            return action.sortTask;
        default:
            return state;
    }
    return state;
}
export default myReducer;