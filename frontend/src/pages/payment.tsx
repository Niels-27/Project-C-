import * as React from 'react';
// import {Form,withForm,validators,withFormButton, FormErrors } from "react-form-validation-context";
import './payment.css';
import Cookie from '../logic/cookie';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { PostOrder } from '../actions/orderActions';
import * as PropTypes from 'prop-types';
// import { any } from 'prop-types';
import ApiCall from '../logic/apiCall';

class Payment extends React.Component<any, any>{
    public static propTypes = { postOrder: PropTypes.func.isRequired }
    public cookie: Cookie = new Cookie();
    constructor(props: any) {
        super(props);

        this.state = {
            showPopup: false, value: '', fields: {},nameValue : '',numberValue : '', cvcValue: '', monthValue: '', yearValue: '',
            errors: [null, null, null, null, null], isSubmitDisabled: true, notClicked: true, IsDisabled : true,
            items: this.cookie.get('ShoppingCard') || undefined, products: null, map: null,
            order: {
                cookie: {},
                userId: 0,
                addressId: 0,
                orderProducts: {}
            }
        };

    }
    public async UpdateItems(obj: string = "") {
        const call: ApiCall = new ApiCall();
        call.setURL('array-id');
        if (this.state.items !== undefined) {
            if (obj !== "") {
                this.setState({ products: await call.result(JSON.parse(obj)) });
            } else {
                this.setState({ products: await call.result(JSON.parse(this.state.items)) });
            }

        }
    }

    public componentDidMount() {
        this.RefreshShoppingCard();
        this.UpdateItems();
    }

    

    public handleChange = (event) => {


        this.handleValidation(event.target);

        this.setState({ value: event.target.value });
        
        // console.log("derp");
    }
    public handleNameCardChange = (event) => {


        this.handleValidation(event.target);

        this.setState({ nameValue: event.target.value });
        
    }

    public handleNumberCardChange = (event) => {


        this.handleValidation(event.target);

        this.setState({ numberValue: event.target.value });
        }

    public handleCvcChange = (event) => {


            this.handleValidation(event.target);
    
            this.setState({ cvcValue: event.target.value });
            
            
        }
        public handleMonthChange = (event) => {


            this.handleValidation(event.target);
    
            this.setState({ monthValue: event.target.value });
            
        } 
        public handleYearChange = (event) => {


            this.handleValidation(event.target);
    
            this.setState({ yearValue: event.target.value });
            
        }       
    
    public handleValidation(fields) {

        var errors: string = "";
        const fieldName = fields.name;
        fields = fields.value;
        const tField = typeof fields;
        // console.log(tField, fieldName, fields);
        let formIsValid = true;



        console.log(fieldName);


        if (tField!=="undefined" && fieldName === 'name') {
            if (!fields.match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors = "Can't be empty & Only letters";
            }
        }

        if (tField!== "undefined" && fieldName === 'number') {
            if (!fields.match(/^[0-9]+$/)) {
                formIsValid = false;
                errors = "Can't be empty & Only numbers";
            }

        }

        if (tField !== "undefined" && fieldName === 'cvc') {
            if (!fields.match(/^[0-9]+$/)) {
                formIsValid = false;
                errors = "Can't be empty & Only numbers";
            }

        }

        if (tField !== "undefined" && fieldName === 'month') {
            if (!fields.match(/^[0-9]+$/)) {
                formIsValid = false;
                errors = "Can't be empty & Only numbers";
            }

        }
        if (tField !== "undefined" && fieldName === 'year') {
            if (!fields.match(/^[0-9]+$/)) {
                formIsValid = false;
                errors = "Can't be empty & Only numbers";
            }

        }





        if (fieldName === "name") {
            console.log(this.state.errors);
            const currentError = this.state.errors;
            // console.log(currentError);
            currentError[0] = errors;
            this.setState({ errors: currentError })
        }

        if (fieldName === "number") {
            //  console.log(this.state.errors)
            const currentError = this.state.errors;
            currentError[1] = errors;
            this.setState({ errors: currentError })
        }
        if (fieldName === "cvc") {
            //  console.log(this.state.errors)
            const currentError = this.state.errors;
            currentError[2] = errors;
            this.setState({ errors: currentError })
        }
        if (fieldName === "month") {
            //  console.log(this.state.errors)
            const currentError = this.state.errors;
            currentError[3] = errors;
            this.setState({ errors: currentError })
        }
        if (fieldName === "year") {
            //  console.log(this.state.errors)
            const currentError = this.state.errors;
            currentError[4] = errors;
            this.setState({ errors: currentError })
        }

       

        // console.log(fields);
        console.log(formIsValid)
        return formIsValid;


    }

    public async sendMail(first, seccond) {
        const call: ApiCall = new ApiCall();
        const cookie: Cookie = new Cookie();
        call.setURL("paymentSucces", seccond, first);
        await call.result()
        alert('Bestelling met succes afgerond! Je krijgt een email met een bevestiging van je aankoop!')
        cookie.remove('ShoppingCard');
        this.props.history.push("/");
    }

    public contactSubmit = (fields) => {
        this.setState({ notClicked: false })
       
        //  console.log('bye')
        const { address, userData } = this.props;
        console.log(userData)
        console.log(address)
        console.log(userData.id)
        var userID = userData.id;
        var adresID = address.id

        if(this.props.location.state){
             if (this.props.location.state.addresUser) {
                userID = this.props.location.state.addresUser.userId;
                adresID = this.props.location.state.addresUser.addressId;
            }
            if(this.props.location.state.chosenAddress)  {
                adresID = this.props.location.state.chosenAddress.id;
            } 
        }
        
        this.setState(prevState => ({
            order: {
                ...prevState.order,
                cookie: JSON.parse(this.state.items),
                userId: userID,
                addressId: adresID,
                orderProducts: this.state.products
            }

        }), async () => {
            console.log(this.state.order);
            await this.props.postOrder(this.state.order).then(res => console.log(res), error => console.log("failure order"))
        }
        )

        fields.preventDefault();
        // if(this.handleValidation(fields))
        if ((this.state.errors[0] === null || this.state.errors[0] === '') && (this.state.errors[1] === null || this.state.errors[1] === '') &&
        (this.state.errors[2] === null || this.state.errors[2] === '')&& (this.state.errors[3] === null || this.state.errors[3] === '')
         && (this.state.errors[4] === null || this.state.errors[4] === '')) {
            if(this.props.location.state.addresUser){
                this.sendMail(this.props.match.params.price, this.props.location.state.addresUser.email ); //  gavindhollander
            } 
            else{
                this.sendMail(this.props.match.params.price, userData.email); //  gavindhollander
            }
        }
        else
         {
             
            
            alert("Er is een error.Check de velden opnieuw")
            this.setState({ notClicked: true })

        }


    }

    public handleChangeValidation = (e) => {
        
        this.setState({ fields: e.target.value});
        
    }




    // public async componentDidMount() {


    // }

    public render() {
        console.log(this.state.products)
        const cancel = ()  => {
            this.props.history.push({pathname:"/ShoppingCard", state: {}})

            
        }
        return (


            <div className="container">
                <div className="row justify-content-center mt-3">
                    <div className="col-md-12">
                        <h4 className="modal-title my-modal-label">Please enter your payment information below</h4>
                    </div>

                    <form name="paymentform" id="payment-form" onSubmit={this.contactSubmit} >


                        <div style={{ margin: 0, padding: 0 }} />


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
                                <label htmlFor='control-label' style={{ fontWeight: "bold" }} >Name on Card</label>
                                <input className='form-control' id = 'namecard'name='name' type='text' value={this.state.fields.name} onChange={this.handleNameCardChange} />
                                <span style={{ color: "red" }}>{this.state.errors[0]}</span>
                            </div>
                        </div>
                        <div className='form-row justify-content-center mb-3'>
                            <div className='col-md-18 form-group required'>
                                <label className='control-label' style={{ fontWeight: "bold" }}>Card Number</label>
                                <input className='form-control card-number' name='number' type='text' value={this.state.number} onChange={this.handleNumberCardChange} />
                                <span style={{ color: "red" }}>{this.state.errors[1]}</span>
                            </div>
                        </div>

                        <div className='form-row justify-content-center mt-3'>
                            <div className='col-xs-4 form-group cvc required' >
                                <label className='control-label' style={{ fontWeight: "bold" }}>CVC</label>
                                <span style={{ color: "red" }}>{this.state.errors[2]}</span>
                                <input className='form-control card-cvc' placeholder='ex. 311' type='text' name = 'cvc' value={this.state.fields.cvc} onChange={this.handleCvcChange}/></div>
                                
                            <div className='col-xs-7 form-group expiration required'>
                            
                                <label className='control-label' style={{ fontWeight: "bold" }}>Expiration</label>
                                <span style={{ color: "red" }}>{this.state.errors[3]}</span>
                                <input className='form-control card-expiry-month' placeholder='MM' size={2} type='text' name = 'month' value = {this.state.fields.month} onChange={this.handleMonthChange}/></div>

                            <div className='col-xs-4 form-group expiration required'>
                                <label className='control-label' style={{ fontWeight: "bold" }}>Date</label>
                                <span style={{ color: "red" }}>{this.state.errors[4]}</span>
                                <input className='form-control card-expiry-year' placeholder='YYYY' size={4} type='text' name= 'year' value={this.state.fields.year} onChange={this.handleYearChange} />
                                
                               
                                
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
                            <div className='row justify-content-center mt-3 mb-4 col-md-12 form-group'>
                                <button className='form-control btn btn-primary submit-button standard-button' disabled={!(this.props.userData && this.props.address && this.state.notClicked && this.state.products && this.state.nameValue && this.state.numberValue && this.state.cvcValue && this.state.monthValue && this.state.yearValue)} type='submit' id="pay"  >Pay »</button>
                               
                            </div>
                            <div className="mt-1" style={{textAlign:"center", paddingLeft:50, paddingRight:50}}>
                            <button style={{position: "relative", left: 100}}className=' btn btn-secondary btn-md' disabled={!(this.state.notClicked)}onClick={cancel} >Cancel bestelling</button>
                            </div>
                        </div>



                    </form>


                </div>
            </div>

        );
    }
    private RefreshShoppingCard = () => {
        const cookieInfo = this.cookie.get('ShoppingCard');

        if (this.state.items !== cookieInfo) {

            this.setState({ items: cookieInfo || undefined });
            this.UpdateItems(cookieInfo);
        }
    }
}

export default withRouter(connect(null, { postOrder: PostOrder })(Payment));
