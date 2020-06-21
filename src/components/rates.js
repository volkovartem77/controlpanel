import React, {Component} from 'react';
import Table from 'react-bootstrap/Table';
import axios from "axios";

const intervalUpdateInfo = 5000

const initData = [
    {
        "exchange": "Wazirx",
        "symbol": "XBT/USDT",
        "bid": 0.0,
        "ask": 0.0
    },
    {
        "exchange": "Wazirx",
        "symbol": "XBT/USDT",
        "bid": 0.0,
        "ask": 0.0
    }
];


function getKey() {
    return Math.random() * Math.random()
}


function getData(data) {
    return data.map(item => {
        return {
            exchange: item.exchange,
            symbol: item.symbol,
            bid: parseFloat(item.bid),
            ask: parseFloat(item.ask)
        }
    })
}

class Rates extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: getData(initData)
        }
    }

    updateTableData() {
        axios.get('/rates').then(response => {
            this.setState({data: getData(response.data['rates'])})
        });
    };

    componentDidMount() {
        this.interval = setInterval(() => this.updateTableData(), intervalUpdateInfo);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    renderRow() {
        return this.state.data.map(item => {
            return (
                <tr key={getKey()} style={{fontSize: 16}}>
                    <td key={getKey()} className="myCells">{item.exchange} </td>
                    <td key={getKey()} className="myCells">{item.symbol}</td>
                    <td key={getKey()} className="myCells" style={{color: '#00913d', fontSize: 14}}>{item.bid}</td>
                    <td key={getKey()} className="myCells" style={{color: '#c94040', fontSize: 14}}>{item.ask}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="myTable">
                <Table striped bordered hover variant="dark" size="sm">
                    <thead>
                    <tr key={getKey()}>
                        <th key={getKey()}>Exchange</th>
                        <th key={getKey()}>Symbol</th>
                        <th key={getKey()}>Bid</th>
                        <th key={getKey()}>Ask</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderRow()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

Rates.propTypes = {};

export default Rates;