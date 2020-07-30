import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { IoMdShare } from 'react-icons/io';
import { FacebookShareButton, TwitterShareButton, EmailShareButton,FacebookIcon,TwitterIcon,EmailIcon} from 'react-share';
import {Container,Row,Col} from 'react-bootstrap';
class ModalComponent extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            show:false
        };
        this.handleShow = this.handleShow.bind(this);
        this.close = this.close.bind(this);
      }
    
      handleShow(event)
      {
            event.stopPropagation();
            event.preventDefault();  
          this.setState({show:true})
      }

      close()
      {
          this.setState({show:false})
      }

      displayTitle()
      {
        if(this.props.source)
        {
          return(
            <div>
            <span style={{fontWeight:'bold'}}> {this.props.source} </span>
            <br/> 
            {this.props.title}
          </div>
          )
        }
        else
        {
            return(
              <div>
                {this.props.title}
              </div>
            )
        }
      }
    
    
      render() 
    {
        return (           
            <span onClick={e => e.stopPropagation()}>
            <IoMdShare onClick = {this.handleShow}/>
            <Modal show={this.state.show} onHide={this.close}>
            <Modal.Header closeButton >
        <Modal.Title style={{fontWeight:'550',fontSize:'120%'}}>
        {this.displayTitle()}
        </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p style={{textAlign:'center',fontWeight:'550',fontSize:'120%'}}> Share via</p>
            <Container>
              <Row>
            <Col>
            <FacebookShareButton style={{marginLeft:"8%"}} url={this.props.url} hashtag='#CSCI_571_NewsApp' className="demo_some-network_share-button">
              <FacebookIcon size={50} round />
            </FacebookShareButton>
            </Col>
            <Col>
            <TwitterShareButton style={{marginLeft:"22%"}} url={this.props.url} className="demo_some-network__share-button" hashtags={["CSCI_571_NewsApp"]}>
                  <TwitterIcon size={50} round />
                </TwitterShareButton>
            </Col>
            <Col>
            <EmailShareButton style={{marginLeft:"20%"}} url={this.props.url} subject="#CSCI_571_NewsApp" className="demo_some-network__share-button">
                <EmailIcon size={50} round />
              </EmailShareButton>
            </Col>
            </Row>
            </Container>
            </Modal.Body>
          </Modal>
          </span>
        )
    }
}
export default ModalComponent;
