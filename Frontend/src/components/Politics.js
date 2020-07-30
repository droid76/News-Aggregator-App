import React, {Component }from 'react';
import {Card,Badge,Container,Row,Col} from 'react-bootstrap';
import TextTruncate from 'react-text-truncate'
import {withRouter} from 'react-router-dom';
import ModalComponent from './ModalComponent';

class Politics extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
          articles: '',
          articles2 :''
        };
        this.preventEvent = this.preventEvent.bind(this);
        this.sendLoading = this.sendLoading.bind(this);
      }
    
    componentDidMount()
    {
        this.sendToggle(true);
        this.callGuardian();
        this.callNyt();
    }

    callGuardian()
    {
        fetch("https://csci571-node.azurewebsites.net/guardianPolitics").then(res=> { 
        return res.json();
            }).then(news_articles=> this.setState({articles:news_articles}));
    }
    callNyt()
    {
        fetch("https://csci571-node.azurewebsites.net/nytPolitics").then(res=> {
            return res.json();
            }).then(news_articles=> this.setState({articles2:news_articles}));
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
    checkNytImage(images)
    {
        var source = "";
        var flag = false;
        for(var image in images)
        {
            if(images[image].width>=2000)
            {
                source = images[image].url;
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
                bgcolor = "#B095FF";
                color = "white"
                break;
            case  "politics":
                bgcolor = "#419488";
                color = "white"
                break;
            case "business":
                bgcolor = "#5EA3EE";
                color = "white"
                break;
            case "technology":
                bgcolor = "#CEDC39";
                color = "black"
                break;
            case  "sport":
            case "sports":
                section = "sports"
                bgcolor = "#F6C244";
                color = "black"
                break;
            default:
                bgcolor = "#6E757C";
                color = "white"
            break;
        }
        return (
            <Badge style={{float:'right',backgroundColor:bgcolor,color:color,fontSize:'90%'}}> 
            {section.toUpperCase()}
            </Badge>
        )
    }

    preventEvent(event)
    {
        event.stopPropagation();
        event.preventDefault();
    }

    callDetailed(event,article)
    {
        this.sendLoading(true);
        if(localStorage.getItem("checked")==='true')
        {
            this.props.history.push({
                    pathname:"/guardianArticle",
                    search: "id="+article.id
                });
        }
        else
        {
            this.props.history.push({
                pathname:"/nytArticle",
                search: "id="+article.url
            });
        }
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

    render() 
    {
        var articles;
        if(localStorage.getItem("checked")==='true')
        {
            var articlesArray = []
            articles = this.state.articles;
            for(var article in articles)
            {
                articlesArray.push(articles[article]);
            }
            return ( 
                <div style={{marginBottom:'2%'}}>
                {
                    articlesArray.map((article) =>
                    <Container fluid={true}>
                    <Card style={{boxShadow:'0px 0px 10px #333',marginTop:'2%',cursor:'pointer'}} onClick={(event) => this.callDetailed(event,article)}>
                        <Row>
                        <Card.Body >
                        <Col xs={12} lg={3} xl={3} md={3} sm={3}>
                            <Card.Img src={this.checkSource(article.blocks.main.elements[0].assets)} height={'auto'} width={'auto'} 
                            style={{objectFit:"cover",padding:'1%',border:'solid 0.5px lightgray',float:'left'}}/>
                        </Col>
                        <Col xs={12} lg={9} xl={9} md={9} sm={9} style={{float:'right'}}>
                            <Card.Title style={{fontWeight:'bold',fontStyle:'italic'}}>{article.webTitle} 
                            <span style={{marginLeft:'1%'}}>
                            <ModalComponent title={article.webTitle} url = {article.webUrl}/>
                            </span>
                            </Card.Title>
                             <span>
                                <TextTruncate line={3} style={{fontSize:'99%'}} text= {article.blocks.body[0].bodyTextSummary} />
                            </span>
                            <Card.Text style={{marginTop:'2%'}}>
                                <span style={{fontWeight:'550',fontStyle:'italic', color:'black'}}>
                                     {
                                         this.getDate(article.webPublicationDate)
                                     }
                                </span>
                                 {
                                     this.returnBadge(article.sectionId)
                                 }
                            </Card.Text>
                            </Col>
                        </Card.Body>
                        </Row>
                    </Card>
                    {this.sendLoading(false)}
                    </Container>
                    )}
                    </div>
                );
            }
        else
        {

            var articlesArray = []
            articles = this.state.articles2;
            for(var article in articles)
            {
                articlesArray.push(articles[article]);
            }
            return ( 
                <div style={{marginBottom:'2%'}}>
                {
                    articlesArray.map((article) =>
                    <Container fluid={true}>
                    <Card style={{boxShadow:'0px 0px 10px #333',marginTop:'2%',cursor:'pointer'}} onClick={(event) => this.callDetailed(event,article)}>
                        <Row>
                        <Card.Body>
                        <Col xs={12} lg={3} xl={3} md={3} sm={3}>
                            <Card.Img src={this.checkNytImage(article.multimedia)} height={'auto'} width={'auto'} 
                            style={{objectFit:"cover",padding:'1%',border:'solid 0.5px lightgray',float:'left'}} />
                        </Col>
                        <Col xs={12} lg={9} xl={9} md={9} style={{float:'right'}}>
                            <Card.Title style={{fontWeight:'bold',fontStyle:'italic'}}>{article.title} 
                            <span style={{marginLeft:'1%'}}>
                             <ModalComponent title={article.title} url = {article.url}/>
                            </span>
                            </Card.Title>
                             <span>
                             <TextTruncate line={3} style={{fontSize:'99%'}} text= {article.abstract} />
                            </span>
                            <Card.Text style={{marginTop:'2%'}}>
                                <span style={{fontWeight:'550',fontStyle:'italic', color:'black'}}>
                                     {
                                         this.getDate(article.published_date)
                                     }
                                </span>
                                {
                                     this.returnBadge(article.section)
                                }
                            </Card.Text>
                            </Col>
                        </Card.Body>
                        </Row>
                    </Card>
                    {this.sendLoading(false)}
                    </Container>
                    )}
                    </div>
                );
            }
        }
    }

export default withRouter(Politics);