import * as types from '../constants/ActionTypes';

const initialState = '';
var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SEARCH:
            console.log("search", action);
            return action.keyword;
        default:
            return state;
    }
    return state;
}
export default myReducer;