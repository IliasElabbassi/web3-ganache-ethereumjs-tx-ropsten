# Web3

using :
  - web3.js
  - ganache
  - ethereumjs-tx
  - infura ropsten test blockchain

for transaction.js:
  - install nodejs
  - npm install -g ganache-cli (if you want to use a local test ethereum blockchain )
  - create dir
  - cd into dir
  - npm init
  - npm install web3
  - npm install ethereumjs-tx
  
  to run the code : node transaction.js
  
for web3_sc_deploy.js:
  - install nodejs
  - npm install -g ganache-cli (if you want to use a local test ethereum blockchain )
  - create dir
  - cd into dir
  - npm init
  - npm install web3
  - npm install ethereumjs-tx
  
  to run the code : node web3_sc_deploy.js [blockchain] [account address] [private key]
    [blockchain] : - ropsten
                   - main
                   - localhost (port 8545 by default)
    
    [account address] : the address of the account you are deploying with
    [private key] : the private key of this address
    
     info : you can change the gas limit, gas price and port directly in the code
