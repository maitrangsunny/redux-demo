import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false
        }
    }  
    onCloseForm = () =>{
        this.props.onCloseForm();
    }
    componentWillMount() {
        if(this.props.itemEditing){
            this.setState({
                id:this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status
            });
        }else {
            this.onClear();
        }
    }
    componentWillReceiveProps(nextProps){
        console.log('nextProps',nextProps);
        if(nextProps && nextProps.itemEditing) {
            //change add to update
            this.setState({
                id:nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status
            });
        }else if(nextProps && nextProps.itemEditing === null){
            //change update to add == reset
            this.setState({
                id: '',
                name: '',
                status: false
            })
        }
    }

    onChangeName = (e) =>{
        var target = e.target;
        var name = target.name;
        var value = target.value;
        if(name==='status')
        {
            value = target.value==='true'?true:false;
        }
        //luu lai state moi
        this.setState({
            [name]:value
        });
    }

    onSubmit = (e) =>{
        //dont reload page
        e.preventDefault();
        this.props.onSaveTask(this.state);
        //cancel and close form
        this.onCloseForm();
        this.onClear();
    }

    onClear = () =>{
        this.setState({
            name : '',
            status: false
        });
    }

    render(){
        var {id} = this.state;
        if(!this.props.isDisplayForm) return '';
        return(            
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{id !== ''?'Update task':'Add new task'}
                    <span className="fa fa-times text-right sym__close"
                    onClick={this.onCloseForm}></span>
                    </h3> 
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text" className="form-control" name="name"
                            value={this.state.name}
                            onChange={this.onChangeName}
                            />
                        </div>
                        <label>Status:</label>
                        
                        <select name="status" className="form-control" value={this.state.status} onChange={this.onChangeName}>
                            <option value={true}>Active</option>
                            <option value={false}>Hidden</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning"><span className="fa fa-plus mr-5"></span>Save</button> &nbsp;
                            <button type="button" className="btn btn-danger" onClick = {this.onClear}><span className="fa fa-times mr-5"></span>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>// panel panel-warning 
        );
    }
}
const mapStateToProps = (state)=>{
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing :  state.itemEditing
	}
}

const mapDispatchToProps = (dispatch,props)=> {
    return {
        onSaveTask : (task)=> {
            dispatch(actions.saveTask(task));
        },
        onCloseForm : () => {
			dispatch(actions.closeForm());
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
