import * as types from '../constants/ActionTypes';

const initialState = {
    sortBy : 'name',
    sortValue: 1 // 1: up, -1: down
}; 
var myReducer = (state = initialState, action) => {
    switch(action.type){
        case types.SORT:
            console.log('sort',action);
            return {
                by: action.sort.by,
                value: action.sort.value
            }
        default:
            return state;
    }
    return state;
}
export default myReducer;