import React from 'react'
import isLoggedIn from '../helper/isLoggedIn'
import { Link, Redirect } from 'react-router-dom'
import Axios from 'axios'
import AppHeader from '../common/AppHeader'
import AppFooter from '../common/AppFooter'
import { Container, Button, Col, Row } from 'reactstrap'
import NumberFormat from 'react-number-format'



class PaymentForm extends React.Component{

    constructor(props){
        super(props)
        this.state={
            investasi:{},
            redirect:false,
            // baseUrl: 'http://localhost:5000',
            baseUrl: 'https://nino-monggovest.herokuapp.com'
        }
    }

    componentDidMount(){

    }
    render(){

        return(
            <div style={{height:'100%'}}>
                <AppHeader />
                <Container style={{height:'100%'}}>
                <div style={{ margin: '0 0 0 0', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}> 
                sdfdsfsf
                </div>

                </Container>
                
                <AppFooter />
            </div>
        )
    }
}

export default PaymentForm