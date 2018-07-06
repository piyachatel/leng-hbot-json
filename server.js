const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');

const app = express();

var router = express.Router();
var request1 = require('request');

const PORT = process.env.PORT || 5000

app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/api/json', (req, res) => {
  message = "Your data : Post Method 1 2 3 4";
  for (let key in req.body) {
    message += `${key}: ${req.body[key]}`
  }

  let nodes = {
    "nodes": []
  };
  //nodes["nodes"].push(nodeText(message));

  res.send(nodes);
});

app.get('/inquiry/emp', (req, res) => {
  
  message = ''
  for (let key in req.query) {
    message += `${key}= ${req.query[key]}`
  }
  console.log("/inquiry/emp => Inquiry \n "); 
  console.log("get message => %s \n" , message); 
  
  fname = `${req.query["key1"]}` ; 

  var oracledb = require("oracledb");
  oracledb.getConnection({
      user : "stag",
      password : "stag4prd",
      connectString : "orastg"
   },
   function(err, connection){
   if (err) { 
      console.error(err); return; }

      sql = "SELECT first_name ,last_name , email , tel from IF_AP002_MAINTAIN_EMPLOYEE where first_name like '%"+ fname +"%' and inf_status = 'S' order by first_name " ; 
      console.error(sql); 
      connection.execute(sql,
   function(err, result){
   if (err) { 
      console.error(err); return; 
   }
      console.log(result.rows);

      res.send(result.rows);
   });
   });
  

  //res.send(message);
}) ;

app.get('/testora', (req, res) => {
var oracledb = require("oracledb");
oracledb.getConnection({
    user : "stag",
    password : "stag4prd",
    connectString : "orastg"
 },
 function(err, connection){
 if (err) { 
    console.error(err); return; }
    connection.execute("SELECT * from tab where tname like '%PR%' ",
 function(err, result){
 if (err) { 
    console.error(err); return; 
 }
    console.log(result.rows);
    res.send(result.rows);
 });
 });
}) ;
/////////////////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////////////////////////////////////

  
  ///////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////////////////////////////////////




  app.listen(PORT, () => console.log(`Listening on ${PORT}`))