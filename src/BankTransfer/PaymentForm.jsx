import React from 'react'
import isLoggedIn from '../helper/isLoggedIn'
import { Link, Redirect } from 'react-router-dom'
import Axios from 'axios'
import AppHeader from '../common/AppHeader'
import AppFooter from '../common/AppFooter'
import { Label, FormGroup, Input, Container, FormText, Button, Form, Col, Row } from 'reactstrap'
import NumberFormat from 'react-number-format'
import {BackEndUrl} from '../config/BackEnd'



class PaymentForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            noRek:'',
            pemilikAkun:'',
            namaBank:'',
            investasi: {},
            redirect: false,
            // baseUrl: 'http://localhost:5000',
            baseUrl: 'https://nino-monggovest.herokuapp.com'
        }
        this.bayar = this.bayar.bind(this)
        this.onChangeNoRek = this.onChangeNoRek.bind(this)
        this.onChangePemilikAkun = this.onChangePemilikAkun.bind(this)
        this.onChangeNamaBank = this.onChangeNamaBank.bind(this)
    }
    onChangeNoRek(event){
        this.setState({
            noRek: event.target.value
        })
    }
    onChangePemilikAkun(event){
        this.setState({
            pemilikAkun: event.target.value
        })
    }
    onChangeNamaBank(event){
        this.setState({
            namaBank: event.target.value
        })
    }
    bayar() {
        Axios.post(`${BackEndUrl}/v1/api/bank_transfer/${localStorage.getItem('investasiId')}`, {
            pemilikAkun: this.state.pemilikAkun,
            noRek: this.state.noRek,
            tambahSlot: localStorage.getItem('tambahSlot'),
            userId: localStorage.getItem('USER_ID'),
            investmentId: this.state.investasi._id,
            hargaLot: this.state.investasi.hargaLot,
            namaBank: this.state.namaBank
        }, { headers: { 'Authorization': localStorage.getItem('JWT_TOKEN') } }).then(posted => {
            Axios.put(`${this.state.baseUrl}/v1/api/user`, {
                bankTransferId: posted.data.data._id
            }, {headers:{'Authorization':localStorage.getItem('JWT_TOKEN')}})
            .then(()=>{
                this.setState({
                    redirect: true
                })
            }).catch(errUpdate=>{
                console.log(errUpdate)
            })
        }).catch(errPost=>{
            console.log(errPost)
        })
    }
    componentDidMount() {
        Axios.get(`${this.state.baseUrl}/v1/api/investment/${localStorage.getItem('investasiId')}`)
            .then(investasi => {
                this.setState({
                    investasi: investasi.data.data,

                })

            })
    }
    render() {
        if (this.state.redirect) {
            alert('silahkan selesaikan pembayaran!')
            return (
                <Redirect to='/' />
            )
        } else {
            return (
                <div style={{ height: '100%' }}>
                    <AppHeader />
                    <h2 style={{ textAlign: 'center', margin: '2em 0 2em 0' }}><span style={{ color: "rgba(0, 0, 0, 0.5)" }}>{localStorage.getItem('investasiNama')} - </span><span style={{ color: "rgba(0, 0, 0, 0.5)" }}>Perbarui Profile</span> <span>- Pembayaran</span></h2>
                    <Container style={{ height: '100%' }}>
                        <div style={{ margin: '0 0 0 0', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                            <Row>
                                <Col style={{ margin: '0 0 0 0', boxShadow: '1px 0 0 0 rgba(0, 0, 0, 0.2)', padding: '3em' }} sm='6'>
                                    <FormGroup>
                                        <Label for='metode'>Metode Pembayaran</Label>

                                        <Input
                                            type='select'
                                            name='metode'

                                        >
                                            <option>Bank Transfer</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='namaBank'>Nama Bank</Label>
                                        <Input
                                            name='namaBank'
                                            type='text'
                                            required
                                            onChange={this.onChangeNamaBank}
                                        >
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='noRek'>Nomor Rekening</Label>
                                        <Input
                                            name='noRek'
                                            type='text'
                                            required
                                            onChange={this.onChangeNoRek}
                                        >
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="pemilikAkun">Nama Pemilik Akun</Label>
                                        <Input
                                            name='pemilikAkun'
                                            type='text'
                                            required
                                            onChange={this.onChangePemilikAkun}
                                        >
                                        </Input>
                                    </FormGroup>


                                </Col>
                                <Col sm='6'>
                                    <h4 style={{ margin: '1.5em' }}>Rincian</h4>
                                    <div style={{ margin: '0  2em', fontSize: '1.2em' }}>
                                        {localStorage.getItem('investasiNama')} <span style={{ float: 'right' }}>{localStorage.getItem('tambahSlot')} Lot</span>
                                    </div>
                                    <div style={{ fontSize: '0.9em', margin: '0 3em', borderBottom: '2px solid rgba(0, 0, 0, 0.2)', paddingBottom: '0.5em' }}>
                                        <p style={{ margin: '0' }}>Periode Kontrak <span style={{ float: 'right' }}>{this.state.investasi.periodeKontrak} Tahun</span></p>
                                        <p style={{ margin: '0' }}>Return on Investment <span style={{ float: 'right' }}>{this.state.investasi.returnLow}-{this.state.investasi.returnHigh}%</span></p>
                                        <p style={{ margin: '0' }}>Periode Bagi Hasil <span style={{ float: 'right' }}>{this.state.investasi.periodeBagiHasil}x per Tahun</span></p>
                                    </div>
                                    <div>
                                        <p style={{ margin: '1.5em' }}>
                                            <span style={{ fontSize: '1.1em' }}>Total</span>
                                            <span style={{ float: 'right', fontSize: '1.8em' }}><NumberFormat value={localStorage.getItem('jumlahTransfer')} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></span>
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <Button onClick={this.bayar} style={{ width: '33%', margin: '3em 33% 0 33%' }} >Investasi Sekarang</Button>

                    </Container>
                    <br/>
                    <AppFooter />
                </div>
            )
        }
    }
}

export default PaymentForm