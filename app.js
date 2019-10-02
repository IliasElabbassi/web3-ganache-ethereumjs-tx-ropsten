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

const makeTrans = async() => {
	try {

	} catch(err){
		console.log(err);
	}
}

getAllAcc();






