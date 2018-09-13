import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';

class Sort extends Component {   
    onClick = (sortBy,sortValue) =>{
        this.props.onSort({
            by: sortBy,
            value: sortValue
        })
    }
    render(){       
        return(
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="dropdown">                        
                    <button type="button" className="btn btn-success dropdown-toggle"  id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <span className="fa fa-sort-alpha-down mr-5"></span>Sort
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={()=>this.onClick('name',1)}>
                            <a role="button" className={(this.props.sort.by === 'name' && this.props.sort.value===1)?'sort__selected':''}> 
                                <span className="fa fa-sort-alpha-up mr-5">
                                </span>Name A-Z
                            </a>
                        </li>
                        <li onClick = {()=>{this.onClick('name',-1)}}>
                            <a role="button" className={(this.props.sort.by === 'name' && this.props.sort.value===-1)?'sort__selected':''}>
                                <span className="fa fa-sort-alpha-down mr-5">
                                </span>Name Z-A
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick = {()=>this.onClick('status',1)}><a role="button" className={(this.props.sort.by === 'status' && this.props.sort.value===1)?'sort__selected':''}>
                        <span className="fa fa-eye mr-5"></span> Active
                        </a></li>
                        <li onClick ={()=>this.onClick('status',-1)}><a role="button" className={(this.props.sort.by === 'status' && this.props.sort.value===-1)?'sort__selected':''}><span className="fa fa-eye-slash mr-5"></span>Hidden</a></li>
                    </ul>
                </div>
            </div>  
        );
    }
}
// connect to store get props
const mapStateToProps = (state) => {
	return {
        sort:state.sort
    }
}
const mapDispatchToProps = (dispatch,props)=> {
	return {
		onSort : (sort) => {
            dispatch(actions.sortTask(sort));
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Sort);