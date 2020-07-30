import React, {Component }from 'react';
import {Card,Container,Row,Col} from 'react-bootstrap';
import { FacebookShareButton, TwitterShareButton, EmailShareButton,FacebookIcon,TwitterIcon,EmailIcon} from 'react-share';
import { FaRegBookmark,FaAngleDown,FaAngleUp,FaBookmark } from 'react-icons/fa';
import CommentBox from './CommentBox';
import { Tooltip } from 'reactstrap';
import ReactTooltip from 'react-tooltip'
import { toast,Zoom } from 'react-toastify';
import {animateScroll as scroll} from 'react-scroll';
import './GuardianDetailed.css'

toast.configure({
    position: toast.POSITION.TOP_CENTER,
    draggable: false,
    hideProgressBar:true,
    type: toast.TYPE.DEFAULT,
    transition: Zoom
});

class GuardianDetailed extends Component 
{
    constructor(props,location) {
        super(props,location);
        this.state = {
          article: '',
          articleId:'',
          initialDescription:true,
          fbTooltip:false,
          twitterTooltip:false,
          emailTooltip:false,
          bookmarkTooltip:false,
          displayBookmark:true,
        };
        this.fbToggle = this.fbToggle.bind(this);
        this.twitterToggle = this.twitterToggle.bind(this);
        this.emailToggle = this.emailToggle.bind(this);
        this.bookmarkToggle = this.bookmarkToggle.bind(this);
        this.sendLoading = this.sendLoading.bind(this);
        this.sendToggle = this.sendToggle.bind(this); 
      }
    
    componentDidMount()
    {
        this.sendToggle(false);
        localStorage.setItem("detailedBookmark",true);
        var articleId = window.location.search.substring(4,window.location.search.length);
        this.setState({articleId:articleId});
        this.callGuardian(articleId);
       
    }

    callGuardian(articleId)
    {
        
        fetch("https://csci571-node.azurewebsites.net/guardianDetailed?id="+articleId).then(res=> { 
        return res.json();
            }).then(news_article=> this.setState({article:news_article}));
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
    displayDescription(text)
    {
        var textArray = text.split(".");
        var initial = textArray.slice(0,4).join(".")+".";
        var next = textArray.slice(4,textArray.length).join(".");
        if(this.state.initialDescription)
        {
            if(textArray.length<=4)
            {
                return( 
                    <div ref={this.des}> 
                     {initial}
                    <br/>
                    </div>
                );
            }
            else
            {
                return( 
                    <div style={{textAlign:'justify'}}> 
                    {initial}
                    <br/>
                    <FaAngleDown size={25} style={{marginLeft:'95%'}} onClick={
                        (event)=>
                        {
                            if(window.matchMedia("(max-width:800px)").matches)
                            {
                                scroll.scrollTo(initial.length+20);
                            }
                            else
                            {
                                scroll.scrollTo((window.innerWidth)/3+initial.length);
                            }
                            this.setState({initialDescription:false});
                            
                        }
                    }/>
                    </div>
                );   
            }

        }
        else
        {   
            return(
                <div style={{textAlign:'justify'}}> 
                {initial}
                <p>
                <br/>
                {next}
                </p>
                <FaAngleUp   size={25} style={{marginLeft:'95%'}} onClick={
                    (event)=>
                    {  
                        scroll.scrollToTop();
                        setTimeout(this.setState({initialDescription:true}),10000);                                   
                    }
                }/>
                </div>
            );     
            }
    }
    fbToggle()
    {
        this.setState(prevState => ({
            fbTooltip: !prevState.fbTooltip
          }));
    }
    twitterToggle()
    {
        this.setState(prevState => ({
            twitterTooltip: !prevState.twitterTooltip
          }));
    }
    emailToggle()
    {
        this.setState(prevState => ({
            emailTooltip: !prevState.emailTooltip
          }));
    }
    bookmarkToggle()
    {
        this.setState(prevState => ({
            bookmarkTooltip: !prevState.bookmarkTooltip
          }));
    }
    sendLoading(value)
    {
        if(this.props.loading==true && value==false)
            this.props.loadCallback(value);
    }
    sendToggle(value)
    {
        this.props.sendToggle(value);
    }

    displayBookmark(article)
    {
        if(localStorage.getItem(article.webUrl)==null && this.state.displayBookmark==false)
        {
            this.setState({displayBookmark:true});
        }
        else if(localStorage.getItem(article.webUrl)!=null && this.state.displayBookmark==true)
        {
            this.setState({displayBookmark:false});
        }
        
        if(this.state.displayBookmark)
        {
            return(
                <span ref={this.fareg} data-tip="Bookmark" data-for="Bookmark" onClick={()=>{this.saveBookmark(article)}} style={{marginLeft:'5%'}} >
                <FaRegBookmark size={20} style={{color:'red'}} />
                 <ReactTooltip  effect="solid" id='Bookmark'/>
                </span>
               
            );
        }
        else
        {
            return( 
                <span ref={this.fa} data-tip = "Bookmark" data-for="Bookmark" style={{marginLeft:'10%'}} onClick={()=>{this.removeBookmark(article)}} style={{marginLeft:'5%'}} >
                <FaBookmark size={20} style={{color:'red'}} />
                 <ReactTooltip  effect="solid"  id='Bookmark'/>
                </span>
               
            );
        }
    }
    
    saveBookmark(article)
    {
        toast("Saving "+article.webTitle);
        if( localStorage.getItem(article.webUrl) === null && this.state.displayBookmark==true)
        {   
            localStorage.setItem(article.webUrl, JSON.stringify(article));
            this.setState({displayBookmark:false});
            ReactTooltip.hide(this.fareg)
        }
    }

    removeBookmark(article)
    {
        toast("Removing "+article.webTitle);
        if(localStorage.getItem(article.webUrl)!=null && this.state.displayBookmark==false)
        {
            localStorage.removeItem(article.webUrl);
            this.setState({displayBookmark:true});
            ReactTooltip.hide(this.fa)
        }
    }

    render() 
    {
        var validArticles = []
            var article = this.state.article;
            if(article.length!=0)
            {
                validArticles.push(article);
            }
            return ( 
                    <React.Fragment>
                    {
                        validArticles.map((article) =>
                        <Container fluid={true}>
                        <Card style={{boxShadow:'0px 0px 10px #333',marginTop:'1%',width:'100%',cursor:'pointer'}}>
                        <Row>
                        <Col>
                        <Card.Title style={{fontSize:'200%',marginTop:'1%',marginLeft:'1.5%',fontStyle:'italic'}}>
                                {article.webTitle} 
                        </Card.Title>
                        </Col>
                        </Row>
                        <Card.Body>
                        <Card.Text style={{fontSize:'100%',marginTop:'-1%'}}>
                        <Row>
                        <Col xs={5} lg={9} xl={9} md={9}> 
                        <span style={{fontStyle:'italic',fontWeight:'400',color:'black',fontSize:'120%'}}>
                        {
                                this.getDate(article.webPublicationDate)
                        }
                        </span>
                        </Col>
                        <Col xs={5} lg={2} xl={2} md={2}>
                        <FacebookShareButton  url={article.webUrl} hashtag='#CSCI_571_NewsApp' className="network__share-button" id="FBShare">
                            <FacebookIcon size={30} round />
                            <Tooltip placement="top" isOpen={this.state.fbTooltip} target="FBShare" toggle={this.fbToggle}>
                                    Facebook
                            </Tooltip>
                        </FacebookShareButton>
                        <TwitterShareButton  url={article.webUrl} title={article.webTitle} className="network__share-button" hashtags={["CSCI_571_NewsApp"]} id="TwitterShare">
                                <TwitterIcon size={30} round />
                                <Tooltip placement="top" isOpen={this.state.twitterTooltip} target="TwitterShare" toggle={this.twitterToggle}>
                                    Twitter
                                    </Tooltip>
                            </TwitterShareButton>
                            <EmailShareButton  url={article.webUrl} subject="#CSCI_571_NewsApp" className="network__share-button" id="EmailShare">
                            <EmailIcon size={30} round />
                            <Tooltip placement="top" isOpen={this.state.emailTooltip} target="EmailShare" toggle={this.emailToggle}>
                                    Email
                                    </Tooltip>
                            </EmailShareButton>
                        </Col>
                        <Col xs={2} lg={1} xl={1} md={1}>
                            {this.displayBookmark(article)}
                        </Col>
                        </Row>
                        <Row>
                        <div style={{textAlign:'center',padding:'0.2%',border:'solid 0.5px lightgray',objectFit:'cover',width:'100%',height:'50%'}}>
                            <Card.Img src={this.checkSource(article.blocks.main.elements[0].assets)} />
                        </div>
                        </Row>
                        <Row>
                        {this.displayDescription(article.blocks.body[0].bodyTextSummary)}
                        </Row>    
                        </Card.Text>
                        </Card.Body>
                    </Card>
                    <br/>
                    <CommentBox id={this.state.articleId} />
                    {this.sendLoading(false)}
                    </Container>
                )}
                </React.Fragment>
            );
    }
}

export default GuardianDetailed;