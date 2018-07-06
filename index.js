const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');

const app = express();

var router = express.Router();
var request1 = require('request');

var options = {
  host: 'http://172.16.200.3',
  port: '80',
  path: '/py/test.py',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
};



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
  nodes["nodes"].push(nodeText(message));

  res.send(nodes);
});

app.get('/api/json', (req, res) => {
  message = "Your data : Get method 1 2 3 4";
  for (let key in req.query) {
    message += `${key}: ${req.query[key]}`
  }

  let nodes = {
    "nodes": []
  };
  nodes["nodes"].push(nodeText(message));

  res.send(nodes);
})

/////////////////////////////////////////////////////////////////////////////////////////
app.get('/inquiry/emp', (req, res ) => {

  console.log("/inquiry/emp => Inquiry") ;
  message = "Your data : Get method 1 2 3 4";



/*

https://leng-chat2.herokuapp.com/sendapi

  for (let key in req.query) {
    message += `${key}: ${req.query[key]}`
  }
*/

  message = ExternalAPI("http://172.17.200.3/py/test_ora.py")  ; 
  console.log("\n++++++ %s \n" , message ) ;

 // ExternalAPI2("http://172.17.200.3/py/test_ora.py") ;
  
  let nodes = {
    "nodes": []
  };
  

  nodes["nodes"].push(nodeText(message));

  res.send(nodes);


console.log('Finish!!!!!!!!') ;
}) ;

///////////////////////////////////////////////////////////////////////////////////////////////

function ExternalAPI(url) {

// get walking directions from central park to the empire state building
var http = require("https");
//    url = "https://chat.pt.co.th/py/test_ora.py";
    url = "https://leng-chat2.herokuapp.com/";
//    url = "http://172.17.200.3/py/test_ora.py" ;

console.log("URL ------------->%s\n",url) ;

   var buffer = 'This is test message.', 
        data,
        route;

// get is a simple wrapper for request()
// which sets the http method to GET
var request = http.get(url, function (response) {
    // data is streamed in chunks from the server
    // so we have to handle the "data" event    
 
    response.on("data", function (chunk) {
        buffer += chunk;
    }); 


    response.on("end", function (err) {
        // finished transferring data
        // dump the raw data
		//console.log("Start External API ------------->\n") ; 
        //console.log(buffer);
        //console.log("End--------------->\n");
    });
	
	
}); 
  return buffer;
}


///////////////////////////////////////////////////////////////////////////////////////////////

function ExternalAPI2(url) {

const querystring = require('querystring');                                                                                                                                                                                                
const https = require('https');

var postData = querystring.stringify({
    'msg' : 'Hello World!'
});

var options = {
  hostname: 'leng-chat2.herokuapp.com',
  port: 443,
  path: '/sendapi',
  method: 'GET',
  headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       'Content-Length': postData.length
     }
};

var req = https.request(options, (res) => {
		console.log("Start External API2 =================>\n") ; 
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (e) => {
  console.error(e);
});

req.write(postData);
req.end();
}
///////////////////////////////////////////////////////////////////////////////////////////////
function nodeText(text) {
  const data = {
    "node_type": "node",
    "nodeResponse": {
      "type": "text",
      "response": text
    }
  }
  return data;
}

function nodeImage(image) {
  const data = {
    "node_type": "node",
    "nodeResponse": {
      "type": "image",
      "response": image
    }
  }
  return data;
}

function nodeAudio(audio) {
  const data = {
    "node_type": "node",
    "nodeResponse": {
      "type": "audio",
      "response": audio
    }
  }
  return data;
}

function nodeVideo(video) {
  const data = {
    "node_type": "node",
    "nodeResponse": {
      "type": "video",
      "response": video
    }
  }
  return data;
}

function nodeFile(file) {
  const data = {
    "node_type": "node",
    "nodeResponse": {
      "type": "file",
      "response": file
    }
  }
  return data;
}

function nodeCarouselSample() {
  const data = {
    "node_type": "carousel",
    "image_aspect_ratio": "horizontal",
    "nodeResponse": {
      "type": "carousel",
      "response": [{
        "title": "Title",
        "subtitle": "Subtitle",
        "image_url": "https://scontent.fbkk12-2.fna.fbcdn.net/v/t1.0-1/p50x50/24174158_745710642297764_706246064037500222_n.png?oh=612a0ee2f96704da402414ff351bc1f3&oe=5A98A944",
        "buttons": [{
          "title": "Open Google",
          "type": "web_url",
          "url": "https://www.google.com",
          "webview_height_ratio": "tall"
        }]
      }]
    }
  }
}


app.listen(PORT, () => console.log(`Listening on ${ PORT }`))