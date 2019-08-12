import React from 'react'
import AppHeader from '../common/AppHeader'
import AppFooter from '../common/AppFooter'
import { Container, Row, Col, Breadcrumb, BreadcrumbItem, ListGroup, ListGroupItem, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, } from 'reactstrap'
import isLoggedIn from '../helper/isLoggedIn'
import { Link, Redirect } from 'react-router-dom'
import Axios from 'axios'
import NumberFormat from 'react-number-format'
import TimeAgo from 'react-timeago'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


class ShowBankTransfer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            // baseUrl: 'http://localhost:5000',
            baseUrl: 'https://nino-monggovest.herokuapp.com',
            user: {},
            activeTab: '1',
        }

    }
    componentDidMount() {

        Axios.get(`${this.state.baseUrl}/v1/api/bank_transfer/${this.props.match.params.bankTransferId}`)
        .then(bankTransfer=>{
                Axios.get(`${this.state.baseUrl}/v1/api/portfolioUser/${bankTransfer.data.data.user._id}`).then(portfolio=>{
                    this.setState({
                        user: bankTransfer.data.data.user,
                        bankTransfers: bankTransfer.data.data,
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
        return (
            <div>
                
            </div>
        )
    }
}


export default ShowBankTransfer