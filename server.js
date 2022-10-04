var express = require('express');
var app = express();
var fs = require("fs");
const cors = require('cors');

app.get('/list-users', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      //console.log( data );
      res.end( data );
   });
})

//app.all('/', function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Methods", "*");    
//    res.header("Access-Control-Allow-Headers", "X-Requested-With");
//    next()
//});

app.use(express.json());

app.post('/add-user', function (req, res) {
    update_database (res, req);
});

function update_database(res, req) {
    filename = __dirname + "/" + "users.json";
    option = 'Utf8';

    name = req.body.name;
    password = req.body.password;
    profession = req.body.profession;
    
    fs.readFile (filename, option, function (err, data) {
	data = JSON.parse( data );
	
	var count = Object.keys(data).length;
	var index = "user" + (1 + count);
	var text = '{\"' + index + '\":' + '{' + '\"name\":\"' + name + '\", \"password\": \"' + password + '\", \"proffession\": \"' + profession + '\", \"id\": ' + (count+1) + '}' + '}';
	var new_user = JSON.parse(text);
	
	data[index] = new_user;

	var data_string = JSON.stringify(data, null, 2);
	fs.writeFile (filename, data_string, option, (err) => {
	    if (err)
		console.log ('error: cannot update database: ' + err);
	    else
		console.log ('success: updated database');
	});
	res.end( data_string );
    });
}    

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
