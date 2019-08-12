import React from 'react'
import CardInvestasi from '../common/CardInvestasi'
import Axios from 'axios'
import {
    Container,
    Row,
    Col,
    Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import NumberFormat from 'react-number-format'

class MainInvestasi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            semuaInvestasi: [],
            semuaVerified: [],
            // baseUrl: 'http://localhost:5000',
            baseUrl: 'https://nino-monggovest.herokuapp.com'
        }
    }
    componentDidMount() {
        let semuaVerified = []
        Axios.get(this.state.baseUrl + '/v1/api/allinvestments')
            .then(dataSemuaInvestasi => {
                // console.log(dataSemuaInvestasi.data.data)
                dataSemuaInvestasi.data.data.map(investasi => {
                    if (investasi.isVerified) {
                        semuaVerified.push(investasi)
                    }
                })

                this.setState({
                    semuaVerified: semuaVerified
                })

            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        const cards = this.state.semuaVerified.map(investasi => {

            return (
                
                <Col style={{margin:'1em 0'}} key={investasi._id} sm="2">
                    <CardInvestasi
                        title={investasi.nama} gambar={investasi.gambar[0]} harga={<NumberFormat value={investasi.nilaiInvestasi} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} link={`/investasi/${investasi._id}`} returnHigh={investasi.returnHigh} returnLow={investasi.returnLow} periodePeriodeKontrak={investasi.periodeKontrak}
                    />
                </Col>
            )
        })
        return (
            <div>
                <Container style={{height:'100%'}}>
                <Breadcrumb tag="nav" listTag="div" style={{ margin: '2em 0 1em 0' }}>
                            <BreadcrumbItem tag="a" href="/">Beranda</BreadcrumbItem>
                            <BreadcrumbItem tag="a" href="/investasi">Investasi</BreadcrumbItem>
                        </Breadcrumb>
                    <Row>
                        {cards}
                    </Row>
                </Container>
            </div>
        )
    }
}

export default MainInvestasi