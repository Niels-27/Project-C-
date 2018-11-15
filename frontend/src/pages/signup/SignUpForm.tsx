import * as React from 'react';
import map from 'lodash/map';

class SignUpForm extends React.Component<any,any>{

    constructor(props: any) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            street: '',
            streetNumber: '',
            zipCode: '',
            city: '',
            country: '',
            timezone: '',
            opt: this.props.countryOps
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    public componentWillReceiveProps(nextProps) {
        this.setState({ opt: nextProps.countryOps });
        console.log(nextProps.countryOps);
    }

    public onChange(e){
        this.setState({[e.target.name]: e.target.value})
    }
    public onSubmit(e){
        e.preventDefault();
        console.log(this.state);
    }
    public render() {
        const options = map(this.state.opt, ('name'));
        return (
           <form onSubmit={this.onSubmit}>
           <div className="row mt-md-5 mb-md-3">
            <div className="col col-md-6">
               <h1 className="h1-responsive text-center text-md-left "><strong>Meld je nu aan!</strong></h1>
               </div>
            </div>
               <div className="row">
                <div className="col col-md-6" >
                    <div className="form-group">
                            <label className="control-label">Voornaam</label>
                            <input 
                                value={this.state.firstname}
                                onChange={this.onChange}
                                type="text"
                                name="firstname"
                                className="form-control"
                                />
                    </div>
                    <div className="form-group">
                            <label className="control-label">Achternaam</label>
                            <input 
                                value={this.state.lastname}
                                onChange={this.onChange}
                                type="text"
                                name="lastname"
                                className="form-control"
                                />
                    </div>
                    <div className="form-group">
                            <label className="control-label">Email</label>
                            <input 
                                value={this.state.email}
                                onChange={this.onChange}
                                type="text"
                                name="email"
                                className="form-control"
                                />
                    </div>
                    <div className="form-group">
                            <label className="control-label">Wachtwoord</label>
                            <input 
                                value={this.state.password}
                                onChange={this.onChange}
                                type="password"
                                name="password"
                                className="form-control"
                                />
                    </div>
                    <div className="form-group">
                            <label className="control-label">Herhaal wachtwoord</label>
                            <input 
                                value={this.state.passwordConfirmation}
                                onChange={this.onChange}
                                type="password"
                                name="passwordConfirmation"
                                className="form-control"
                                />
                    </div>
                </div>
                <div className="col col-md-6 ml-auto" >
                    <div className="form-group">
                            <label className="control-label">Straatnaam</label>
                            <input 
                                value={this.state.street}
                                onChange={this.onChange}
                                type="text"
                                name="street"
                                className="form-control"
                                />
                    </div>
                        <div className="form-group">
                            <label className="control-label">Huisnummer</label>
                            <input 
                                value={this.state.streetNumber}
                                onChange={this.onChange}
                                type="text"
                                name="streetNumber"
                                className="form-control"
                                />
                    </div>
                    <div className="form-group">
                            <label className="control-label">Postcode</label>
                            <input 
                                value={this.state.zipCode}
                                onChange={this.onChange}
                                type="text"
                                name="zipCode"
                                className="form-control"
                                />
                    </div> 
                    <div className="form-group">
                            <label className="control-label">Stad</label>
                            <input 
                                value={this.state.city}
                                onChange={this.onChange}
                                type="text"
                                name="city"
                                className="form-control"
                                />
                    </div>
                    <div className="form-group">
                            <label className="control-label">Land</label>
                            <select 
                                value={this.state.country}
                                onChange={this.onChange}
                                name="country"
                                className="form-control"
                                >
                                <option value="" disabled>Kies een land</option>
                                <option>{options}</option>
                            </select>
                    </div>

                    </div>
                </div>
  
                <div className="form-group mt-md-5">
                   <button type="button" className="btn btn-success btn-lg ">
                        <strong>Aanmelden</strong>
                    </button>
                </div>      
           </form>
        );
    }
}

export default SignUpForm;