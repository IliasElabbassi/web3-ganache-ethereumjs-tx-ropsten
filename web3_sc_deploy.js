// import
const Tx = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const Readline = require('readline');

// input
const rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// command line arguments
let argv = process.argv.slice(2);

if(argv.length === 3){
    const bc = argv[0];
    const account = argv[1];
    let pk = argv[2];

    if(pk[0] === '0' && pk[1] === 'x') {
        let temp = "";
        for (let i = 2; i < pk.length; i++) temp += pk[i];
        pk = temp;
    }
    pk = Buffer.from(pk, 'hex');

    rl.question('give data of the smart contract : \n', (data) => {
        let sm = data.trim();
        rl.close();
        deploySmartContract(bc, account, pk, sm);
    })
}else {
    rl.close();
    console.log("put in args the following : <the blockchain name> <account address> <private key of that account>")
}

function deploySmartContract(bc, acc, pk, sm) {
    console.log(" ------------- ");
    console.log(acc);
    console.log(pk);
    console.log(sm);

    let web3;

    switch (bc) {
        case 'ropsten':
            web3 = new Web3("https://ropsten.infura.io/v3/6891f5eb87b548a7b7f029e19aa407b8")
            break;

        case 'main':
            web3 = new Web3("https://mainnet.infura.io/v3/6891f5eb87b548a7b7f029e19aa407b8");
            break;

        case 'localhost':
            web3 = new Web3("http://localhost:8545");
            break;
    }

    web3.eth.getTransactionCount(acc , (err, transactionCount) => {

        // smart contract data
        // https://github.com/dappuniversity/dapp_token/blob/master/contracts/DappToken.sol
        // compiled in remix ethereum ide
        const data = sm;

        // create the transaction
        const transactionObject = {
            nonce: web3.utils.toHex(transactionCount),
            gasLimit: web3.utils.toHex(1000000),                                      // change the ges limit here
            gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),         // and the gas Price here
            data: data
        };

        //sign the transaction
        const tx = new Tx(transactionObject);
        tx.sign(pk);

        const  serializedTransaction = tx.serialize();
        const  raw = '0x'+serializedTransaction.toString('hex');

        // broadcast the transaction
        web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log('error ', err, 'here is the hash : ', txHash);
        });
    });
}