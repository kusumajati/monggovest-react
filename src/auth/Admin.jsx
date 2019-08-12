import React from 'react'
import AppHeader from '../common/AppHeader'
import { ListGroup,ListGroupItem,Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
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
          bankTransfers:[],
          // baseUrl: 'http://localhost:5000',
          
          baseUrl: 'https://nino-monggovest.herokuapp.com'
        };
        this.verifyInvestment = this.verifyInvestment.bind(this)
        this.verifyTransfer = this.verifyTransfer.bind(this)
      }
      verifyTransfer(trfId){
        Axios.get(`${this.state.baseUrl}/v1/api/bank_transfer/${trfId}/pay`, {headers:{'Authorization':localStorage.getItem('JWT_TOKEN')}})
        .then(paid=>{
          alert('bank transfer berhasil di verifikasi')
          window.location.reload()

        }).catch(err=>{
          console.log(err)
          alert(err)
        })
      }
      
      verifyInvestment(invId){
        Axios.get(`${this.state.baseUrl}/v1/api/investment/${invId}/verify`, {headers:{'Authorization':localStorage.getItem('JWT_TOKEN')}})
        .then(verified=>{
          alert('investasi berhasil di verifikasi')
          window.location.reload()

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
            Axios.get(`${this.state.baseUrl}/v1/api/allNotPaid`,
            {headers:{'Authorization':localStorage.getItem('JWT_TOKEN')}}).then(bankTransfers=>{
              Axios.get(`${this.state.baseUrl}/v1/api/unverifiedInvestments`)
              .then(investment=>{

                    this.setState({
                      
                      investment: investment.data.data,
                      user: user.data.data,
                      bankTransfers: bankTransfers.data.data
    
                    })
    
              })
            })

          }

        }).catch(err=>{
          alert(err)
          console.log(err)
      })
         

      }
      render() {
        if(!isLoggedIn()|| this.state.redirect){
          return(
            <Redirect to='/login'/>
          )
        }
        let investment = this.state.investment.map(data=>{
            return(
            
            <Row style={{marginBottom:'1em', padding:'1em', borderBottom:'solid 0.5px #dee2e6'}}>
                <Col sm='4'>
                <img src={data.gambar[0]} style={{width:'100%'}} alt=""/>
                </Col>
                <Col sm='5' >
                    <h5><strong>{data.nama}</strong></h5>
                    <p style={{fontSize:'0.9em', marginBottom:'0.2em'}}><em><NumberFormat value={data.nilaiInvestasi} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></em></p>
                    <p  style={{fontSize:'0.8em', marginBottom:'0'}} ><em>Posted by {data.author.namaLengkap} <TimeAgo date={data.created_at} /></em></p>
                    <p style={{fontSize:'0.8em', marginBottom:'0'}} ><em>Last Updated <TimeAgo date={data.created_at} /></em></p>
                    
                </Col>
                <Col sm='3' >
                    <Button onClick={()=>{this.verifyInvestment(data._id)}} style={{margin:'5px'}}>Verifikasi</Button>
                    <Link to={'/investasi/'+data._id}><Button style={{margin:'5px',  fontSize:'0.8em'}}>Lihat Detail</Button></Link>
                </Col>
                
            </Row>            
            )       
        })   
        
        let bankTransfers = this.state.bankTransfers.map(transfer=>{
          return(
            <Row style={{fontSize:'0.9em', borderBottom:'solid 0.5px #dee2e6', padding:'.3em'}}>
              <Col sm='2'>
              <p style={{margin: '0'}}><img style={{width:'100%', marginTop:'.5em'}} src={transfer.user.profilePicture} alt=""/><span>{transfer.user.namaLengkap}</span></p>

              </Col>
              <Col sm='7'>
           
                <p style={{margin:'0'}}>Nama Pemilik Akun: {transfer.pemilikAkun} </p>
                <p style={{margin: '0'}}>Nomor Rekening: {transfer.noRek} - {transfer.namaBank}  </p>
                <p style={{margin: '0'}}>Investasi: {transfer.investment.nama}</p>
                <p style={{margin: '0'}}>Lot / Jumlah Transfer: {transfer.slot} Lot / <NumberFormat value={transfer.jumlahTransfer} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></p>
                <p style={{margin: '0'}}><em>Created <TimeAgo date={transfer.created_at} /></em></p>
              </Col>
              <Col sm='3'>
              <img style={{width:'100%', display:'flex-box', float:'right'}} src={transfer.investment.gambar[0]} alt=""/>
              
              <Button onClick={()=>{this.verifyTransfer(transfer._id)}} style={{marginTop:'0.3em', width:'100%', fontSize:'.9em'}}>Verifikasi</Button> 
              </Col>
              
            </Row>

            )
        })

        return (
          <div style={{height:'100%'}}>
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
                  Bank Transfers
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent  activeTab={this.state.activeTab}>
              <TabPane tabId="1">

                    <div style={{padding:'20px 10px'}}>
                        {investment}
                    </div>

              </TabPane>
              <TabPane tabId="2" style={{paddingTop:'0.7em'}}>
                <Row>
                  <Col sm="12">
                        {bankTransfers}

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