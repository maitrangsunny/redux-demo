import React, { Component } from 'react';
import TaskForm from "../src/components/TaskForm";
import Controls from "../src/components/Controls";
import TaskList from "../src/components/TaskList";
import _ from 'lodash';
import './App.css';
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			keyWord: '', 
			sortBy: 'name',
			sortValue: 1
		}
	}
	onGenerateData=()=>{
		var tasks = [
			{
				id: this.generateID(),
				name: "C#",
				status: false,
			},
			{
				
				id: this.generateID(),
				name: "JaVa#",
				status: true,
			},
			{
				
				id: this.generateID(),
				name: "HTML&CSS",
				status: true,
			},
		];
		this.setState({
			tasks : tasks
		});
		localStorage.setItem('tasks',JSON.stringify(tasks));
	}

	onToggleForm=()=>{
		var {itemEditing} = this.props;
		if(itemEditing && itemEditing.id !== '') {
			this.props.onOpenForm();			
		}else {
			this.props.onToggleForm();
		}
		this.props.onClearTask({
			id: '',
			name: '',
			status: false
		})
	}

	onShowForm=()=> {
		this.props.onOpenForm();
	}
	onSearch = (keyWord)=> {
		this.setState({
			keyWord: keyWord
		})
		console.log(keyWord);
	}
	onSort = (sortBy, sortValue) => {
		this.setState({
			sortBy: sortBy,
			sortValue: sortValue
		});
		console.log(this.state);
	}
  render() {
	var {keyWord, sortBy, sortValue} = this.state;//var tasks = this.state.tasks;
	var {isDisplayForm} = this.props;
    return (
      <div className="App App--modifier">
          <div className="container">
				<div className="row">
					<h3 className="heading__title">Task Management</h3>
				</div><br/><br/>
				<div className="row">
					<div className={isDisplayForm?'col-xs-4 col-sm-4 col-md-4 col-lg-4':''}>
						<TaskForm/>
					</div>
					<div className={isDisplayForm?'col-xs-8 col-sm-8 col-md-8 col-lg-8':'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
						<div className="distance">
							<button type="button" className="btn btn-primary" onClick={this.onToggleForm}>
							<span className="fa fa-plus mr-5"></span>Add Task</button>
						</div>
						<div className="distance">
							<button type="button" className="btn btn-danger" onClick={this.onGenerateData}>
							<span className="fa fa-plus mr-5"></span>Generate data</button>
						</div>
						<Controls onSearch = {this.onSearch}
								onSort = {this.onSort}
								sortBy = {sortBy}
								sortValue= {sortValue}/>
						<TaskList />
					</div>
				</div>        
          </div>
      </div>
    );
  }
}

// connect to store get props
const mapStateToProps = (state) => {
	return {
		isDisplayForm : state.isDisplayForm,
		itemEditing : state.itemEditing
	}
}
const mapDispatchToProps = (dispatch,props)=> {
	return {
		onToggleForm : ()=>{
			dispatch(actions.toggleForm());
		},
		onOpenForm : () => {
			dispatch(actions.openForm());
		},
		onClearTask : (task) => {
			dispatch(actions.editTask(task));

		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
