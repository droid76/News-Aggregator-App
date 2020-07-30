import React, {Component} from 'react';
import {Navbar, Nav,NavItem} from 'react-bootstrap';
import { FaRegBookmark,FaBookmark } from 'react-icons/fa';
import Switch from "react-switch";
import './Navigation.css';
import { NavLink} from "react-router-dom"
import SearchBar from './SearchBar';
import ReactTooltip from 'react-tooltip'

class Navigation extends Component 
{
    
  constructor(props) {
    super(props);
    this.state = {showToggle:true,displayBookmark:true,checked:true,searchValue:false};
    this.toggle = this.toggle.bind(this);
    this.sendChecked = this.sendChecked.bind(this);
    this.sendLoading = this.sendLoading.bind(this);
    this.showToggle = this.showToggle.bind(this);
    this.bookmarkTooltipToggle =  this.bookmarkTooltipToggle.bind(this);
    this.changeSearchValue =  this.changeSearchValue.bind(this);
  }

  componentDidMount()
  {
    if(localStorage.getItem("checked")===null)
    {
      localStorage.setItem("checked",true);
    }
    localStorage.setItem("searchValue",false);
  }

  componentDidUpdate()
  {
    ReactTooltip.rebuild();
  }
  
  toggle(checked)
  {
    this.sendLoading();
    localStorage.setItem("checked",checked);
    this.setState({checked:checked})
    this.sendChecked(checked)
  }

  sendChecked(checked)
  {
      this.props.callbackFromParent(checked);
  }
  sendLoading()
  {
      this.props.loadCallback(true);
  }
  showToggle()
  {
    if(this.props.showToggle)
    {
      return(
        <React.Fragment>
        <NavItem style={{color:'white',marginRight:'0.8%'}}>NYTimes</NavItem> 
        <Switch onColor="#028EFB" onHandleColor="#ffffff" handleDiameter={25} uncheckedIcon={false} checkedIcon={false} 
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)" activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" height={20} width={48}
        className="react-switch" id="material-switch" checked = {localStorage.getItem("checked")==='true'} onChange = {this.toggle}/>
        <NavItem style={{color:'white',marginLeft:'1%'}} >Guardian</NavItem>
        </React.Fragment>
      );
    }
  }
  toggleBookmark()
  {
    localStorage.setItem("detailedBookmark",true);
  }

  bookmarkTooltipToggle()
  {
    this.setState(prevState => ({
      bookmarkTooltip: !prevState.bookmarkTooltip
    }));
  }


  displayBookmark()
  {
      if(localStorage.getItem("detailedBookmark")=="true")
      {
          return(
            <NavLink to="/bookmarks" href="/bookmarks" onClick={()=> {this.sendLoading();localStorage.setItem("detailedBookmark",false);
            localStorage.setItem("detailedBookmark",false);  localStorage.setItem("searchValue",true);ReactTooltip.hide()}} style={{marginRight:'1%'}}>
            <div style={{color:'white'}} id="Bookmark" data-tip = "Bookmark">
            <FaRegBookmark/>
               <ReactTooltip effect="solid" place="bottom"/>
          </div>
          </NavLink>
          );
      }
      else
      {
          return( 
            <NavLink to="/bookmarks" href="/bookmarks" onClick={()=> {this.sendLoading(); 
            ReactTooltip.hide()}} style={{marginRight:'1%'}}>
            <div style={{color:'white'}} id="Bookmark" data-tip = "Bookmark" >
            <FaBookmark/>
              <ReactTooltip effect="solid" place="bottom"/>
          </div>
          </NavLink>
          );
      }
  }

  changeSearchValue()
  {
    localStorage.setItem("searchValue",true);
  }

  render() {
    return(
            <div>
            <Navbar className = "navBar" expand = "lg">
            <div className = "searchBar" >
                <SearchBar searchValue={this.state.searchValue} detailedClear={this.props.clearSearch}/>
              </div>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto"  defaultActiveKey="/">
                  <Nav.Link as={NavLink} exact to="/" href="/" activeStyle={{ color:'white' }} style={{color:"lightgray"}} onClick={()=> {this.sendLoading(); this.toggleBookmark();this.changeSearchValue();}}>Home</Nav.Link>
                  <Nav.Link as={NavLink} to="/world" href="/world"  activeStyle={{ color:'white' }} style={{color:"lightgray"}} onClick={()=> {this.sendLoading(); this.toggleBookmark();this.changeSearchValue();}}>World</Nav.Link>
                  <Nav.Link as={NavLink} to="/politics" href="/politics" activeStyle={{ color:'white' }} style={{color:"lightgray"}} onClick={()=> {this.sendLoading(); this.toggleBookmark();this.changeSearchValue();}}>Politics</Nav.Link>
                  <Nav.Link as={NavLink}  to="/business" href="/business"  activeStyle={{ color:'white' }} style={{color:"lightgray"}} onClick={()=>{this.sendLoading(); this.toggleBookmark();this.changeSearchValue();}}>Business</Nav.Link>
                  <Nav.Link as={NavLink} to="/technology" href="/technology" activeStyle={{ color:'white' }} style={{color:"lightgray"}} onClick={()=> {this.sendLoading(); this.toggleBookmark();this.changeSearchValue();}}>Technology</Nav.Link>
                  <Nav.Link as={NavLink} to="/sports" href="/sports" activeStyle={{ color:'white' }} style={{color:"lightgray"}} onClick={()=> {this.sendLoading(); this.toggleBookmark();this.changeSearchValue();}}>Sports</Nav.Link>
                </Nav>
                {this.displayBookmark()}
              {this.showToggle()}
             
              </Navbar.Collapse>
            </Navbar>
        </div>
      );
   }
}

export default Navigation;