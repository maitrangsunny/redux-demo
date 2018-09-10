var initialState = {    
    by: 'name',
    value: 1 // 1: up, -1: down
}
var myReducer = (state = initialState,action) => {
   // console.log('action',action);
    if(action.type === 'SORT'){
        var {by, value} = action.sort;
        return  {         
            by,
            value
        }   
    }
    return state;
}
export default myReducer;