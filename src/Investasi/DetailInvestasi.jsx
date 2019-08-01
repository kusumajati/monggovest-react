import React, { Component, useCallback } from 'react'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    Modal, ModalHeader, ModalBody, ModalFooter, Input, ListGroup, ListGroupItem,
    CarouselCaption, Alert, Breadcrumb, BreadcrumbItem, CardHeader, CardFooter, CardBody, Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col
} from 'reactstrap';
import classnames from 'classnames';
import Axios from 'axios'
import AppHeader from '../common/AppHeader'
import isLoggedIn from '../helper/isLoggedIn';
import { Link, Redirect } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import AppFooter from '../common/AppFooter'
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css'
import NumberFormat from 'react-number-format'


class MainDetilInvestasi extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            modal: false,
            investors: [],
            activeTab: '1',
            investasi: {},
            author: {},
            gambarInvestasi: [],
            baseUrl: 'http://localhost:5000',
            // baseUrl: 'https://nino-monggovest.herokuapp.com',
            redirectToHome: false,
            redirectToEditProfile: false,
            activeIndex: 0,
            user: {},
            value: 1,
            items: []
        };
        this.verifyInv = this.verifyInv.bind(this)
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.investNext = this.investNext.bind(this)
        this.delete = this.delete.bind(this)
    }
    delete(){
        Axios.delete(`${this.state.baseUrl}/v1/api/investment/${this.props.match.params.idInvestasi}`,
        {headers:{'Authorization':localStorage.getItem('JWT_TOKEN')}}).then(()=>{
            alert('You have deleted an investment!')
            this.setState({
                redirectToHome: true
            })
        })
    }
    toggleModal() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    investNext() {
        localStorage.setItem('tambahSlot', this.state.value)
        localStorage.setItem('jumlahTransfer', this.state.investasi.hargaLot * this.state.value)
        localStorage.setItem('investasiId', this.state.investasi._id)
        localStorage.setItem('investasiNama', this.state.investasi.nama)
        this.setState({
            redirectToEditProfile: true
        })
    }
    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.state.gambarInvestasi.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.state.gambarInvestasi.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }

    verifyInv() {
        Axios.get(`${this.state.baseUrl}/v1/api/investment/${this.state.investasi._id}/verify`, {
            headers: {
                'Authorization': localStorage.getItem("JWT_TOKEN")
            }
        }).then(verified => {
            alert('investasi berhasil diverifikasi')
            console.log(verified)

            window.location.reload()
        }).catch(err => {
            alert(err)
            console.log(err)
        })
    }
    componentDidMount() {
        let gambarArr = []

        Axios.get(`${this.state.baseUrl}/v1/api/investment/${this.props.match.params.idInvestasi}`)
            .then(investasi => {
                investasi.data.data.gambar.map(gambar => {
                    gambarArr.push(gambar)
                })
                Axios.get(`${this.state.baseUrl}/v1/api/portfolioInvestment/${this.props.match.params.idInvestasi}`)
                    .then(investors => {
                        if (isLoggedIn()) {
                            Axios.get(`${this.state.baseUrl}/v1/api/user/${localStorage.getItem('USER_ID')}`)
                                .then(user => {
                                    if (!investasi.data.data.isVerified) {
                                        if (!user.data.data.isAdmin && investasi.data.data.author._id !== localStorage.getItem('USER_ID')) {
                                            this.setState({
                                                redirectToHome: true
                                            })
                                        } 
                                    }else {
                                        this.setState({
                                            user: user.data.data
                                        })
                                    }
                                }).catch(errUser => {
                                    console.log(errUser)
                                    alert(errUser)
                                })
                        } else if (!investasi.data.data.isVerified && investasi.data.data.author._id !== localStorage.getItem('USER_ID') || !investasi.data.data.isVerified && !isLoggedIn()) {
                            this.setState({

                                redirectToHome: true
                            })
                        }

                        this.setState({
                            investasi: investasi.data.data,
                            author: investasi.data.data.author,
                            gambarInvestasi: gambarArr,
                            investors: investors.data.data

                        })
                        console.log(this.state.investors, 'ini state')
                    })


            }).catch(err => {

                console.log(err)
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
        if (this.state.redirectToHome) {
            return (
                <Redirect to='/' />
            )
        } else if (this.state.redirectToEditProfile) {
            return (
                <Redirect to={'/user/' + localStorage.getItem('USER_ID') + '/edit-form-transfer'} />
            )
        } else {
            const slides = this.state.gambarInvestasi.map((item) => {
                return (
                    <CarouselItem
                        onExiting={this.onExiting}
                        onExited={this.onExited}
                        key={item._id}
                    >
                        <img style={{ width: '100%' }} src={item} alt={item.altText} />
                    </CarouselItem>
                );
            });
            const investasi = this.state.investasi
            const author = this.state.author
            let validAlert
            const closeBtn = <button className="close" onClick={this.toggleModal}>&times;</button>;
            let ifAdmin
            let editInvestasi
            let deleteInvestasi
            let investasiSekarang
            let investors
            console.log(this.state.user.isAdmin, 'is Admin')
            if (!investasi.isVerified) {
                if (isLoggedIn() && this.state.user.isAdmin) {
                    ifAdmin =
                        <Link style={{ display: 'inline' }} onClick={this.verifyInv}> Verifikasi</Link>

                }

                validAlert = <div>
                    <br />
                    <Alert style={{ textAlign: 'center' }} color="dark">
                        <em >Kami belum memverifikasi investment ini.</em>
                        {ifAdmin}
                    </Alert>
                </div>
                if (investasi.slot < 0) {
                    investasiSekarang =
                        <div></div>
                }
            } else {
                investasiSekarang =
                    <Button onClick={this.toggleModal} style={{ width: '33%', margin: '0 33%' }} >Investasi Sekarang</Button>

            }
            if (isLoggedIn() && this.state.user.isAdmin) {
                editInvestasi = <Link><ListGroupItem style={{ border: 'none' }}>Edit Investasi</ListGroupItem></Link>
                deleteInvestasi = <Link onClick={this.delete}><ListGroupItem style={{ border: 'none' }}>Delete Investasi</ListGroupItem></Link>

            }
            investors = this.state.investors.map(investor => {
                return (
                    <Row style={{ marginBottom: '1em', padding: '1em', borderBottom: 'solid 0.5px #dee2e6' }}>
                        <Col sm='3'>
                            <img src={investor.user.profilePicture} style={{ width: '100%' }} alt="" />
                        </Col>
                        <Col sm='3' >
                            <br/>
                            <p style={{ margin: '0' }}>Nama</p>
                            <p style={{ margin: '0' }}>Lot</p>
                            <p style={{ margin: '0' }}>Nilai Lot</p>
                        </Col>
                        <Col sm='6' >
                            <br/>
                            <p style={{ margin: '0' }}>: {investor.user.namaLengkap}</p>
                            <p style={{ margin: '0' }}>: {investor.slot} / {investasi.jumlahSlot}</p>
                            <p style={{ margin: '0' }}>: <NumberFormat value={investor.slot * investasi.hargaLot} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></p>
                        </Col>

                    </Row>
                )
            })
            return (

                <div>
                    <AppHeader />
                    <Container>
                        <div>
                            {validAlert}
                            <Breadcrumb style={{ margin: '2em 0 1em 0' }} tag="nav" listTag="div">
                                <BreadcrumbItem tag="a" href="/">Beranda</BreadcrumbItem>
                                <BreadcrumbItem tag="a" href="/investasi">Investasi</BreadcrumbItem>
                                <BreadcrumbItem active tag="span">{investasi.nama}</BreadcrumbItem>
                            </Breadcrumb>

                            <Row>
                                <Col sm="6">
                                    <Card>
                                        <CardHeader><strong>{investasi.nama}</strong></CardHeader>
                                        <Carousel
                                            activeIndex={this.state.activeIndex}
                                            next={this.next}
                                            previous={this.previous}
                                        >
                                            <CarouselIndicators items={this.state.items} activeIndex={this.state.activeIndex} onClickHandler={this.goToIndex} />
                                            {slides}
                                            <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                            <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                                        </Carousel>

                                        <CardFooter style={{ padding: "0.8em" }}>

                                            <p style={{ margin: '0' }} ><Link style={{ textDecoration: 'none', color: 'black' }} to={'/user/' + author._id}><img style={{ width: '30px', margin: '0 5px' }} src={author.profilePicture} alt="" />
                                                {author.namaLengkap}</Link>
                                                <em style={{ fontSize: '0.7em', display: 'inline-flex', float: "right" }} >Posted&ensp;<TimeAgo date={investasi.created_at} /></em>
                                            </p>
                                            <em style={{ margin: '0', float: 'right', display: 'inline-flex', fontSize: '0.7em' }} >Last Updated&ensp; <TimeAgo date={investasi.created_at} /></em>

                                        </CardFooter>
                                    </Card>
                                </Col>
                                <Col sm="6">
                                    <Nav tabs>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '1' })}
                                                onClick={() => { this.toggle('1'); }}
                                            >
                                                Ringkasan
                                    </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '2' })}
                                                onClick={() => { this.toggle('2'); }}
                                            >
                                                Rincian
                                </NavLink>
                                        </NavItem>
                                        <NavItem>
                                            <NavLink
                                                className={classnames({ active: this.state.activeTab === '3' })}
                                                onClick={() => { this.toggle('3'); }}
                                            >
                                                Investors
                                </NavLink>
                                        </NavItem>
                                    </Nav>
                                    <TabContent activeTab={this.state.activeTab}>
                                        <TabPane tabId="1">
                                            <Row style={{ fontSize: '.9em' }}>
                                                <Col sm="5" >


                                                    <ListGroup >
                                                        <ListGroupItem style={{ border: 'none' }}>
                                                            Nama Investasi
                                                        </ListGroupItem>
                                                        <ListGroupItem style={{ border: 'none' }}>Nilai Investasi</ListGroupItem>
                                                        <ListGroupItem style={{ border: 'none' }}>Harga Lot</ListGroupItem>
                                                        <ListGroupItem style={{ border: 'none' }}>Slot Tersedia</ListGroupItem>
                                                        <ListGroupItem style={{ border: 'none' }}>Return</ListGroupItem>
                                                        <ListGroupItem style={{ border: 'none' }}>Periode Kontrak</ListGroupItem>
                                                        <ListGroupItem style={{ border: 'none' }}>Periode Bagi Hasil</ListGroupItem>
                                                        <ListGroupItem style={{ border: 'none' }}>Resiko</ListGroupItem>
                                                        {editInvestasi}
                                                        {deleteInvestasi}
                                                    </ListGroup>
                                                </Col>
                                                <Col sm='7'>
                                                    <ListGroup >
                                                        <ListGroupItem style={{ border: 'none' }}>: &ensp;{investasi.nama}</ListGroupItem>
                                                        <ListGroupItem style={{ border: 'none' }}>: &ensp;<NumberFormat value={investasi.nilaiInvestasi} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></ListGroupItem>
                                                        <ListGroupItem style={{ border: 'none' }}>: &ensp;<NumberFormat value={investasi.hargaLot} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></ListGroupItem>
                                                        <ListGroupItem style={{ border: 'none' }}>: &ensp;{investasi.slot} / {investasi.jumlahSlot}</ListGroupItem>
                                                        <ListGroupItem style={{ border: 'none' }}>: &ensp;{investasi.returnLow} - {investasi.returnHigh} %</ListGroupItem>
                                                        <ListGroupItem style={{ border: 'none' }}>: &ensp;{investasi.periodeKontrak} Tahun</ListGroupItem>
                                                        <ListGroupItem style={{ border: 'none' }}>: &ensp;{investasi.periodeBagiHasil} per Tahun</ListGroupItem>
                                                        <ListGroupItem style={{ border: 'none' }}>: &ensp;{investasi.risiko}</ListGroupItem>
                                                    </ListGroup>
                                                </Col>
                                            </Row>
                                        </TabPane>
                                        <TabPane tabId="2">
                                            <p style={{ margin: '20px 30px' }}>{investasi.rincian}</p>
                                        </TabPane>
                                        <TabPane tabId="3">
                                            {investors}
                                        </TabPane>
                                    </TabContent>
                                </Col>

                            </Row>
                        </div>
                        <br />
                        <div>
                            {investasiSekarang}
                            <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                                <ModalHeader toggle={this.toggleModal} close={closeBtn}>Investasi</ModalHeader>
                                <ModalBody>
                                    <Container>
                                        <Row>
                                            <Col sm='6'>
                                                <div><span style={{ float: 'left' }}>Beli Slot: &ensp;</span></div>
                                                <Input style={{ display: 'flex', width: '30%' }}
                                                    readOnly
                                                    value={this.state.value}
                                                >
                                                </Input>
                                            </Col>
                                            <Col sm='6'>
                                                <div>

                                                    <Input style={{ display: 'flex', float: 'right', width: '30%' }}
                                                        readOnly
                                                        value={investasi.slot - this.state.value}
                                                    >
                                                    </Input>
                                                    <span style={{ float: "right" }}>Sisa Slot: &ensp;</span>

                                                </div>
                                            </Col>
                                        </Row>
                                        <br />
                                        <InputRange
                                            maxValue={investasi.slot}
                                            minValue={1}
                                            value={this.state.value}
                                            onChange={value => this.setState({ value })} />
                                        <br />
                                        <Row>
                                            <Col sm='6'>
                                                <div>
                                                    <span style={{ fontSize: '.8em' }}>Harga per slot:&ensp;<NumberFormat value={investasi.hargaLot} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></span>

                                                </div>
                                            </Col>
                                            <Col sm='6'>
                                                <div>
                                                    <span style={{ fontSize: '.8em', float: 'right' }}>Total harga:&ensp;<NumberFormat value={investasi.hargaLot * this.state.value} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></span>

                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.investNext}>Investasi</Button>{' '}
                                    <Button color="secondary" onClick={this.toggleModal}>Batalkan</Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                    </Container>
                    <br />
                    <AppFooter />
                </div>
            );
        }
    }
}

export default MainDetilInvestasi