import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import './css/dashboard.css'
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Panel from "./panel";
import logo_wazirx from '../img/logo_wazirx.png';
import logo_zebpay from '../img/logo_zebpay.png';
import logo_bitbns from '../img/logo_bitbns.png';
import logo_coindcx from '../img/logo_coindcx.png';
import Rates from "./rates";


class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: false,
            show_popup: false
        }

        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler() {
        axios.get(this.state.status?'/stop':'/start').then(response => {
            // console.log(response.data.status);
            this.setState({status: response.data.status});
            this.setState({show_popup: true});
            setTimeout(() => {
                this.setState({show_popup: false})
            }, 2000);
        })
    }

    render() {
        return (
            <div>
                <div className="Popup">
                    {this.state.show_popup?<Alert variant="success">{this.state.status?"Bot started":"Bot stopped"}</Alert>:null}
                </div>
                <Container>
                    <Row className="Header">
                        <Col sm={12}>
                            <h2>Dashboard</h2>
                        </Col>
                    </Row>
                    <Row className="Button">
                        <Col sm={12}>
                            <Button
                                className="runButton" variant={this.state.status?"danger":"primary"}
                                size="md" onClick={this.clickHandler}>{this.state.status?'Stop':'Run ►'}
                            </Button>
                        </Col>
                    </Row>
                    <Row className="subtitle"><Col sm={12}><h3>Rates</h3></Col></Row>
                    <Row>
                        <Col sm={12}>
                            <Rates />
                        </Col>
                    </Row>
                    <Row className="subtitle"><Col sm={12}><h3>Profit</h3></Col></Row>
                    <Row>
                        <Col sm={3}>
                            <Panel url="/profit" logo={logo_wazirx} exchange="wazirx"/>
                        </Col>
                        <Col sm={3}>
                            <Panel url="/profit"  logo={logo_zebpay} exchange="zebpay"/>
                        </Col>
                        <Col sm={3}>
                            <Panel url="/profit"  logo={logo_bitbns} exchange="bitbns"/>
                        </Col>
                        <Col sm={3}>
                            <Panel url="/profit"  logo={logo_coindcx} exchange="coindcx"/>
                        </Col>
                    </Row>
                    <Row className="subtitle"><Col sm={12}><h3>Balances</h3></Col></Row>
                    <Row>
                        <Col sm={3}>
                            <Panel url="/balances" logo={logo_wazirx} exchange="wazirx"/>
                        </Col>
                        <Col sm={3}>
                            <Panel url="/balances"  logo={logo_zebpay} exchange="zebpay"/>
                        </Col>
                        <Col sm={3}>
                            <Panel url="/balances"  logo={logo_bitbns} exchange="bitbns"/>
                        </Col>
                        <Col sm={3}>
                            <Panel url="/balances"  logo={logo_coindcx} exchange="coindcx"/>
                        </Col>
                    </Row>
                    <Row className="Footer">
                        <Col sm={12}>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Dashboard;