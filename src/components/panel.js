import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'
import SymbolInfo from "./symbolInfo";
import axios from "axios";

const intervalUpdateInfo = 5000

function getKey() {
    return Math.random() * Math.random()
}

class Panel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            symbols: [
                {name: "INR", value: 0},
                {name: "BTC", value: 0},
                {name: "USDT", value: 0}]
        }
    }

    updatePanelInfo() {
        axios.post(this.props.url, {exchange: this.props.exchange}).then(response => {
            this.setState({symbols: response.data.symbols})
        });
    }

    componentDidMount() {
        this.interval = setInterval(() => this.updatePanelInfo(), intervalUpdateInfo);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <Card style={{ width: '12rem' }}>
                    <Card.Img variant="top" src={this.props.logo} />
                    <Card.Body>
                        {this.state.symbols.map(symbols =>
                            <SymbolInfo symbolName={symbols.name} symbolValue={symbols.value} key={getKey()}/>)}
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

Panel.propTypes = {};

export default Panel;