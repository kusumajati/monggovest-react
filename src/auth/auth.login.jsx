import React from 'react';
import store from 'store'
import isLoggedIn from '../helper/isLoggedIn'
import {  Label, FormGroup, Input, Container, Button, Form, Col } from 'reactstrap';
import AppHeader from '../common/AppHeader'
import { Redirect } from 'react-router-dom'
import axios from "axios";

axios.defaults.baseURL = 'https://nino-monggovest.herokuapp.com'
// axios.defaults.baseURL = 'http://localhost:8080'
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      email: ''

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

  logInLogic(event) {
    event.preventDefault();
    axios
      .post("/v1/api/user/login", {
        // .post("/api/login", {
        email: this.state.email,
        password: this.state.password
      })
      .then((response) => {
        console.log(response, "the response");

        localStorage.setItem('JWT_TOKEN', response.data.token)
        localStorage.setItem('USER_ID', response.data.data._id)
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
          <AppHeader />
          <Container style={{ textAlign: 'center' }}>
            <h2 style={{ margin: '30px' }}>Login</h2>
            <Form style={{ width: '400px', margin: 'auto' }}>
              <FormGroup row>
                <Col sm='3' style={{textAlign:'left'}}>
                <Label  for='email'>Email: </Label>
                </Col>
                <Col sm='9'>
                  <Input name='email' type='email' onChange={this.changeEmail} placeholder="email" />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm='3' style={{textAlign:'left'}} ><Label  for='password'>Password: </Label></Col>
                <Col sm='9'><Input name='password' type='password'onChange={this.changePassword} placeholder="password" /></Col>        
              </FormGroup>


              <Button onClick={this.logInLogic}>Submit</Button>
            </Form>

          </Container>
        </div>
      );
    }
  }
};

export default Login;

