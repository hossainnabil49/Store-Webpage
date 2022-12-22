// add your server code here
//Server code 
var path = require('path')
const fs=require('fs');
const http = require("http") //need to http
const pug=require("pug");
const internal = require('stream');
const url = require("url") //to parse url strings
const ROOT_DIR = "html" //dir to serve static files from
const vendorsJson=[]
const renderHome=pug.compileFile('views/homepage.pug')
const express = require('express');
const { json } = require('express');
let app = express();
//variables used throughout server code

let count=0;
let idData=[];
currentVendor={};

let finalOrder={
  
    
  };
  let tempUrl;
  
  

//reads the JSON files inside the vendors folder and adds then to the vendorsJson array
filenames=fs.readdirSync('./vendors');
 for (let i=0;i<filenames.length;i++){
    let rawdata=fs.readFileSync('./vendors/'+filenames[i]);
    let data=JSON.parse(rawdata);
    vendorsJson[i]=data;
    
    idData[i]=data.id;
    count+=1;
    }

        
      

    app.set('view engine','pug');
    //loads in the static files in the view directory
    app.use(express.static('views'));
    
    app.use(express.json());
   //serves the homepage 
    app.get('/',function(req,res){
        let data=pug.renderFile('views/homepage.pug');
        res.statusCode=200;
        res.end(data);
    })
    //serves the vendors list page
    app.get('/vendors',function(req,res){
        console.log(idData);
        //res.format and does something different depending on the accept header
        res.format({
            "text/html": () =>{
                //renders the list.pug with the vendorsJSON object
                res.render('./List.pug', {vendors:vendorsJson});
            },
            "application/json":()=>{
                //sends an array of the vendors id
                res.json({"vendors":idData});
            }
            
        })
        
        res.end();
        
    })
    //route which serves addvendor page
    app.get('/add',function(req,res){
            let data=pug.renderFile('views/addvendor.pug')
            
            
            res.end((data));
    })
    
    //post route which receives the new vendor and adds it (and a unique id) to the vendorsJSON
    app.post('/vendors',function(req,res){
      
            //checks if any of the inputs are blank, if so sends error
            if(req.body.name==='' ||req.body.min===''||req.body.fee=='=' ){
                
                res.status(400).end();
                
                


            }
            
            else{
                //adds id to idData, and adds newVendor to vendorsJSON
           idData[Object.keys(vendorsJson).length]=Object.keys(vendorsJson).length;
            vendorsJson.push({id:Object.keys(vendorsJson).length,name:req.body.name,min_order:+req.body.min,delivery_fee:+req.body.fee,supplies:{}});
            
            
            console.log(vendorsJson);
            //sends vendorsJSON to add pug too help redirect user to new vendor 
            res.end(JSON.stringify(vendorsJson));
        
        }
       
        
        

    })
    //get route which either helps generate the order.pug file with the currentVendor in the url or sends over the currentVendor to script
    app.get('/vendors/:id',function(req,res){
        //grabs id of url then gets the currentVendor from that id
        tempUrl=req.params.id;
        Object.keys(vendorsJson).forEach(key => {
            if(vendorsJson[key].id==tempUrl)
            currentVendor=vendorsJson[key];


        })
        //res.format which either serves pug file with currentVendor or sends currentVendor to script depending on accept header
        res.format({
            "text/html": () =>{
                
                res.render('./order.pug', {currentVendor:currentVendor});
                
            },
            "application/json":()=>{
                res.json({"currentVendor":currentVendor});
            }
            
        })
         
       
       res.end();
          
            
    })
   
   //put route which updates the vendorsJSON with user input in client.js
    app.put('/vendors/:id',function(req,res){
        console.log(req.body)
        //goes through each key and checks id
        Object.keys(vendorsJson).forEach(key => {
            //if the id doesnt exists, send error
            if(vendorsJson[key].id!=req.body.id){
                res.status(400);

            }
            //else if vendorsJSON id equals currentVendor id then update the VendorsJson with the new currentVendor
            else if(vendorsJson[key].id==req.body.id){
            console.log("hi");
            vendorsJson[key]=req.body;
                
            }
        
        })
        console.log(vendorsJson);
        res.end();
    })
    app.listen(3000);
    console.log("Server Running at PORT 3000  CNTL-C to quit")
    console.log("To Test")
    console.log("http://localhost:3000/")




 

