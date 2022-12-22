let newVendor = {};
let count;
//function which sends over the input made by the user and adds the vendor to the vendorsJSON
function submit(){
	//creates object and stores all input info inside that object
	newVendor.name = document.getElementById("name").value;
	
	newVendor.fee = document.getElementById("fee").value;
	newVendor.min = document.getElementById("min").value;
	
	console.log(newVendor);
	//creates a request with the rollback which will redirect the user to the newly added vendor
	let req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			alert("new vendor added");
			
		}
	}
	
	
	//get request to redirect user
	req.open("GET",`/vendors`);
	req.send();
	//post request which sends new vendor data to server
	req.open("POST", `/vendors`);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(newVendor));
}