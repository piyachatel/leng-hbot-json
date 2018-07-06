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
  message = '{"nodes":[{"node_type":"node","nodeResponse":{"type":"text","response":"Test inquiry data "}}]}';
  for (let key in req.query) {
    message += `${key}: ${req.query[key]}`
  }


  res.send(message);
})

/////////////////////////////////////////////////////////////////////////////////////////
app.get('/inquiry/emp', (req, res) => {

  console.log("/inquiry/emp => Inquiry");
  message = "Your data : Get method 1 2 3 4";

  // get walking directions from central park to the empire state building
  var http = require("https");
  //    url = "https://chat.pt.co.th/py/postjson";
  url = "https://chat.pt.co.th/py/postjson";

  //    url = "http://172.17.200.3/py/test_ora.py" ;

  console.log("URL ------------->%s\n", url);

  var buffer = 'This is test message test.',
    data,
    route;

  var request = http.get(url, function (response) {

    response.on("data", function (chunk) {
      buffer += chunk;
    });


    response.on("end", function (err) {
      // finished transferring data
      // dump the raw data
      //console.log("Start External API ------------->\n") ; 
      console.log("2.1 Result from API : ,%s" , buffer);
      //console.log("End--------------->\n");
    });


    let nodes = {
      "nodes": []
    };


    nodes["nodes"].push(nodeText(buffer));

    res.send(nodes);


    console.log('Finish!!!!!!!!');
    } )
  } ) ;

  ///////////////////////////////////////////////////////////////////////////////////////////////

  
  ///////////////////////////////////////////////////////////////////////////////


  ///////////////////////////////////////////////////////////////////////////////////////////////




  app.listen(PORT, () => console.log(`Listening on ${PORT}`))