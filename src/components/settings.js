import React, {Component} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import axios from "axios";
import './css/settings.css'

function getKey() {
    return Math.random() * Math.random()
}

class Settings extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: false,
            show_warning: false,
            minAmount: 0.01,
            minDiff: 0.01,
            type_symbol: "",
            symbols: ["BTC/USDT", "ETH/USDT"],
            wazirxApiKey: "",
            wazirxSecretKey: "",
            zebpayApiKey: "",
            zebpaySecretKey: "",
            bitbnsApiKey: "",
            bitbnsSecretKey: "",
            coindcxApiKey: "",
            coindcxSecretKey: ""
        }

        this.clickHandler = this.clickHandler.bind(this)
    }

    clickHandler() {
        axios.post('/save', this.state).then(response => {
            this.setState({show_warning: false});
            this.setState({status: response.data.status});
            setTimeout(() => {
                this.setState({status: false})
            }, 2000);
        })
    }

    changeSettings(param) {
        this.setState(param)
        this.setState({show_warning: true})
    }

    addSymbol() {
        let stateSymbols = Array.from(this.state.symbols);
        if (stateSymbols.includes(this.state.type_symbol)) {return}
        stateSymbols.push(this.state.type_symbol);
        this.setState({symbols: stateSymbols});
        this.setState({type_symbol: ""});
        this.setState({show_warning: true})
    }

    removeSymbol() {
        let stateSymbols = Array.from(this.state.symbols);
        stateSymbols = stateSymbols.filter(word => word !== this.state.type_symbol)
        this.setState({symbols: stateSymbols});
        this.setState({type_symbol: ""});
        this.setState({show_warning: true})
    }

    componentDidMount() {
        axios.get('/getSettings').then(response => {
            this.setState(response.data)
        });
    }

    render() {
        return (
            <div>
                <div className="Popup">
                    {this.state.status?<Alert variant="success">✔ settings saved</Alert>:null}
                </div>
                <div className="Popup">
                    {this.state.show_warning?<Alert variant="warning">Settings was changed, but not saved</Alert>:null}
                </div>
                <Container>
                    <Row className="Header">
                        <Col sm={12}>
                            <h2>Settings</h2>
                        </Col>
                    </Row>

                    <Row className="subtitle"><Col sm={12}><h3>Trading</h3></Col></Row>
                    <Row className="">
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Min Quantity</Form.Label>
                                    <Form.Control type="text" placeholder="Enter number" size="sm"
                                                  value={this.state.minAmount}
                                                  onChange={e => this.changeSettings({minAmount: e.target.value})}/>
                                    <Form.Text id="minQtyHelpBlock" muted>
                                        Use "." for decimals
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail2">
                                    <Form.Label>Min Diff</Form.Label>
                                    <Form.Control type="text" placeholder="Enter number" size="sm"
                                                  value={this.state.minDiff}
                                                  onChange={e => this.changeSettings({minDiff: e.target.value})}/>
                                    <Form.Text id="minDiffHelpBlock" muted>
                                        Use "." for decimals
                                    </Form.Text>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Row>

                    <Row className="subtitle"><Col sm={12}><h3>Symbols</h3></Col></Row>
                    <Row className="symbolBages">
                        <Col sm={9}>
                            {this.state.symbols.map(symbol =>
                                <Badge variant="secondary" className="symbolBage" key={getKey()}>{symbol}</Badge>)}
                        </Col>
                        <Col sm={3}>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Symbol</Form.Label>
                                    <Form.Control type="text" placeholder="Type symbol using '/'"
                                                  value={this.state.type_symbol}
                                                  onChange={e => this.setState({type_symbol: e.target.value})} />
                                </Form.Group>
                                <Button className="RemoveSymbolButton" variant="danger"
                                        onClick={this.removeSymbol.bind(this)}>Remove</Button>
                                <Button className="AddSymbolButton" variant="primary"
                                        onClick={this.addSymbol.bind(this)}>Add</Button>
                            </Form>
                        </Col>
                    </Row>

                    <Row className="subtitle"><Col sm={12}><h3>Exchanges</h3></Col></Row>
                    <Row className="rowSettingsForm">
                        <Col sm={6}>
                            <Form className="ApiSettingsForm">
                                <h3>Wazirx</h3>
                                <Form.Group controlId="formGridApiKey">
                                    <Form.Label>API Key</Form.Label>
                                    <Form.Control type="text" size="sm"
                                                  value={this.state.wazirxApiKey}
                                                  onChange={e => this.changeSettings({wazirxApiKey: e.target.value})}/>
                                </Form.Group>
                                <Form.Group controlId="formGridSecretKey">
                                    <Form.Label>Secret Key</Form.Label>
                                    <Form.Control type="text" size="sm"
                                                  value={this.state.wazirxSecretKey}
                                                  onChange={e => this.changeSettings({wazirxSecretKey: e.target.value})}/>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col sm={6}>
                            <Form className="ApiSettingsForm">
                                <h3>Zebpay</h3>
                                <Form.Group controlId="formGridApiKey">
                                    <Form.Label>API Key</Form.Label>
                                    <Form.Control type="text" size="sm"
                                                  value={this.state.zebpayApiKey}
                                                  onChange={e => this.changeSettings({zebpayApiKey: e.target.value})}/>
                                </Form.Group>
                                <Form.Group controlId="formGridSecretKey">
                                    <Form.Label>Secret Key</Form.Label>
                                    <Form.Control type="text" size="sm"
                                                  value={this.state.zebpaySecretKey}
                                                  onChange={e => this.changeSettings({zebpaySecretKey: e.target.value})}/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="rowSettingsForm">
                        <Col sm={6}>
                            <Form className="ApiSettingsForm">
                                <h3>Bitbns</h3>
                                <Form.Group controlId="formGridApiKey">
                                    <Form.Label>API Key</Form.Label>
                                    <Form.Control type="text" size="sm"
                                                  value={this.state.bitbnsApiKey}
                                                  onChange={e => this.changeSettings({bitbnsApiKey: e.target.value})}/>
                                </Form.Group>
                                <Form.Group controlId="formGridSecretKey">
                                    <Form.Label>Secret Key</Form.Label>
                                    <Form.Control type="text" size="sm"
                                                  value={this.state.bitbnsSecretKey}
                                                  onChange={e => this.changeSettings({bitbnsSecretKey: e.target.value})}/>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col sm={6}>
                            <Form className="ApiSettingsForm">
                                <h3>Coindcx</h3>
                                <Form.Group controlId="formGridApiKey">
                                    <Form.Label>API Key</Form.Label>
                                    <Form.Control type="text" size="sm"
                                                  value={this.state.coindcxApiKey}
                                                  onChange={e => this.changeSettings({coindcxApiKey: e.target.value})}/>
                                </Form.Group>
                                <Form.Group controlId="formGridSecretKey">
                                    <Form.Label>Secret Key</Form.Label>
                                    <Form.Control type="text" size="sm"
                                                  value={this.state.coindcxSecretKey}
                                                  onChange={e => this.changeSettings({coindcxSecretKey: e.target.value})}/>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="Button">
                        <Col sm={12}>
                            <Button variant="primary" size="md" onClick={this.clickHandler}>Apply</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Settings;