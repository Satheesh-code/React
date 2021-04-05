import React, { Component } from 'react'
import CompanyService from '../services/CompanyService'

class ListCompany extends Component {
    constructor(props) {
        super(props)

        this.state = {
                companies: []
        }
        this.addCompany = this.addCompany.bind(this);
        this.editCompany = this.editCompany.bind(this);
        this.deleteCompany = this.deleteCompany.bind(this);
    }

    deleteCompany(id){
        CompanyService.deleteCompany(id).then( res => {
            this.setState({companies: this.state.companies.filter(company => company.id !== id)});
        });
    }
    viewCompany(id){
        this.props.history.push(`/view-company/${id}`);
    }
    editCompany(id){
        this.props.history.push(`/add-company/${id}`);
    }

    componentDidMount(){
        CompanyService.getCompanies().then((res) => {
            this.setState({ companies: res.data});
        });
    }

    addCompany(){
        this.props.history.push('/add-company/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Companies List</h2>
                 <div className = "row">
                    <button className="btn btn-danger" onClick={this.addCompany}> Add Company</button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Company Name</th>
                                    <th> Company Address</th>
                                    <th> Company Email Id</th>
                                    <th> Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.companies.map(
                                        company => 
                                        <tr key = {company.id}>
                                             <td> { company.cmpName} </td>   
                                             <td> {company.cmpAddress}</td>
                                             <td> {company.emailId}</td>
                                             <td>
                                                 <button onClick={ () => this.editCompany(company.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCompany(company.id)} className="btn btn-danger">Delete </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewCompany(company.id)} className="btn btn-info">View </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListCompany