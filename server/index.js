const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;
const SHA256 = require('crypto-js/sha256');


// localhost can have cross origin errors
// depending on the browser you use!
app.use(cors());
app.use(express.json());

/* replaced #1
const balances = {
  "1": 100,
  "2": 50,
  "3": 75,
}*/

const START_ACCOUNTS = 3;
const balances = {}; //replaces #1
const Ledger = require('./ledger');
const ledger = new Ledger();

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

console.log('==================');
console.log('AVAILABLE ACCOUNTS');
for (let i = 0; i < START_ACCOUNTS; i++) {
  const key = ec.genKeyPair();
  const privateKey = key.getPrivate().toString(16);
  const publicKey = key.getPublic().encode('hex');
  const address = '0x'+publicKey.slice(-40);
  console.log(`(${i})`);
  console.log(`Address : ${address}`);
  console.log(`Private Key : ${privateKey}`);

  // sets a random balance between 50 & 100
  const balance = Math.floor((Math.random() * 50) + 50);
  balances[address] = balance;
  console.log(`Balance : ${balance}`);

  //// Ledger class not needed for my challenge 1 solution
  //const newAccount = ledger.addAccount(publicKey, balance);
}
console.log('==================');
console.log('');


app.get('/balance/:address', (req, res) => {
  const {address} = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const {sender, signature, recipient, amount} = req.body
  const key1 = ec.keyFromPublic(sender, 'hex');
    if (key1.verify(msgHash.toString(), signature)) {
      balances[sender] -= amount;
      balances[recipient] = (balances[recipient] || 0) + +amount;
    }
  res.send({ balance: balances[sender] });
});


app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
