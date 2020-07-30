import React, {Component }from 'react';
import commentBox from 'commentbox.io';

class CommentBox extends Component 
{
    constructor(props) {
        super(props);
      }
      componentDidMount()
      {
        var id = this.props.id;
        commentBox('5133849151406080-proj', {
            className: 'commentbox',
            tlcParam: 'tlc', 
            backgroundColor: null, 
            textColor: null, 
            subtextColor: null,
            createBoxUrl(boxId, pageLocation) 
            {
                pageLocation.search = id; 
                pageLocation.hash = boxId; 
                return id; 
            }
        }
        );
      }
    render() {
        return (       
            <div className="commentbox" id={this.props.id}>
            </div>
        );
    }
}
export default CommentBox;


