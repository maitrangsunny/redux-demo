import {CreateStore, createStore} from 'redux';
import {sort,status} from './actions/index';
import myReducer from './reducers/index';
const store = createStore(myReducer);
var action = {type: 'TOGGLE_STATUS'}
store.dispatch(status()); // imported actions folder
//console.log(store.getState());
// var sortAction = {
//     type: 'SORT',
//     sort: {
//         by: 'name',
//         value: -1
//     }
// }
store.dispatch(sort({
    by: 'name',
    value: -1
}));
//console.log(store.getState());