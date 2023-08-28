import React, { Component, useEffect } from 'react';
import Scanner from './BarcodeScanner';
import Result from './result';
import axios from 'axios'

export default class ScannerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scanning: false,
            results: [],
        };
        this._scan = this._scan.bind(this);
        this._onDetected = this._onDetected.bind(this);
    }

    _scan() {
        this.setState({ scanning: !this.state.scanning });
    }

    _onDetected(result) {
        this.setState({ results: this.state.results.concat([result]) });
    }

    handleInputChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        const { results } = this.state;



        const barcode = {
            results
        };

        axios
            .post('/api/getproductdata', barcode)
            .then(() => console.log('Got Data'))
            .catch(err => {
                console.error(err);
            });
        // useEffect(() => {
        //     fetch('/api/getproductata', {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             result
        //         })
        //     })
        //         .then(
        //         //navigate
        //     )
        // }, [])
    };


    render() {
        return (
            <div>
                <form method='POST'>
                    <ul className="results">
                        {this.state.results.map(result => {
                            <Result key={result.codeResult.code} result={result} />;
                        })}
                    </ul>
                    {this.state.scanning ? <Scanner onDetected={this.state._onDetected} /> : null}
                    <button type='button' onClick={this._scan}>{this.state.scanning ? 'Stop' : 'Start'}</button>
                    <button type='submit' onClick={this.handleSubmit}>See Product Details</button>
                </form>
            </div>
        );
    }
}