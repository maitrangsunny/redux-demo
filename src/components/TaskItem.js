import React, { Component } from 'react';

import {connect} from 'react-redux';
import * as actions from '../actions/index';
    
class TaskItem extends Component {
    onUpdateStatus = ()=>{
        this.props.onUpdateStatus(this.props.item.id);
    }
    onDelete = ()=> {
        this.props.onDeleteTask(this.props.item.id);
        this.props.onCloseForm();
    }
    onUpdate = ()=> {        
        this.props.onEditTask(this.props.item);
        this.props.onOpenForm();
       
    }
    render(){
        var {item,index} = this.props;
        return(
            <tr>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td className="text-center">
                <span className={item.status===true?'label label-success':'label label-danger'}
                onClick = {this.onUpdateStatus}>
                {item.status===true ? 'Active':'Hidden'} 

                </span>
                </td>
                <td className="text-center">
                <button type="button" className="btn btn-warning" onClick = {this.onUpdate}>
                <span className="fa fa-pen mr-5"></span>Sửa
                </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick = {this.onDelete}>
                <span className="fa fa-trash mr-5"></span>Xóa
                </button>
                </td>
            </tr>
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        
    }
}

const mapDispatchToProps = (dispatch,props)=> {
    return {
        onUpdateStatus : (id)=> {
            dispatch(actions.updateStatus(id));
        },
        onDeleteTask : (id) => {
            dispatch(actions.deleteTask(id));
        },
        onCloseForm : () => {
			dispatch(actions.closeForm());
		},
        onOpenForm : ()=>{
			dispatch(actions.openForm());
        },
        onEditTask : (task) => {
            dispatch(actions.editTask(task));
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);