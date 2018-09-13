import React, { Component } from 'react';
import TaskItem from "./TaskItem";

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index';
import _ from 'lodash';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }
 
    onChangeFilter = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        var filter = {
            name   : name === 'filterName'? value : this.state.filterName,
            status : name === 'filterStatus'? value :  this.state.filterStatus
        }
        this.props.onFilterTable(filter);
        this.setState({
            [name]: value
        })
    }
    
    render(){
        var {tasks, filterTable, keyword, sort} = this.props; // var task = this.props.tasks in store       
        if(filterTable.name){
            // tasks = tasks.filter((task)=>{
            // 	return task.name.toLowerCase().indexOf(filter.name) !== -1
            // });
            tasks = _.filter(tasks, function(task) { return task.name.toLowerCase().indexOf(filterTable.name) !== -1 });
        }
        tasks = tasks.filter((task)=>{
            if(filterTable.status === -1){
                return task;
            }else {
                return task.status === (filterTable.status === 1? true: false)
            }
        });
        tasks = _.filter(tasks, function(task) { return task.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1});
        if(sort.by === 'name'){
            tasks.sort((a,b) => {
                if(a.name > b.name) return sort.value;
                else if(a.name < b.name) return -sort.value;
                else return 0;
            })
        }else {
            tasks.sort((a,b)=> {
                if(a.status > b.status) return -sort.value;
                else if(a.status < b.status) return sort.value;
                else return 0;
            })
        }
        var elmTasks = '';
        elmTasks= tasks.map((item,index)=>{
            return <TaskItem 
                    key={item.id} 
                    index={index} 
                    item={item} />
        });
        return(
            <table className="table table-bordered table-hover table-responsive">
                <thead>
                    <tr>
                        <th className="text-center">No</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Status</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input type="text" className="form-control" name = "filterName" value = {filterTable.name}  onChange = {this.onChangeFilter}/>
                        </td>
                        <td>
                            <select className="form-control" name="filterStatus" value ={filterTable.status} onChange = {this.onChangeFilter}>
                                <option value="-1">Tất Cả</option>
                                <option value="0">Ẩn</option>
                                <option value="1">Kích Hoạt</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elmTasks}
                   
                </tbody>
            </table>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        tasks: state.tasks,  //get from index of reducers
        filterTable : state.filterTable,
        keyword : state.search,
        sort : state.sort
    }
};
const mapDispatchToProps = (dispatch,props)=> {
    return {
        onFilterTable : (filter) => {
            dispatch(actions.filterTask(filter))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList);