import React from 'react'
import { Card, Button, CardTitle, CardText, Row, Col, Container } from 'reactstrap'
import { Link } from "react-router-dom";



class CardInvestasi extends React.Component {

    render() {
        return (

            <Card body style={{ textAlign: "center" }}>
                <CardTitle><h5>{this.props.title}</h5></CardTitle>
                <img style={{ width: 'auto', height: '200px' }}
                    src={this.props.gambar} alt="" />
                <CardText>
                    {this.props.deskripsi}
                </CardText>
                <Button style={{display:'block'}}><Link className='text-white' to={this.props.link}>{this.props.buttonText}</Link></Button>
            </Card>
        )
    }
}

export default CardInvestasi