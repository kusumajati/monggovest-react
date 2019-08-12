import React from 'react'
import AppHeader from '../common/AppHeader'
import AppFooter from '../common/AppFooter'
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, } from 'reactstrap'
import isLoggedIn from '../helper/isLoggedIn'
import { Link, Redirect } from 'react-router-dom'
import Axios from 'axios'
import classnames from 'classnames';
import CardInvestasi from '../common/CardInvestasi'
import NumberFormat from 'react-number-format'
import TimeAgo from 'react-timeago'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


class UserShow extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // baseUrl: 'http://localhost:5000',
            baseUrl: 'https://nino-monggovest.herokuapp.com',
            user: {},
            activeTab: '1',
            createdInvestments: [],
            portfolio:[]
        }

    }
    componentDidMount() {

        let investmentSorted = []
        console.log(this.props.match.params.userId)
        Axios.get(`${this.state.baseUrl}/v1/api/user/${this.props.match.params.userId}`)
            .then(user => {
                Axios.get(`${this.state.baseUrl}/v1/api/portfolioUser/${this.props.match.params.userId}`).then(portfolio=>{
                    this.setState({
                        user: user.data.data,
                        bankTransfers: user.data.data.bankTransfers,
                        createdInvestments: user.data.data.authoredInvestments,
                        portfolio: portfolio.data.data
                    })
                })

            }).catch(err => {
                console.log(err)
                alert(err)
            })


    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        let profileCheck
        let riwayatCheck
        let riwayatContent
        let statusBayar
        let portfolio
        console.log(this.state.bankTransfers, 'ini state bankTransfers')
        if (isLoggedIn() && this.state.user._id === localStorage.getItem('USER_ID')) {
            
            profileCheck =
                <NavItem>
                    <NavLink
                        className={classnames({ active: this.state.activeTab === '3' })}
                        onClick={() => { this.toggle('3'); }}
                    >
                        Profile
</NavLink>
                </NavItem>
            riwayatCheck =
                <NavItem>
                    <NavLink
                        className={classnames({ active: this.state.activeTab === '4' })}
                        onClick={() => { this.toggle('4'); }}
                    >
                        Riwayat Transaksi
</NavLink>
                </NavItem>
            riwayatContent = this.state.bankTransfers.map(transfer => {
                if(transfer.isPaid){
                    statusBayar = <p style={{margin: '0'}}>Status: <strong style={{color:'green'}}>LUNAS</strong></p>

                }else{
                    statusBayar = <p style={{margin: '0'}}>Status: <strong style={{color:'red'}}>BELUM DIBAYAR</strong></p>
                }
                return(
                <ListGroupItem style={{fontSize:'0.9em', borderTop:'none', borderLeft:'none', borderRight:'none'}}>
                    <p style={{margin:'0'}}>Nama Pemilik Akun: {transfer.pemilikAkun} <img style={{width:'100px', display:'flex-box', float:'right'}} src={transfer.investment.gambar[0]} alt=""/></p>
                    <p style={{margin: '0'}}>Nomor Rekening: {transfer.noRek} - {transfer.namaBank}  </p>
                    <p style={{margin: '0'}}>Investasi: {transfer.investment.nama}</p>
                    <p style={{margin: '0'}}>Lot / Jumlah Transfer: {transfer.slot} Lot / <NumberFormat value={transfer.jumlahTransfer} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></p>
                    {statusBayar}
                    
                </ListGroupItem>
                )
            })


        }
        portfolio = this.state.portfolio.map(dataPortfolio=>{
            // console.log(dataPortfolio.investment.gambar)
            return(
                <Row style={{marginBottom:'1em', padding:'1em', borderBottom:'solid 0.5px #dee2e6'}}>
                <Col sm='4'>
                <Link  to={'/investasi/'+dataPortfolio.investment._id}>

                <img src={dataPortfolio.investment.gambar[0]} style={{width:'100%'}} alt=""/>
                </Link>

                </Col>

                <Col sm='3' >
                <Link style={{textDecoration:'none', color:'black'}}  to={'/investasi/'+dataPortfolio.investment._id}>
                        <p style={{margin:'0'}}>Nama Investasi</p>
                        <p style={{margin:'0'}}>Nilai Investasi</p>
                        <p style={{margin:'0'}}>Lot Dimiliki</p>
                        <p style={{margin:'0'}}>Nilai Lot</p>                      
                        <p style={{margin:'0'}}>Return</p>
                        <p style={{margin:'0'}}>Periode Kontrak</p>
                        </Link>
                </Col>
                <Col sm='5' >
                <Link style={{textDecoration:'none', color:'black'}}  to={'/investasi/'+dataPortfolio.investment._id}>

                <p style={{margin:'0'}}>: {dataPortfolio.investment.nama}</p>
                        <p style={{margin:'0'}}>: <NumberFormat value={dataPortfolio.investment.nilaiInvestasi} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></p>
                        <p style={{margin:'0'}}>: {dataPortfolio.slot} / {dataPortfolio.investment.jumlahSlot}</p>
                        <p style={{margin:'0'}}>: <NumberFormat value={dataPortfolio.slot * dataPortfolio.investment.hargaLot} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></p>                      
                        <p style={{margin:'0'}}>: {dataPortfolio.investment.returnLow} - {dataPortfolio.investment.returnHigh} %</p>
                        <p style={{margin:'0'}}>: {dataPortfolio.investment.periodeKontrak} Tahun</p>
                </Link>
                </Col>
            </Row>  
            )
        })
        let createdInvestments = this.state.createdInvestments.map(investasi => {
            return (

                <Col style={{ paddingTop: '1.5em' }} sm="3">
                    <CardInvestasi
                        title={investasi.nama} gambar={investasi.gambar[0]} harga={<NumberFormat value={investasi.nilaiInvestasi} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} link={`/investasi/${investasi._id}`} returnHigh={investasi.returnHigh} returnLow={investasi.returnLow} periodeKontrak={investasi.periodeKontrak} />
                </Col>
            )
        })
        return (
            <div>
                <AppHeader />
                <Container style={{ height: '100%' }}>
                    <br />
                    <Breadcrumb tag="nav" listTag="div">
                        <BreadcrumbItem tag="a" href="/">Beranda</BreadcrumbItem>
                        <BreadcrumbItem tag="a" href={'/user/' + this.state.user._id}>{this.state.user.namaLengkap}</BreadcrumbItem>
                    </Breadcrumb>
                    <br />
                    <Row>
                        <Col sm='4'>
                            <ListGroup>
                                <ListGroupItem>
                                    <Link to={'/user/' + this.state.user._id}><img style={{ margin: '0 10%', width: '80%' }} src={this.state.user.profilePicture} alt="" /></Link>
                                </ListGroupItem>
                                <ListGroupItem style={{ textAlign: 'center' }}><Link to={'/user/' + this.state.user._id} style={{textDecoration:'none', color:'black'}}><FontAwesomeIcon icon={faUser} />&ensp;{this.state.user.namaLengkap}</Link></ListGroupItem>
                                <ListGroupItem style={{ textAlign: 'center' }}>Joined <TimeAgo date={this.state.user.created_at} /></ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col sm='8'>
                            <div>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggle('1'); }}
                                        >
                                            Investasi
            </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}
                                        >
                                            Portfolio
            </NavLink>
                                    </NavItem>
                                    {profileCheck}
                                    {riwayatCheck}
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            {createdInvestments}
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        {portfolio}
                                    </TabPane>
                                    <TabPane tabId="3">
                                        <Row>
                                            <Col sm="3" style={{ margin: '1.5em 0 1.5em 1.5em' }}>


                                                <ListGroup >
                                                    <ListGroupItem style={{ border: 'none' }}>
                                                        Nama Lengkap
                                                        </ListGroupItem>
                                                    <ListGroupItem style={{ border: 'none' }}>No Identitas</ListGroupItem>
                                                    <ListGroupItem style={{ border: 'none' }}>Jenis Identitas</ListGroupItem>
                                                    <ListGroupItem style={{ border: 'none' }}>Alamat</ListGroupItem>
                                                    <ListGroupItem style={{ border: 'none' }}>Telepon</ListGroupItem>
                                                    <ListGroupItem style={{ border: 'none' }}>Pendapatan</ListGroupItem>
                                                    <ListGroupItem style={{ border: 'none' }}>Sumber Pendapatan</ListGroupItem>
                                                    <ListGroupItem style={{ border: 'none' }}><Link to={'/user/' + this.state.user._id + '/edit-form'}>Edit Profile</Link></ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                            <Col sm='8' style={{ margin: '1.5em 0' }}>
                                                <ListGroup >
                                                    <ListGroupItem style={{ border: 'none' }}>: &ensp;{this.state.user.namaLengkap}</ListGroupItem>
                                                    <ListGroupItem style={{ border: 'none' }}>: &ensp;{this.state.user.noIdentitas}</ListGroupItem>
                                                    <ListGroupItem style={{ border: 'none' }}>: &ensp;{this.state.user.jenisIdentitas}</ListGroupItem>
                                                    <ListGroupItem style={{ border: 'none' }}>: &ensp;{this.state.user.alamat}</ListGroupItem>
                                                    <ListGroupItem style={{ border: 'none' }}>: &ensp;{this.state.user.telepon}</ListGroupItem>
                                                    <ListGroupItem style={{ border: 'none' }}>: &ensp;{this.state.user.jumlahPenghasilan}</ListGroupItem>
                                                    <ListGroupItem style={{ border: 'none' }}>: &ensp;{this.state.user.sumberPenghasilan}</ListGroupItem>
                                                </ListGroup>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId='4'>
                                        <ListGroup>
                                            {riwayatContent}
                                        </ListGroup>
                                    </TabPane>
                                </TabContent>
                            </div>
                        </Col>
                    </Row>

                </Container>
                <br />
                <AppFooter />
            </div>
        )
    }
}


export default UserShow