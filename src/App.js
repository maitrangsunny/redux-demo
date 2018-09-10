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
			taskEditing: null,
			filter: {
				name: '',
				status: -1
			},
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

	onAddSub=()=>{
		// if(this.state.isDisplayForm && this.state.taskEditing !== null){
		// 	this.setState({
		// 		isDisplayForm : true,
		// 		taskEditing: null
		// 	});
		// }else {
		// 	this.setState({
		// 		isDisplayForm : !this.state.isDisplayForm,
		// 		taskEditing: null
		// 	});
		// }
		this.props.onToggleForm();
		
	}

	onShowForm=()=> {
		this.props.onOpenForm();
	}
	onSubmit = (data) =>{
		//for update and add
		var {tasks} = this.state;  // == tasks = this.state.tasks
		if(data.id === ''){
			//add
			data.id = this.generateID();
			tasks.push(data);
		}else {
			var index = this.findIndex(data.id);
			tasks[index] = data;
		}
		this.setState({
			tasks : tasks,
			taskEditing: null
		});
		localStorage.setItem('tasks',JSON.stringify(tasks));
	}
	onUpdate = (id) => {
		var {tasks} = this.state;
		var index = this.findIndex(id);
		var edit = tasks[index];
		this.setState({
			taskEditing: edit
		});
		this.onShowForm();
		
	}
	onFilter = (filName, filStatus) => {
		filStatus = parseInt(filStatus);
		this.setState({
			filter: {
				name: filName.toLowerCase(),
				status: filStatus
			}
		})
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
	var {filter, keyWord, sortBy, sortValue} = this.state;//var tasks = this.state.tasks;
	var {isDisplayForm} = this.props;
	console.log(isDisplayForm);
	// if(filter) {
	// 	if(filter.name){
	// 		// tasks = tasks.filter((task)=>{
	// 		// 	return task.name.toLowerCase().indexOf(filter.name) !== -1
	// 		// });
	// 		tasks = _.filter(tasks, function(task) { return task.name.toLowerCase().indexOf(filter.name) !== -1 });
	// 	}
	// 	tasks = tasks.filter((task)=>{
	// 		if(filter.status === -1){
	// 			return task;
	// 		}else {
	// 			return task.status === (filter.status === 1? true: false)
	// 		}
	// 	});
	// }
	// if(keyWord) {
	// 	tasks = tasks.filter((task)=>{
	// 		console.log(task.name.toLowerCase().indexOf(keyWord) !== -1);
	// 			return task.name.toLowerCase().indexOf(keyWord) !== -1
	// 		});
	// }
	// if(sortBy === 'name'){
	// 	tasks.sort((a,b)=>{
	// 		if(a.name > b.name) return sortValue;
	// 		else if(a.name < b.name) return -sortValue;
	// 		else return 0;
	// 	});
	// }else {
	// 	tasks.sort((a,b)=> {
	// 		if(a.status > b.status) return -sortValue;
	// 		else if(a.status < b.status) return sortValue;
	// 		else return 0;
	// 	});
	// }
	
	var elmTaskForm = isDisplayForm?<TaskForm 
										onSubmit = {this.onSubmit}/>:'';	
    return (
      <div className="App App--modifier">
          <div className="container">
				<div className="row">
					<h3 className="heading__title">Task Management</h3>
				</div><br/><br/>
				<div className="row">
					<div className={isDisplayForm?'col-xs-4 col-sm-4 col-md-4 col-lg-4':''}>
					{elmTaskForm}
					</div>
					<div className={isDisplayForm?'col-xs-8 col-sm-8 col-md-8 col-lg-8':'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
						<div className="distance">
							<button type="button" className="btn btn-primary" onClick={this.onAddSub}>
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
						<TaskList  
								onUpdate = {this.onUpdate}
								onFilter = {this.onFilter}/>
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
		isDisplayForm : state.isDisplayForm
	}
}
const mapDispatchToProps = (dispatch,props)=> {
	return {
		onToggleForm : ()=>{
			dispatch(actions.toggleForm());
		},
		onOpenForm : () => {
			dispatch(actions.openForm());
		}		
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
