import React, { Component } from 'react'
import { CardHeader, CardFooter, CardBody, Container, TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Axios from 'axios'
import AppHeader from '../common/AppHeader'


class MainDetilInvestasi extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: '1',
            investasi: {}
        };
    }
    componentDidMount() {
        Axios.get(`https://nino-monggovest.herokuapp.com/v1/api/investment/${this.props.match.params.idInvestasi}`)
            .then(investasi => {
                this.setState({
                    investasi: investasi.data.data
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
        console.log(this.state.cardObject);
        const investasi = this.state.investasi
        return (
            <div>
                <AppHeader />
                <Container>
                    <div style={{margin:'70px 0 0 0'}}>
                        <Row>
                            <Col sm="6">
                                <Card>
                                    <CardHeader>Header</CardHeader>
                                    <CardBody>
                                        <CardTitle>Special Title Treatment</CardTitle>
                                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                        <Button>Go somewhere</Button>
                                    </CardBody>
                                    <CardFooter>Footer</CardFooter>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '1' })}
                                            onClick={() => { this.toggle('1'); }}
                                        >
                                            Tab1
                                    </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: this.state.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}
                                        >
                                            Moar Tabs
                                </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={this.state.activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col sm="12">
                                                <h4>Tab 1 Contents</h4>
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">

                                    </TabPane>
                                </TabContent>
                            </Col>

                        </Row>
                    </div>

                </Container>
            </div>
        );
    }
}

export default MainDetilInvestasi