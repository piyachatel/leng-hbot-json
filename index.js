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
app.get('/inquiry/emp', (req, res) => {

  console.log("/inquiry/emp => Inquiry");
  message = "Your data : Get method 1 2 3 4";

  // get walking directions from central park to the empire state building
  var http = require("https");
  //    url = "https://chat.pt.co.th/py/postjson";
  url = "https://chat.pt.co.th/inquiry/emp";

  //    url = "http://172.17.200.3/py/test_ora.py" ;

  console.log("URL ------------->%s\n", url);

  var buffer = '',
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
      console.log("2.1 Result from API : ,%s", buffer);

      let nodes = {
        "nodes": []
      };


      nodes["nodes"].push(nodeText(buffer));

      res.send(nodes);
      //console.log("End--------------->\n");
    });





    console.log('Finish!!!!!!!!');
  })
});

app.post('/inquiry/emp', (req, res) => {

  message = '';
  for (let key in req.body) {
    message += `${key}: ${req.body[key]}`
  }

  fname = `${req.body["key1"]}` ;

  console.log("/inquiry/emp => Inquiry");
  console.log("post message => %s", message);


  // get walking directions from central park to the empire state building
  var http = require("https");
  //    url = "https://chat.pt.co.th/py/postjson";
  url = "https://chat.pt.co.th/inquiry/emp" ;

  //    url = "http://172.17.200.3/py/test_ora.py" ;

  console.log("URL ------------->%s\n", url);

  var buffer = '',
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
      console.log("2.1 Result from API : ,%s", buffer);

      let nodes = {
        "nodes": []
      };


      nodes["nodes"].push(nodeText(buffer));

      res.send(nodes);
      //console.log("End--------------->\n");
    });





    console.log('Finish!!!!!!!!');
  })
});
///////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////


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


app.listen(PORT, () => console.log(`Listening on ${PORT}`))