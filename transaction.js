let Tx = require('ethereumjs-tx').Transaction;

const Web3 = require('web3');

//let web3 = new Web3('https://ropsten.infura.io/v3/6891f5eb87b548a7b7f029e19aa407b8');
let web3 = new Web3('http://localhost:8545')

//const acc1 = '0x8Da4DfFC46975d757fB4CC2337278c9D758C03EC';
//const acc2 = '0xd6D0369Fe8A39C98EAF98fabE43eFD74D010C0b2';

const  acc1 = '0xa1FCd28a351D854B1e4fD379b14651e4f5B11053';
const  acc2 = '0xC875e049e29238fAc5E1A787D11D8dd9962C00Cb';

//const pk1 = Buffer.from(process.env.PRIVATE_KEY_1, 'hex');
//const pk2 = Buffer.from(process.env.PRIVATE_KEY_2, 'hex');


const pk1 = Buffer.from('6c3b212822bd885e5ac2d07f3853512a0743aa572bdeb0ca3552872b9b2183ad', 'hex');
const pk2 = Buffer.from('db00a16660cbcd0b33e21ef593a3649b262fd17f772f217b2fd1f5ce393ee8ed', 'hex');

web3.eth.getBalance(acc1, (err, bal) => {
   console.log(bal);
});
web3.eth.getBalance(acc2, (err, bal) => {
    console.log(bal);
});

// build -> sign -> broadcast (transaction)
web3.eth.getTransactionCount(acc1, (err, transCount) => {

    // build
    const transactionObject ={
        nonce: web3.utils.toHex(transCount),
        to:  acc2,
        value: web3.utils.toHex(web3.utils.toWei('10', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

     //sign

    const tx = new Tx(transactionObject, {chain: 'ropsten'});
    tx.sign(pk1);

    const serializedTransaction = tx.serialize();
    const raw = '0x' + serializedTransaction.toString('hex');

     // broadcast
    web3.eth.sendSignedTransaction(raw, (err, txhash) => {
        console.log('txhash '+ txhash);
    });
});
