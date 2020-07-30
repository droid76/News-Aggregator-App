import React, {Component} from 'react';
import AsyncSelect from 'react-select/async';
require("babel-polyfill");
import _ from "lodash";
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class SearchBar extends Component
{
    constructor(props) 
    {
        super(props);
        this.state = {selectedValue:''}
    }

    componentWillReceiveProps(nextProps,nextContext)
    {
      if(localStorage.getItem("searchValue")=="true")
      {
        this.setState({selectedValue:''});
      }
    }

    loadOptions(query,callback) 
    {
       
          axios.get(
            `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=${query}`,
            {
              headers: {
                "Ocp-Apim-Subscription-Key": "42ab0c0216354feb908f81e462a5f350"
              }
            })
            .then(function(response){
             var data= response.data.suggestionGroups[0].searchSuggestions;
             let options= data.map(function(result){
               return{
                 value:result.url,
                 label:result.displayText
               }
             })
             callback(options)
            })
    }
    callSearch = selectedValue =>
    {
        this.setState({selectedValue});
        localStorage.setItem("searchValue",false);
        this.props.history.push({
            pathname:"/search",
            search: "q="+selectedValue.label
        });
    }

    render()
    {
        return (
             <AsyncSelect
                loadOptions={_.debounce((query,callback)=> this.loadOptions(query,callback),1000,{leading:true})}
                cacheOptions={true}
                value={this.state.selectedValue}
                placeholder="Enter keyword .." 
                onChange={this.callSearch} />

          );
    }

}
export default withRouter(SearchBar);