import React from 'react'
import AppHeader from '../common/AppHeader'
import AppFooter from '../common/AppFooter'
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, } from 'reactstrap'
import isLoggedIn from '../helper/isLoggedIn'
import isAdmin from '../helper/isAdmin'
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
            createdInvestments: []
        }

    }
    componentDidMount() {
        let investmentSorted = []
        console.log(this.props.match.params.userId)
        Axios.get(`${this.state.baseUrl}/v1/api/user/${this.props.match.params.userId}`)
            .then(user => {
                this.setState({
                    user: user.data.data
                })
                Axios.get(`${this.state.baseUrl}/allinvestment`)
                    .then(investment => {
                        investment.data.data.map(investasi => {
                            if (investasi.author._id === this.state.user._id) {
                                investmentSorted.push(investasi)
                            }
                        })
                        this.setState({
                            createdInvestments: investmentSorted
                        })
                        console.log(this.state.createdInvestments)
                    }).catch(err => {
                        console.log(err)
                        alert(err)
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
        // if(isLoggedIn()){
        //     return(
        //     <Redirect to='/' />
        //     )
        // }
        let profileCheck
        let riwayatCheck
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
        }
        let createdInvestments = this.state.createdInvestments.map(investasi => {
            return (

                <Col style={{ paddingTop: '1.5em' }} sm="3">
                    <CardInvestasi
                        title={investasi.nama} gambar={investasi.gambar[0]} harga={<NumberFormat value={investasi.nilaiInvestasi} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} link={`/investasi/${investasi._id}`} returnHigh={investasi.returnHigh} returnLow={investasi.returnLow} periodeBagiHasil={investasi.periodeBagiHasil} />
                </Col>
            )
        })
        return (
            <div>
                <AppHeader />
                <Container style={{ height: '100%' }}>
                    <br />
                    <Breadcrumb tag="nav" listTag="div">
                        <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                        <BreadcrumbItem tag="a" href={'/user/' + this.state.user._id}>{this.state.user.namaLengkap}</BreadcrumbItem>
                    </Breadcrumb>
                    <br />
                    <Row>
                        <Col sm='4'>
                            <ListGroup>
                                <ListGroupItem>
                                    <img style={{ margin: '0 10%', width: '80%' }} src={this.state.user.profilePicture} alt="" />
                                </ListGroupItem>
                                <ListGroupItem style={{textAlign:'center'}}><FontAwesomeIcon icon={faUser} />&ensp;{this.state.user.namaLengkap}</ListGroupItem>
                                <ListGroupItem style={{textAlign:'center'}}>Joined <TimeAgo date={this.state.user.created_at} /></ListGroupItem>
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
                                            Created Investment
            </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}
                                        >
                                            Joint Investment
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
                                        <Row>
                                        </Row>
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