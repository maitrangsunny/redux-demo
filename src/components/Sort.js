import React, { Component } from 'react';
class Sort extends Component {   
    onClick = (sortBy, sortValue) =>{
        console.log(sortBy,'---', sortValue);
        this.props.onSort(sortBy,sortValue);
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
                            <a role="button" className={(this.props.sortBy === 'name' && this.props.sortValue===1)?'sort__selected':''}> 
                                <span className="fa fa-sort-alpha-up mr-5">
                                </span>Name A-Z
                            </a>
                        </li>
                        <li onClick = {()=>{this.onClick('name',-1)}}>
                            <a role="button" className={(this.props.sortBy === 'name' && this.props.sortValue===-1)?'sort__selected':''}>
                                <span className="fa fa-sort-alpha-down mr-5">
                                </span>Name Z-A
                            </a>
                        </li>
                        <li role="separator" className="divider"></li>
                        <li onClick = {()=>this.onClick('status',1)}><a role="button" className={(this.props.sortBy === 'status' && this.props.sortValue===1)?'sort__selected':''}>
                        <span className="fa fa-eye mr-5"></span> Active
                        </a></li>
                        <li onClick ={()=>this.onClick('status',-1)}><a role="button" className={(this.props.sortBy === 'status' && this.props.sortValue===-1)?'sort__selected':''}><span className="fa fa-eye-slash mr-5"></span>Hidden</a></li>
                    </ul>
                </div>
            </div>  
        );
    }
}
export default Sort;