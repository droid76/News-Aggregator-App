import React, {Component} from 'react';
import BounceLoader from "react-spinners/BounceLoader";

const override = `display: block;margin: 0 auto;border-color: red;vertical-align: middle;`;
class Spinner extends Component 
{ 
    constructor(props) 
    {
        super(props);
    }
    render()
    {
        return (
            <div className="sweet-loading" style={{textAlign:'center',marginTop:'20%'}}>
              <BounceLoader size={60} color={"#123abc"} loading={this.props.loading}  css={override}>
              </BounceLoader>
              <p style={{textAlign: "center",fontWeight:'bold'}}>Loading</p>
            </div>
          );
    }
}
export default Spinner;