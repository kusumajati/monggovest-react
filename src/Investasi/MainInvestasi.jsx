import React from 'react'
import CardInvestasi from '../common/CardInvestasi'
import Axios from 'axios'
import {
    Container,
    Row,
    Col
} from 'reactstrap';

class MainInvestasi extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            semuaInvestasi: []
        }
    }
    componentDidMount() {
        Axios.get('https://nino-monggovest.herokuapp.com/allinvestment')
            .then(dataSemuaInvestasi => {
                this.setState({
                    semuaInvestasi: dataSemuaInvestasi.data.data
                })

            }).catch(err => {
                console.log(err)
            })
    }
    render() {
        const cards = this.state.semuaInvestasi.map(investasi => {

            return (

                <Col key={investasi._id} sm="4">
                    <CardInvestasi
                        title={investasi.nama}
                        gambar={investasi.gambar[0]}
                        deskripsi={investasi.rincian}
                        link={`/investasi/${investasi._id}`}
                        buttonText={'Lihat Detail'}
                    />
                </Col>
            )
        })
        return (
            <div>
                <Container>
                <h2 style={{textAlign:'center', margin:'50px'}}>Investasi</h2>
                <Row>
                    {cards}
                </Row>
                </Container>
            </div>
        )
    }
}

export default MainInvestasi