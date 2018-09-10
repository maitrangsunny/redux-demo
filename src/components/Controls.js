import React, { Component } from 'react';
import Search from "./Search";
import Sort from "./Sort";

class Controls extends Component {
    render(){
        return(
            <div className="row">
               <Search onSearch = {this.props.onSearch}/>
               <Sort onSort = {this.props.onSort}
                    sortBy = {this.props.sortBy}
                    sortValue = {this.props.sortValue}/>
            </div>
        );
    }
}
export default Controls;