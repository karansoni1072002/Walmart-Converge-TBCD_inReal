const quagga = require("quagga");
var $ = require("jquery")

function order_by_occurrence(arr) {
    var counts = {};
    arr.forEach(function (value) {
        if (!counts[value]) {
            counts[value] = 0;
        }
        counts[value]++;
    });

    return Object.keys(counts).sort(function (curKey, nextKey) {
        return counts[curKey] < counts[nextKey];
    });
}

module.exports.barcodeScanner = (req, res) => {
    if (($('#barcode-scanner').length > 0 && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function')) {
        var last_result = [];
        if (quagga.initialized == undefined) {
            quagga.onDetected(function (result) {
                var last_code = result.codeResult.code;
                last_result.push(last_code);
                if (last_result.length > 20) {
                    code = order_by_occurrence(last_result)[0];
                    console.log('Code: ' + code);
                    last_result = [];
                    quagga.stop();
                    // TODO: Send the barcode to server for verification and send back response 

                }
            });
        }

        quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                numOfWorkers: navigator.hardwareConcurrency,
                target: document.querySelector('#barcode-scanner')
            },
            decoder: {
                readers: ['code_128_reader ', 'ean_reader', 'ean_8_reaer', 'code_39_reader', 'code_39_vin_reader', 'codabar_reader', 'upc_reader', 'upc_e_reader', 'i2of5_reader', '2of5_reader', 'code_93_reader']
            }
        }, function (err) {
            if (err) { console.log(err); return }
            quagga.initialized = true;
            console.log("Initialization finished. Ready to start");
            quagga.start();
        });
    }
}
// $(document).on('turbolinks: load', load_quagga);
