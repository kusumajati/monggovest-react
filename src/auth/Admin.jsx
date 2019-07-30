import React from 'react'
import AppHeader from '../common/AppHeader'
import { Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Axios from 'axios';
import TimeAgo from 'react-timeago'
import {Link, Redirect} from 'react-router-dom'
import isLoggedIn from '../helper/isLoggedIn'
import NumberFormat from 'react-number-format'
import AppFooter from '../common/AppFooter';

class Admin extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1',
          verifikasiId:'',
          investment:[],
          author:'',
          user:{},
          // baseUrl: 'http://localhost:5000',
          baseUrl: 'https://nino-monggovest.herokuapp.com'
        };
        this.verifyInvestment = this.verifyInvestment.bind(this)
      }
      verifyInvestment(invId){
        Axios.get(`${this.state.baseUrl}/v1/api/investment/${invId}/verify`, {headers:{'Authorization':localStorage.getItem('JWT_TOKEN')}})
        .then(verified=>{
          alert('investasi berhasil di verifikasi')
          return(
            <Redirect to={this.state.baseUrl+'/v1/api/investment/'+invId} />
          )
        })
      }
      toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
      }
      componentDidMount(){
        let unVerified = []
        Axios.get(`${this.state.baseUrl}/v1/api/user/${localStorage.getItem('USER_ID')}`)
        .then(user=>{
          if(user.data.data.isAdmin === false){
            this.setState({
              redirect:true
            })
          }else{
          this.setState({
            user: user.data.data
          })
        }
          
          console.log(this.state.user.isAdmin, 'isAdmin')
          Axios.get(`${this.state.baseUrl}/allinvestment`)
          .then(investment=>{

                investment.data.data.map(investasi=>{

                  if(!investasi.isVerified){
                    unVerified.push(investasi)
                  }
                })
                this.setState({
                  investment: unVerified
                })
                console.log(unVerified)

          }).catch(err=>{
              alert(err)
              console.log(err)
          })
        })
         

      }
      render() {
        console.log(this.state.user.isAdmin, 'isAdmin')
        if(!isLoggedIn()|| this.state.redirect){
          return(
            <Redirect to='/login'/>
          )
        }
        let investment = this.state.investment.map(investment=>{
            return(
            
            <Row style={{marginBottom:'1em', padding:'1em', borderBottom:'solid 0.5px #dee2e6'}}>
                <Col sm='4'>
                <img src={investment.gambar[0]} style={{width:'100%'}} alt=""/>
                </Col>
                <Col sm='5' >
                    <h5><strong>{investment.nama}</strong></h5>
                    <p style={{fontSize:'0.9em', marginBottom:'0.2em'}}><em><NumberFormat value={investment.nilaiInvestasi} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></em></p>
                    <p  style={{fontSize:'0.8em', marginBottom:'0'}} ><em>Posted by {investment.author.namaLengkap} <TimeAgo date={investment.created_at} /></em></p>
                    <p style={{fontSize:'0.8em', marginBottom:'0'}} ><em>Last Updated <TimeAgo date={investment.created_at} /></em></p>
                    
                </Col>
                <Col sm='3' >
                    <Button onClick={()=>{this.verifyInvestment(investment._id)}} style={{margin:'5px'}}>Verifikasi</Button>
                    <Link to={'/investasi/'+investment._id}><Button style={{margin:'5px',  fontSize:'0.8em'}}>Lihat Detail</Button></Link>
                </Col>
                
            </Row>
            
            )
        })          

        return (
          <div>
              <AppHeader/>
              <Container style={{margin:"70px auto", width:'600px'}}>

            <Nav tabs >
              <NavItem style={{width:'50%'}} >
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}
                >
                  Investasi
                </NavLink>
              </NavItem>
              <NavItem style={{width:'50%'}}>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}
                >
                  Bank Transfer
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">

                    <div style={{padding:'20px 10px'}}>
                        {investment}
                    </div>

              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <Col sm="12">
                      <div></div>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
            </Container>
            <AppFooter/>
          </div>
        );
      }
}


export default Admin