import React from 'react';
import store from 'store'
import isLoggedIn from '../helper/isLoggedIn'
import { Label, FormGroup, Input, Container, Button, Form, Col } from 'reactstrap';

import { Redirect } from 'react-router-dom'
import axios from "axios";

axios.defaults.baseURL = 'https://nino-monggovest.herokuapp.com'
// axios.defaults.baseURL = 'http://localhost:5000'
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            email: '',
            namaLengkap: '',
            confirmPassword: ''

        }
        this.changePassword = this.changePassword.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.logInLogic = this.logInLogic.bind(this)

    }

    changePassword(event) {
        this.setState({
            password: event.target.value
        })
    }
    changeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }
    changeNamaLengkap(event) {
        this.setState({
            email: event.target.value
        })
    }
    changeConfirmPassword(event) {
        this.setState({
            email: event.target.value
        })
    }

    signUpLogic(event) {
        event.preventDefault();
        if (this.state.password === this.state.confirmPassword) {
            axios
                .post("/v1/api/user", {
                    email: this.state.email,
                    password: this.state.password,
                    namaLengkap: this.state.namaLengkap
                })
                .then((response) => {
                    console.log(response, "the response");

                    localStorage.setItem('JWT_TOKEN', response.data.token)
                    store.set('loggedIn', true);
                    this.props.history.push('/');
                    alert('Anda berhasil masuk. Selamat Datang di Monggovest');

                })
                .catch(function (error) {
                    console.log("the error", error);
                    alert("error", error);
                });
            this.setState({
                email: "",
                password: ""
            })

        } else {
            alert('Pastikan password anda benar!')
        }

    }
    render() {

        console.log(isLoggedIn())
        if (isLoggedIn()) {
            return (
                <Redirect to='/investasi' />
            )
        } else {

            return (
                <div>
                    <Container style={{ textAlign: 'center' }}>
                        <h2 style={{ margin: '30px' }}>SignUp</h2>
                        <Form style={{ width: '400px', margin: 'auto' }}>
                            <FormGroup row>
                                <Col sm='3' style={{ textAlign: 'left' }}><Label for='NamaLengka'>Email: </Label></Col>
                                <Col sm='9'><Input name='email' type='email' onChange={this.changeEmail} placeholder="email" /></Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm='3' style={{ textAlign: 'left' }}><Label for='email'>Email: </Label></Col>
                                <Col sm='9'><Input name='email' type='email' onChange={this.changeEmail} placeholder="email" /></Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm='3' style={{ textAlign: 'left' }} ><Label for='password'>Password: </Label></Col>
                                <Col sm='9'><Input name='password' type='password' onChange={this.changePassword} placeholder="password" /></Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm='3' style={{ textAlign: 'left' }} ><Label for='password'>Password: </Label></Col>
                                <Col sm='9'><Input name='password' type='password' onChange={this.changePassword} placeholder="password" /></Col>
                            </FormGroup>


                            <Button onClick={this.logInLogic}>Submit</Button>
                        </Form>

                    </Container>
                </div>
            );
        }
    }
};

export default Register;

