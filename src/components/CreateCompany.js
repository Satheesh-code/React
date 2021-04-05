import React, { Component } from 'react'
import CompanyService from '../services/CompanyService';

class CreateCompany extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            cmpName: '',
            cmpAddress: '',
            emailId: ''
        }
        this.changeCmpNameHandler = this.changeCmpNameHandler.bind(this);
        this.changeCmpAddressHandler = this.changeCmpAddressHandler.bind(this);
        this.saveOrUpdateCompany = this.saveOrUpdateCompany.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            CompanyService.getCompanyById(this.state.id).then( (res) =>{
                let company = res.data;
                this.setState({cmpName: company.cmpName,
                    cmpAddress: company.cmpAddress,
                    emailId : company.emailId
                });
            });
        }        
    }
    saveOrUpdateCompany = (c) => {
        c.preventDefault();
        let company = {cmpName: this.state.cmpName, cmpAddress: this.state.cmpAddress, emailId: this.state.emailId};
        console.log('company => ' + JSON.stringify(company));

        // step 5
        if(this.state.id === '_add'){
            CompanyService.createCompany(company).then(res =>{
                this.props.history.push('/companies');
            });
        }else{
            CompanyService.updateCompany(company, this.state.id).then( res => {
                this.props.history.push('/companies');
            });
        }
    }
    
    changeCmpNameHandler= (event) => {
        this.setState({cmpName: event.target.value});
    }

    changeCmpAddressHandler= (event) => {
        this.setState({cmpAddress: event.target.value});
    }

    changeEmailHandler= (event) => {
        this.setState({emailId: event.target.value});
    }

    cancel(){
        this.props.history.push('/companies');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Company</h3>
        }else{
            return <h3 className="text-center">Update Company</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Company Name: </label>
                                            <input placeholder="Company Name" name="cmpName" className="form-control" 
                                                value={this.state.cmpName} onChange={this.changeCmpNameHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Company Address: </label>
                                            <input placeholder="Company Address" name="cmpAddress" className="form-control" 
                                                value={this.state.cmpAddress} onChange={this.changeCmpAddressHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateCompany}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateCompany