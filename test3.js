console.log("1") ; 
console.log("2 Starting Calling API : , %s",ExternalAPI("aaa") )  ; 
console.log("3") ; 
console.log("4") ; 


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
	
    return buffer;	
}); 

}