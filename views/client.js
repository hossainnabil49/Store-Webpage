let count=0;
let currentVendor={}
let updatedVendor={}
let arrayItems=[];
let newCategory=[];
//request which sends updated vendor to server
let req = new XMLHttpRequest();
req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			alert("Changes have been saved");
            
           
           
		}
	}
    //init function which retrieves the currentvendor from the server
function init(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            let data=JSON.parse(this.responseText);
            currentVendor=data.currentVendor;
            console.log(currentVendor);
        }
    }
    //get request to get currentVendor from server
    
    xhttp.open("GET", "/vendors/:id");
    xhttp.setRequestHeader("accept", "application/json");
    xhttp.send();


}
//addItem function which adds a new item to the updated vendor
function addItem(){
    let result="";
    //create newItem object and put all user inputs into newItem 
    
    let newItem={}
    newItem.name=document.getElementById("itmName").value;
    newItem.price=document.getElementById("itmPrice").value;
    newItem.stock=document.getElementById("itmStock").value;
    newItem.description=document.getElementById("itmDesc").value;
    
    
    //adds newItem to correct category in currentVendor
    //checks if item name is same as one in currentVendor, if so add a number beside it so they both have unique ids
    if(newItem.name in currentVendor.supplies[document.getElementById('category').value]){
        currentVendor.supplies[document.getElementById('category').value][newItem.name + count]=newItem;
        count++
    }
    

    else{
        //else add newItem to currentVendor
        currentVendor.supplies[document.getElementById('category').value][newItem.name]=newItem;
    }
    //adds newly added item to the clientside of the webpage 
    Object.keys(currentVendor.supplies).forEach(key => {
		result += `<b>${key}</b><a name="${key}"></a><br>`;
		
		Object.keys(currentVendor.supplies[key]).forEach(id => {
			item = currentVendor.supplies[key][id];
			result += `${item.name} (\$${item.price}, stock=${item.stock}, id=${id}) <br>`;
			result += item.description + "<br><br>";
		});
	});
    
    document.getElementById('middle').innerHTML=result;
    console.log(currentVendor);
    alert("Item added");
    
   
}
//function which adds new category to currentVendor
function addCategory(){
    let result=""
    let result2= '<select id="category">';
    //checks if category input is equal too any category inside currentVendor and returns DUPE if it does exist
    if(document.getElementById("categoryName").value in currentVendor.supplies){
        alert("DUPE");
    }
    else{
        //adds new category with no items 
    currentVendor.supplies[document.getElementById("categoryName").value]={};
    
    console.log(currentVendor);
    alert("Category added");
    //updates the clientside of the webpage with the new category (supply list and select menu)
    Object.keys(currentVendor.supplies).forEach(key => {
		result += `<b>${key}</b><a name="${key}"></a><br>`;
        result2 += `<option value="${key}">${key}</option>`
		
		Object.keys(currentVendor.supplies[key]).forEach(id => {
			item = currentVendor.supplies[key][id];
			result += `${item.name} (\$${item.price}, stock=${item.stock}, id=${id}) <br>`;
			result += item.description + "<br><br>";
           
		}); 
	});
    result2+="</select>";
    document.getElementById('middle').innerHTML=result;
    document.getElementById('category').innerHTML=result2;}
    
    
}
//function which adds more input to CurrentVendor and then uses a put request too update the vendorsJSON in the server
function submit(){
    
   //sets the name,min_order and delivery_fee to the inputs of the user
    currentVendor.name=document.getElementById('name').value;
    currentVendor.min_order=document.getElementById('min').value;
    currentVendor.delivery_fee=document.getElementById('fee').value;
	alert("Vendor saved");
    //reloads the url 
	location.reload();
	//Send a PUT request to the server with the currentVendor Data
	req.open("PUT", `/vendors/:id`);
	req.setRequestHeader("Content-Type", "application/json");
	req.send(JSON.stringify(currentVendor));
    
}