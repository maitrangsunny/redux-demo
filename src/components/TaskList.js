import React, { Component } from 'react';
import TaskItem from "./TaskItem";

import {connect} from 'react-redux';

class TaskList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1 //all: -1, active: 1, hidden: 0
        }
    }
    onChangeFilter = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(name === 'filterName'? value : this.state.filterName,
                            name === 'filterStatus'? value :  this.state.filterStatus);
        this.setState({
            [name]: value
        })
    }
    
    render(){
        var {tasks} = this.props; // var task = this.props.tasks in store
        console.log("tasklist",tasks);
        var {filterName, filterStatus} = this.state;
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
                            <input type="text" className="form-control" name = "filterName" value = {filterName}  onChange = {this.onChangeFilter}/>
                        </td>
                        <td>
                            <select className="form-control" name="filterStatus" value ={filterStatus} onChange = {this.onChangeFilter}>
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
        tasks: state.tasks  //get from index of reducers
    }
};
export default connect(mapStateToProps, null)(TaskList);