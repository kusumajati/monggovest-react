
import React from 'react';
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import CardInvestasi from '../common/CardInvestasi';
import Axios from 'axios'
import NumberFormat from 'react-number-format'
import {Link} from 'react-router-dom'
import {BackEndUrl} from '../config/BackEnd'


// import Style from '../assets/style'


export default class MainHomepage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            investment:[],
            investasiTerbaru: [],
            // baseUrl: 'http://localhost:5000',
            baseUrl: 'https://nino-monggovest.herokuapp.com'
        }

    }


    componentDidMount() {
        // Axios.get(`${this.state.baseUrl}/v1/api/investment_terbaru`)
        //     .then(investasi => {

        //         this.setState({
        //             investasiTerbaru:investasi.data.data
        //         })
                
        //         console.log(this.state.investasiTerbaru)
        //     }).catch(err => {
        //         console.log(err)
        //     })
        let newInvestments
        let investmentsArr = []
        Axios.get(`${BackEndUrl}/v1/api/allinvestments`)
        .then(investment=>{
            investment.data.data.map(investasi=>{
                if(investasi.isVerified){
                    investmentsArr.push(investasi)
                }
            })
            if(investmentsArr-6 < 0){
                newInvestments =  investmentsArr.slice(0, investmentsArr)

            }else{
                newInvestments = investmentsArr.slice(investmentsArr.length-6, investmentsArr.length)
            }
            this.setState({
                investasiTerbaru: newInvestments,
            })
        }).catch(err=>{
            console.log(err,'from axios get allinvestment')
        })
    }
    render() {
        const cards = this.state.investasiTerbaru.map(investasi => {
            
            return (
                    
                    <Col style={{padding:'0.5em', margin:'0'}} key={investasi._id} sm="2">
                        <CardInvestasi title={investasi.nama} gambar={investasi.gambar[0]} harga= {<NumberFormat value={investasi.nilaiInvestasi} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />} link={`/investasi/${investasi._id}`} returnHigh={investasi.returnHigh} returnLow={investasi.returnLow} periodeKontrak={investasi.periodeKontrak}/>
                    </Col>
            )
        })
        return (
            <div>
                <Container>
                    <h1 style={{ textAlign: 'center' }} className='my-5'>Langkah Mudah Berinvestasi</h1>
                    <div className="row">
                        <div className="col-sm-3 col-12" style={{ textAlign: 'center' }}>
                            <img src='https://res.cloudinary.com/ninocloudinary/image/upload/v1564132280/mgv/Screenshot_from_2019-07-26_16-08-13_chipm0.png' alt="" />
                            <br />
                            <p className='mt-4'>Pilih Instrumen Investasi</p>
                        </div>
                        <div className="col-sm-3 col-12" style={{ textAlign: 'center' }}>
                            <img src="https://res.cloudinary.com/ninocloudinary/image/upload/v1564131576/mgv/Screenshot_from_2019-07-26_15-58-07_swguq6.png" alt="" />
                            <br />
                            <p className='mt-4'>Lakukan Pembayaran</p>
                        </div>
                        <div className="col-sm-3 col-12" style={{ textAlign: 'center' }}>
                            <img src="https://res.cloudinary.com/ninocloudinary/image/upload/v1564132269/mgv/dslkjfj_z2asgf.png" alt="" />
                            <br />
                            <p className='mt-4'>Modal Sampai ke Peternak</p>
                        </div>
                        <div className="col-sm-3 col-12" style={{ textAlign: 'center' }}>
                            <img src="https://res.cloudinary.com/ninocloudinary/image/upload/v1564131576/mgv/Screenshot_from_2019-07-26_15-24-03_tfobn2.png" alt="" />
                            <br />
                            <p className='mt-4'>Tunggu Hasilnya</p>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col" style={{ textAlign: 'center', margin: '20px 0' }} >
                            <Link to='/investasi' role='button' className='btn btn-dark btn-lg'>Lihat Investasi</Link>
                        </div>
                    </div>
                    <Row >
                        {cards}
                    </Row>

                </Container>
            </div>
        )
    }
}