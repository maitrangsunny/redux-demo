import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/index';
class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword : ''
        }
    }
    onChangeKey = (e) =>{
        //multi input
        var target = e.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            //multi input
            [name]: value
        })
    }
    onSearch = () =>{
        this.props.onSearch(this.state.keyword); //get frpm store
    }
    render(){
        var {keyword} = this.state;
        return(
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group distance">
                    <input type="text" name="keyword" className="form-control" value="" placeholder="keyword..."
                    value = {keyword} onChange = {this.onChangeKey}/>
                    <span className="input-group-btn">                            
                        <button type="button" className="btn btn-primary" onClick={this.onSearch}>
                            <span className="fa fa-search mr-5"></span>
                            Search
                        </button>
                    </span>
                </div>
            </div>
        );
    }
}
// connect to store get props
const mapStateToProps = (state) => {
	return {}
}
const mapDispatchToProps = (dispatch,props)=> {
	return {
		onSearch: (keyword) => {
            dispatch(actions.searchTask(keyword));
        }
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Search);