var web3 = new Web3('http://localhost:8545');

function printElement(e){
	for(var i = 0; i < e.length; i++){
		
		var a = "<tr>"
		var tr = document.createElement("tr");
		tr.setAttribute("id", "tr"+i)
		document.getElementById("tableBody").appendChild(tr);

		var trIndex = document.createElement("th");
		var trAdd = document.createElement("th");
		trIndex.innerHTML = i;
		trAdd.innerHTML = e[i];

		document.getElementById("tr"+i).appendChild(trIndex);
		document.getElementById("tr"+i).appendChild(trAdd);
	}
}

const getAllAcc = async () => {
    try {
        const myAccounts = await web3.eth.getAccounts().then( e => printElement(e) );
        return myAccounts;

    } catch (err) {
        console.log(err);
    }
}

function getAccountIndex(){
	if(document.getElementById("accountTable").style.display == "none"){
		getAllAcc();
		document.getElementById("accountTable").style.display = "inline";
		document.getElementById("displayBtn").style.display = "none";
	}
}

const getBalanceInfo = async () => {
	try{
		id = document.getElementById("accountIndex").value;
		if(id >= 0 && id != ""){
			const account = await web3.eth.getAccounts();

			balance = await web3.eth.getBalance(account[id]);

			document.getElementById("balance").innerHTML = "wei : " + balance;
			document.getElementById("balance").innerHTML += "<br> ether : " + web3.utils.toWei(balance, "ether");	
		}else{
			document.getElementById("balance").innerHTML = "insert value over or equal to 0";
		}
		
	}catch(err){
		console.log(err);
	}
}

const createAccount = async () => {
	try{
		account = await web3.eth.accounts.create();
		document.getElementById("account").innerHTML += "address : " + account.address+ "<br>";
		document.getElementById("account").innerHTML += "private key : " + account.privateKey+ "\n";
	}catch(err){ console.log(err)}
}

function hide(){
	document.getElementById('accountTable').style.display = 'none';
	document.getElementById('displayBtn').style.display = 'inline';
}



