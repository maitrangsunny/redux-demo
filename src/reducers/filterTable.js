import * as types from '../constants/ActionTypes';

const initialState = {
    name : '',
    status: -1
}; 
var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.FILTER_TABLE:
            action.filter.status = parseInt(action.filter.status);
            return action.filter;
        default:
            return state;
    }
    return state;
}
export default myReducer;