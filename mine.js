const http = require('http');

function mine() {
    const postData = JSON.stringify({
        jsonrpc: '2.0',
        method: 'evm_mine',
        // method: 'anvil_reset',
        params: [],
        id: 1
    });

    const options = {
        hostname: '127.0.0.1',
        port: 8545,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        }
    };

    const req = http.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            console.log('Response:', data);
        });
    });

    req.on('error', (error) => {
        console.error('Error:', error);
    });

    req.write(postData);
    req.end();
}

mine(); // Call the mine function

//0xa606d968e0e1e9b83cf9d56c47073b0dfd0ecc23a26cf72e8f48d523436ba9cf