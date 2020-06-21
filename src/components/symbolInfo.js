import React, {Component} from 'react';
import {Col, Row} from "react-bootstrap";

class SymbolInfo extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col sm={6}>
                        <p>{this.props.symbolName}</p>
                    </Col>
                    <Col sm={6}>
                        <p><b>{this.props.symbolValue}</b></p>
                    </Col>
                </Row>
            </div>
        );
    }
}

SymbolInfo.propTypes = {};

export default SymbolInfo;