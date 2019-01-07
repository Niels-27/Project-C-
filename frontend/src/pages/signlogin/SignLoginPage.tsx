import * as React from 'react';
import LoginForm from '../../components/LoginForm';
import {
    withRouter
} from "react-router-dom";

class SignLoginPage extends React.Component<any,any>{

    constructor(props: any) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }
    
    public render() {
        console.log(this.props)
        return (      
                <div className="row m-md-5 justify-content-around"> 
                    
                    <div className="col col-4">       
                        <h2 className="h2-responsive text-start"><strong>INLOGGEN</strong></h2>   
                        <span>Log in op je HR-Fashion account</span>  
                        <LoginForm/>               
                    </div>   

                    <div className="col col-4 ml-2">
                        <h2 className="h2-responsive text-start"><strong>EEN ACCOUNT AANMAKEN</strong></h2> 
                        <span className="" >Maak een account aan bij HR-Fashion:</span> 
                        <div className="row">
                            <div className="col mt-5">
                            <ul>
                                <li>Je krijgt overzicht op al je bestellingen</li>
                                <li>Houd een Wishlist bij</li>
                                <li>Bestel sneller producten</li>
                            </ul>
                            </div>
                        </div>   
                        <div className="row mt-md-4 mb-md-3">   
                        <button type="submit" className="btn btn-success btn-md mt-3 btn-block" onClick={this.handleClick}>
                        <   strong>Aanmelden</strong>
                        </button>  
                        </div>
                    </div>   
                </div>
         
        );
    }
    private handleClick(e){
        this.props.history.push("/signup");
    }
}

export default withRouter(SignLoginPage);