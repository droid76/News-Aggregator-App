import React, {Component }from 'react';
import {Card,Badge,CardDeck, Container} from 'react-bootstrap';
import {MdDelete} from 'react-icons/md';
import {withRouter} from 'react-router-dom';
import { toast,Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalComponent from './ModalComponent';

toast.configure({
    position: toast.POSITION.TOP_CENTER,
    draggable: false,
    hideProgressBar:true,
    type: toast.TYPE.DEFAULT,
    transition: Zoom
}

)

class Bookmarks extends Component 
{
    constructor(props,location)
    {
        super(props,location);
        this.state = {
            query:'',
            guardianArticles:[],
            nytArticles:[],
        }
    }
    componentDidMount()
    {
        this.sendToggle(false);
    }
    getDate(dateObj)
    {
        var date= new Date(dateObj);
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yy = date.getFullYear();
        if(dd<10)
        {
            dd="0"+dd;
        } 
        if(mm<10) 
        {
            mm="0"+mm;
        } 
        var dateString = yy+"-"+mm+"-"+dd;
        return dateString;
    }
    
    checkSource(sourceArray)
    {
        var source = "";
        if(sourceArray.length == 0)
        {
            source = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        }
        else
        {
            source = sourceArray[sourceArray.length-1].file;
        }
        return source
    }
    checknytSource(images)
    {
        var source = "";
        var flag = false;
        for(var image in images)
        {
            if(images[image].width>=2000)
            {
                source = " https://www.nytimes.com/"+images[image].url;
                flag = true;
                break; 
            }
        
        }
        if(!flag)
        {
            source = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
        }
        return source;
    }
    
    returnBadge(section)
    {
        var bgcolor;
        var color;
        switch(section)
        {
            case "world":
            case "World":
                bgcolor = "#B095FF";
                color = "white"
                break;
            case  "politics":
            case "Politics":
                bgcolor = "#419488";
                color = "white"
                break;
            case "business":
            case "Business":
                bgcolor = "#5EA3EE";
                color = "white"
                break;
            case "technology":
            case "Technology":
                bgcolor = "#CEDC39";
                color = "black"
                break;
            case  "sport":
            case "sports":
            case "Sports":
                bgcolor = "#DBAC3C";
                color = "black"
                break;
            case "guardian":
                bgcolor = "#14284A";
                color = "white"
                break;
            case "nytimes":
                bgcolor = "#E0E0E0";
                color = "black";
                break;
            default:
                bgcolor = "#6E757C";
                color = "white"
            break;
        }
        return (
            <Badge style={{backgroundColor:bgcolor,color:color,fontSize:'80%'}}> 
            {section.toUpperCase()}
            </Badge>
        )
    }

    preventEvent(event)
    {
        event.stopPropagation();
        event.preventDefault();
    }

    callDetailedGuardian(event,article)
    {
        this.sendLoading(true);
        this.props.history.push({pathname:"/guardianArticle",search: "id="+article.id});
    }
    callDetailedNyt(event,article)
    {
        this.sendLoading(true);
        this.props.history.push({pathname:"/nytArticle",search: "id="+article.web_url});
    }
    sendLoading(value)
    {
        if(this.props.loading==true && value==false)
        {    
            this.props.loadCallback(value);
        }
        else if(value==true)
        {
            this.props.loadCallback(true);
        }
    }
    sendToggle(value)
    {
        this.props.sendToggle(value);
    }
    removeBookmark(event,url)
    {
        this.preventEvent(event);      
        localStorage.removeItem(url);
        this.props.history.push({pathname:"/bookmarks"});
    }

    render()
    {
        var guardianArray= [],nytArray = [];
        var keys = Object.keys(localStorage);
        for(var i=0;i<keys.length;i++)
        {
            var key = keys[i];
            var article; 
            if(key.includes("guardian"))
            {
                article = JSON.parse(localStorage.getItem(key));
                guardianArray.push(article);
            }
            else if(key.includes("nytimes"))
            {
                article = JSON.parse(localStorage.getItem(key));
                nytArray.push(article);   
            }   
        }
        if(guardianArray.length==0 && nytArray.length==0)
        {
            return(
                <div style={{fontSize:'140%',textAlign:'center',fontWeight:'bold'}}>
                You have no saved articles
                { this.sendLoading(false)}
                </div>
            )
        }
        else
        {
            return(
                <div style={{marginBottom:'2%'}}>
                <div style={{marginLeft:'2%',fontSize:'200%'}}>Favorites</div>
                <CardDeck style={{marginLeft:'1%',marginRight:'1%'}}>
                    {
                    guardianArray.map((article) =>
                    <span className="col-12 col-xl-3 col-lg-3 col-md-6" style={{marginTop:'2%'}}>
                    <Card style={{boxShadow:'0px 0px 2px #333',cursor:'pointer'}} onClick={(event) => this.callDetailedGuardian(event,article)} >
                    <Card.Body style={{marginTop:'-1.75%'}}>
                    <Card.Title style={{fontWeight:'bold', fontSize:'110%', fontStyle:'italic'}}>
                  {article.webTitle}
                    <span style={{marginLeft:'1%'}}>
                        <ModalComponent title={article.webTitle} url = {article.webUrl} source="GUARDIAN"/>
                    </span>
                    <span style={{marginLeft:'2%'}} onClick={(event) =>{toast("Removing "+article.webTitle);this.removeBookmark(event,article.webUrl);}} >
                    <MdDelete/>
                    </span>
                    </Card.Title>
                                <Card.Img src={this.checkSource(article.blocks.main.elements[0].assets)} height={'auto'} width={'auto'} 
                                style={{objectFit:"cover",padding:'1%',border:'solid 0.5px lightgray'}}/>                     
                                <Card.Text style={{marginTop:'2%'}}>
                                <span style={{fontWeight:'550',fontStyle:'italic', color:'rgb(110,110,110)'}}>
                                        {
                                            this.getDate(article.webPublicationDate)
                                        }
                                </span>
                                <span style={{float:"right"}}>
                                {this.returnBadge("guardian")}
                                </span>
                                <span style={{float:"right",marginRight:'2%'}}>
                                {this.returnBadge(article.sectionId)}
                                </span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        { this.sendLoading(false)}
                    </span>
                    )}
                    {
                     nytArray.map((article) =>
                     <span  className="col-12 col-xl-3 col-lg-3 col-md-6" style={{marginTop:'2%'}}>
                    <Card style={{boxShadow:'0px 0px 2px #333',cursor:'pointer'}} onClick={(event) => this.callDetailedNyt(event,article)}>
                    <Card.Body style={{marginTop:'-1.75%'}}>
                    <Card.Title style={{fontWeight:'bold', fontSize:'110%', fontStyle:'italic'}}>
                    {article.headline.main}
                    <span style={{marginLeft:'1%'}}>
                    <ModalComponent title={article.headline.main} url = {article.url} source="NYTIMES"/>
                    </span>
                    <span style={{marginLeft:'2%'}} onClick={(event) =>{ toast("Removing "+article.headline.main);this.removeBookmark(event,article.web_url);}}>
                    <MdDelete/>
                    </span>
                    </Card.Title>
                    <Card.Img src={this.checknytSource(article.multimedia)} height={'auto'} width={'auto'}  
                    style={{objectFit:"cover",padding:'1%',border:'solid 0.5px lightgray'}}/>
                    <Card.Text style={{marginTop:'2%'}}>
                    <span style={{fontWeight:'550',fontStyle:'italic', color:'rgb(110,110,110)'}}>
                                {
                                    this.getDate(article.pub_date)
                                }
                        </span>
                        <span style={{float:"right"}}>
                        {this.returnBadge("nytimes")}
                        </span>
                        <span style={{float:"right",marginRight:'2%'}}>
                        {this.returnBadge(article.news_desk)}
                        </span>                               
                    </Card.Text>
                </Card.Body>
                 </Card>
                    { this.sendLoading(false)}
                    </span>
                )}
            </CardDeck>
            </div>
            
        );
        }
    }
}
export default withRouter(Bookmarks)