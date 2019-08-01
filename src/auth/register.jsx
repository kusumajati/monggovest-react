import React from 'react';
import store from 'store'
import { Label, FormGroup, Input, Container, Button, Form, Col } from 'reactstrap';
import isLoggedIn from '../helper/isLoggedIn'
import { Redirect } from 'react-router-dom'
import axios from "axios";
import AppHeader from '../common/AppHeader';
import AppFooter from '../common/AppFooter'


// axios.defaults.baseURL = 'http://localhost:5000'
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            email: '',
            namaLengkap: '',
            redirectToHome:false,
            baseUrl: 'http://localhost:5000',
            // baseUrl: 'https://nino-monggovest.herokuapp.com'

        }
        this.changePassword = this.changePassword.bind(this)
        this.changeEmail = this.changeEmail.bind(this)
        this.changeNamaLengkap = this.changeNamaLengkap.bind(this)
        this. signUpLogic = this.signUpLogic.bind(this)

    }

    changePassword(event) {
        console.log('pass',this.state.password)

        this.setState({
            password: event.target.value
        })
    }
    changeEmail(event) {
        console.log('email',this.state.email)
        this.setState({
            email: event.target.value
        })
    }
    changeNamaLengkap(event) {
        console.log('nama',this.state.namaLengkap)
        this.setState({
            namaLengkap: event.target.value
        })
    }
    signUpLogic(event) {

        event.preventDefault();

            axios
                .post(this.state.baseUrl+"/v1/api/user", {
                    email: this.state.email,
                    password: this.state.password,
                    namaLengkap: this.state.namaLengkap
                })
                .then((response) => {
                    store.set('loggedIn', true)
                    localStorage.setItem('JWT_TOKEN', response.data.token)
                    localStorage.setItem('USER_ID', response.data.data._id)
                    this.props.history.push('/');
                    alert('Anda berhasil mendaftar di Monggovest');

                })
                .catch(function (error) {
                    console.log("the error", error);
                    alert("error", error);
                });
            this.setState({
                email: "",
                password: ""
            })


    }
    render() {
            return (
                <div style={{height:'100%'}}>
                    <AppHeader />
                    <Container style={{ textAlign: 'center', height:'100%' }}>
                        <h2 style={{ margin: '30px' }}>SignUp</h2>
                        <Form onSubmit={this.signUpLogic} style={{ width: '400px', margin: 'auto' }}>
                            
                            <FormGroup row>
                                <Col sm='3' style={{ textAlign: 'left' }}><Label for='NamaLengkap'>Nama Lengkap: </Label></Col>
                                <Col sm='9'><Input name='namaLengkap' type='text' onChange={this.changeNamaLengkap} placeholder="nama lengkap" /></Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm='3' style={{ textAlign: 'left' }}><Label for='email'>Email: </Label></Col>
                                <Col sm='9'><Input name='email' type='text' onChange={this.changeEmail} placeholder="email" /></Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm='3' style={{ textAlign: 'left' }} ><Label for='password'>Password: </Label></Col>
                                <Col sm='9'><Input name='password' type='password' onChange={this.changePassword} placeholder="password" /></Col>
                            </FormGroup>


                            <Button>Submit</Button>
                        </Form>

                    </Container>
                <AppFooter />
                </div>
            );

    }
};

export default Register;

