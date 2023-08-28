// import { Component, useState } from 'react'
// import Scanner from '../utils/Scanner';
// import { Fab, TextareaAutosize, Paper } from '@mui/material'
// import { ArrowBack } from '@mui/icons-material'
// import { Link, useNavigate } from "react-router-dom";
// import '../stylesheets/components.css'


// const navigateTo = useNavigate();
// const [user, setUser] = useState({
//     firstname: "", lastname: "", mobilenumber: "", email: "", password: ""
// });

// function BarcodeScanner() {
//     const [results, setResults] = useState([]);

//     const _scan = function () {
//         setResults({ scanning: !this.state.scanning })
//     }

//     const _onDetected = function (result) {
//         setResults({ results: [] })
//         setResults({ results: this.state.results.concat([result]) })
//         console.log(this.state.results[0].codeResult.code, "No data scanned");
//     }

//     const PostData = async (e) => {
//         e.preventDefault();

//         const { firstname, lastname, mobilenumber, email, password } = user;

//         const res = await fetch('/api/register', {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({
//                 firstname, lastname, mobilenumber, email, password
//             })
//         });

//         const data = await res.json();

//         if (data.status === 422 || !data) {
//             window.alert("Invalid Registration");
//         } else {
//             window.alert("Successful Registration")

//             navigateTo.push("/login")
//         }
//     }
//     return (
//         <div className='scannerMainDiv'>
//             <div className="scannerDiv">
//                 <Link to="/">
//                     <Fab style={{ marginRight: 10 }} color="secondary">
//                         <ArrowBack />
//                     </Fab>
//                 </Link>
//                 <span>Barcode Scanner</span>

//                 <Paper id='scannerPaper' variant="outlined" elevation={5} >
//                     <Scanner onDetected={_onDetected} />
//                 </Paper>
//                 <div className="scannerTextArea">
//                     <form method="post">
//                         <TextareaAutosize
//                             rowsMax={4}
//                             defaultValue={'No data scanned'}
//                             value={this.state.results[0] ? this.state.results[0].codeResult.code : 'No data scanned'}
//                         />
//                         <button type='submit' onClick={PostData} className='btn btn-primary'>See Product Details</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }


// export default BarcodeScanner

import React, { Component } from 'react';
import Quagga from 'quagga';

export default class Scanner extends Component {
    constructor(props) {
        super(props);
        this._onDetected = this._onDetected.bind(this);
    }

    componentDidMount() {
        Quagga.init(
            {
                inputStream: {
                    type: 'LiveStream',
                    constraints: {
                        width: 640,
                        height: 480,
                        facingMode: 'environment', // or user
                    },
                },
                locator: {
                    patchSize: 'medium',
                    halfSample: true,
                },
                numOfWorkers: 2,
                decoder: {
                    readers: ['upc_reader'],
                },
                locate: true,
            },
            function (err) {
                if (err) {
                    return console.log(err);
                }
                Quagga.start();
            }
        );
        Quagga.onDetected(this._onDetected);
    }

    componentWillUnmount() {
        Quagga.offDetected(this._onDetected);
    }

    _onDetected(result) {
        this.props.onDetected(result);
    }

    render() {
        return <div id="interactive" className="viewport" />;
    }
}