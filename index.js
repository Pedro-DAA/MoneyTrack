const express = require("express");
const request = require('request');
var sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

let dataBase = new sqlite3.Database("moneyTrack.db");

let cmd = "SELECT name From sqlite_master WHERE type = 'table' AND name='moneyTrack'"
dataBase.get(cmd, function (err, val) {
    console.log(err, val);
    if (val == undefined) {
        console.log("No database file - creating one");
        createDB();
    } else {
        console.log(val);
        console.log("Database file found");
    }
});

function createDB(){
	const cmd = 'CREATE TABLE moneyTrack (category TEXT, money REAL)';
	dataBase.run(cmd, function(err, val) {
	  if (err) {
		console.log("Database creation failure",err.message);
	  } else {
		console.log("Created database");
	  }
	});
}

app.use(express.static("public"));
app.use(bodyParser.json()); 

app.listen(PORT, () => {
 console.log('Server running on port ${PORT}');
})

app.get('/', (req, res) => {
	response.sendFile("./public/index.html");
})

app.post('/upload', function(request,response){
	console.log("Recieved", request.body);
	let category = request.body.category;
	let money = request.body.money;
	let cmd = "INSERT INTO moneyTrack ( category, money) VALUES (?,?) ";
	dataBase.run(cmd,category,money,function(err){
		if (err) {
			console.log("DB insert error",err.message);
		} else {
			let allGood = "allGood";
			response.send(allGood);
		}
	})
});