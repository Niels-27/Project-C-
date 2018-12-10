import * as React from 'react';
// import {Form,withForm,validators,withFormButton, FormErrors } from "react-form-validation-context";
import './payment.css';
import { withRouter } from 'react-router-dom';
// import { any } from 'prop-types';
import ApiCall from '../logic/apiCall';





class Payment extends React.Component<any,any>{

    constructor(props: any) {
        super(props);
        this.state = {
            showPopup : false, value : '', fields: {},name:null,number : null,
            errors: [null, null], isSubmitDisabled: true,
        };
        
        
    }

    public togglePopup = (e) => {
        e.preventDefault();
       
        this.setState({
          showPopup: !this.state.showPopup && alert('You have successfully payed!')})
        }
        
        

    
    public handleChange = (event) => {
        
        
        this.handleValidation(event.target);
        this.setState({value  : event.target.value});
        // console.log("derp");
      }

     
    public handleValidation(fields){
       
        var errors: string = "";
        const fieldName = fields.name;
        fields = fields.value;
        const tField = typeof fields;
        console.log(tField, fieldName );
        let formIsValid = true; 
       
        

        console.log(fieldName);
        
        
        if(tField !== "undefined" && fieldName === 'name')
        {
            if(!fields.match(/^[a-zA-Z]+$/))
            {
               formIsValid = false;
               errors= "Can't be empty & Only letters";
            }        
         }
         
         if(tField !== "undefined" && fieldName === 'number')
         {
            if(!fields.match(/^[0-9]+$/))
            {
               formIsValid = false;
               errors = "Can't be empty & Only numbers";
            } 
                   
         }
         
        
        

        if (fieldName === "name")
         {
            console.log(this.state.errors);
            const currentError = this.state.errors;
            // console.log(currentError);
            currentError[0] = errors;
            this.setState({errors: currentError})
        }

        if (fieldName === "number")
         {
            //  console.log(this.state.errors)
            const currentError = this.state.errors;
            currentError[1] = errors;
             this.setState({errors: currentError})
        }

       
        console.log(formIsValid) 
        return formIsValid;
       

    }

    public async sendMail(first,seccond){
        const call: ApiCall = new ApiCall();
        call.setURL("paymentSucces", seccond, first);
        await call.result()
        alert('You have successfully payed!')
        this.props.history.push("/");
    }

    public contactSubmit = (fields) =>{
          //  console.log('bye')
    
            console.log(fields.name);
             
             fields.preventDefault();
            // if(this.handleValidation(fields))
            if ( (this.state.errors[0] === null || this.state.errors[0] === '') && (this.state.errors[1] === null || this.state.errors[1] === ''))
            {

                this.sendMail(this.props.match.params.price,"gavindhollander@gmail.com");

               
              
            }
            else
            {
             alert("Form has errors.")

            }
            
    
    }
    
    public handleChangeValidation = (e) =>{         
        this.setState({fields : e.target.value});
    }
 

    

    // public async componentDidMount() {
        

    // }

    public render() {
        return (
            

                <div className = "container">   
                    <div className="row justify-content-center mt-3">
                        <div className="col-md-12">
                            <h4 className="modal-title my-modal-label">Please enter your payment information below</h4>
                        </div>
                        
                        <form name="paymentform" id="payment-form" onSubmit = {this.contactSubmit} >
                        
                        
                        <div style={{margin:0,padding:0}}/>
                        
                        
                        <div className='form-row justify-content-center mt-3'>
                        <div className='col-xs-14'>
                        <label className='control-label'>
                                Please choose the method you want to pay
                                <select value={this.state.value} onChange={this.handleChange}>
                                    <option value="visa">Visa</option>
                                    <option value="master">Master</option>
                                    <option value="ideal">IDeal</option>
                                    <option value="paypal">Paypal</option>
                                </select>
                                </label>
                                </div>
                                </div>
                                <div className='form-row justify-content-center md-4'>
                            <div className='col-md-16'>
                            <label htmlFor='control-label' style = {{fontWeight : "bold"}} >Name on Card</label>
                            <input className='form-control' name = 'name' type = 'text' value={this.state.fields.name}  onChange={this.handleChange} />
                            <span style={{color: "red"}}>{this.state.errors[0]}</span>
                            </div>
                        </div>
                        <div className='form-row justify-content-center mb-3'>
                            <div className='col-md-18 form-group required'>
                            <label className='control-label' style = {{fontWeight : "bold"}}>Card Number</label>
                            <input className='form-control card-number' name = 'number' type='text' value={this.state.fields.number} onChange={this.handleChange}/>
                            <span style={{color: "red"}}>{this.state.errors[1]}</span>
                            </div>
                        </div>
                        
                        <div className='form-row justify-content-center mt-3'>
                            <div className='col-xs-4 form-group cvc required' >
                            <label className='control-label' style = {{fontWeight : "bold"}}>CVC</label>
                                <input className='form-control card-cvc' placeholder='ex. 311' type='text' /></div>
                                    <div className='col-xs-7 form-group expiration required'>
                                         <label className='control-label' style = {{fontWeight : "bold"}}>Expiration</label>
                                             <input className='form-control card-expiry-month' placeholder='MM' size = {2} type='text' /></div>
                                
                                    <div className='col-xs-4 form-group expiration required'>
                                            <label className='control-label' style = {{fontWeight : "bold"}}>Date</label>
                                                <input className='form-control card-expiry-year' placeholder='YYYY' size = {4} type='text'  />
                                                </div> 
                                                   
                        </div>
                        <div className='form-row'>
                            <div className='row justify-content-center mt-3 col-md-12'>
                            <div className='form-control total btn btn-info standard-button'>
                                Total:
                                <span className='amount'>€{this.props.match.params.price}</span>
                            </div>
                            </div>
                        </div>
                        <div className='form-row'>
                            <div className='row justify-content-center mt-3 col-md-12 form-group'>
                            <button className='form-control btn btn-primary submit-button standard-button' type='submit' id="pay"  onClick = {this.contactSubmit} >Pay »</button>
                            </div>
                        </div>
                        


                        </form>
                            
                    
                </div>
            </div>    
               
        );
    }
}

export default withRouter(Payment);