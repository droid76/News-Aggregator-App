import React, {Component} from 'react';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router,Switch as RouterSwitch,Route} from "react-router-dom";
import Home from './Home';
import World from './World';
import Politics from './Politics';
import Business from './Business';
import Technology from './Technology';
import Sports from './Sports';
import NytDetailed from './NytDetailed';
import GuardianDetailed from './GuardianDetailed';
import Bookmarks from './Bookmarks';
import Search from './Search';
import Spinner from './Spinner';
class App extends Component 
{ 
    constructor() {
        super();
        this.state = {loading:true,showToggle:true,checked:true}
      }

      callback = (value) =>{
          this.setState({checked:value})
      }

      spinnerCallback = (value) =>{
        this.setState({loading : value});
    }
    toggleCallback = (value) =>{
      this.setState({showToggle:value})
    }

      callSpinner()
      {
        if(this.state.loading)
        {
          return(
          <Spinner loading={this.state.loading}/>
          );
        }
      }

    render()
    {
        return(
           <Router>
           <div>    
                <Navigation callbackFromParent = {this.callback} loadCallback={this.spinnerCallback} showToggle={this.state.showToggle} 
                loading={this.state.loading}/>
                {this.callSpinner()}       
                <RouterSwitch>
              <Route exact path="/">
                <Home  loadCallback={this.spinnerCallback} loading={this.state.loading} sendToggle={this.toggleCallback}/>
              </Route>
              <Route exact path="/world">
                <World  loadCallback={this.spinnerCallback} loading={this.state.loading} sendToggle={this.toggleCallback}/>
              </Route>
              <Route exact path="/politics">
                <Politics  loadCallback={this.spinnerCallback} loading={this.state.loading} sendToggle={this.toggleCallback}/>
              </Route>
              <Route exact path="/business">
                <Business  loadCallback={this.spinnerCallback} loading={this.state.loading} sendToggle={this.toggleCallback}/>
              </Route>
              <Route exact path="/technology">
                <Technology  loadCallback={this.spinnerCallback} loading={this.state.loading} sendToggle={this.toggleCallback}/>
              </Route>
              <Route exact path="/sports">
                <Sports  loadCallback={this.spinnerCallback} loading={this.state.loading} sendToggle={this.toggleCallback}/>
              </Route> 
              <Route exact path="/nytArticle">
                <NytDetailed loadCallback={this.spinnerCallback} loading={this.state.loading} sendToggle={this.toggleCallback}/>
              </Route> 
              <Route exact path="/guardianArticle">
                <GuardianDetailed loadCallback={this.spinnerCallback} loading={this.state.loading} sendToggle={this.toggleCallback}/>
              </Route> 
              <Route exact path="/search">
                <Search loadCallback={this.spinnerCallback} loading={this.state.loading} sendToggle={this.toggleCallback}/>
              </Route> 
              <Route exact path="/bookmarks">
                <Bookmarks loadCallback={this.spinnerCallback} loading={this.state.loading} sendToggle={this.toggleCallback}/>
              </Route> 
              
            </RouterSwitch>
        </div>
        </Router>
            
                
        );
   }
}

export default App;