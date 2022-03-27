import React from 'react';

import {Card, Table, Button, InputGroup, FormControl} from 'react-bootstrap';
import axios from 'axios';


const url = 'http://localhost:8080/login';
class RequestFormWithClass extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            tools: [],
            search: '',
            usersPerPage : 5,
            currentPage : 1,
            isLoading: true
        };
    }

    componentDidMount() {

        this.findUsers(this.state.currentPage);

    }
    findUsers(currentPage){
        currentPage -= 1;
        this.setState({isLoading:true});
        axios.get(url)
            .then(response => response.data)
            .then((data) =>{
                this.setState({tools: data,
                    isLoading: false,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number +1});
            });
    }

    searchChange = event =>{
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({"search": ''})
    }

    searchData = (currentPage) => {
        currentPage -= 1;
        axios.get(url+"/api/employee/get/"+this.state.search+"?page="+currentPage+"&size="+this.state.usersPerPage)
            .then(response => response.data)
            .then((data) =>{
                this.setState({
                    tools: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number +1
                });
            });
    };
    render() {
        const {tools, isLoading, search} = this.state;
        if(isLoading){
            return <p>Loading...</p>;
        }
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>Informacija apie instrumentą </Card.Header>
                <div style={{"float":"left"}}>

                </div>
                <div style={{"float":"right"}}>
                    <InputGroup>
                        <FormControl placeholder="Ieškoti" name="search" value={search} className={"bg-dark text-white"} onChange={this.searchChange}/>
                        <InputGroup.Append>
                            <Button variant="outline-info" type="button" onClick={this.searchData}>Find</Button>
                            <Button variant="outline-danger" type="button " onClick={this.cancelSearch}>Delete</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Vadybininkas</th>
                            <th>Darbuotojo vardas</th>
                            <th>Vieta</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tools.length === 0 ?
                            <tr align="center">
                                <td colSpan="3">Users</td>
                            </tr>:
                            tools.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.manager}</td>
                                    <td>{user.name}</td>
                                    <td>{user.object}</td>
                                    <td>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>

                    </Table>
                </Card.Body>
            </Card>
        );
    }
}


export default RequestFormWithClass;
