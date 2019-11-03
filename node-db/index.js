const mysql = require('mysql');
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var shell      = require('node-cmd');
var tcp        = require('tcp-proxy');
require('dotenv').config();

var pool = mysql.createPool({
    connectionLimit : 10, // default = 10
    host            : process.env.DB_HOST,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
});

var server = tcp.createServer({
  target: {
    host: '127.0.0.1',
    port: 8080
  }
});

server.listen(8081);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
	// gen new value and insert
	// let y;
	// y = Math.trunc(Math.random() * 20);
	// pool.query(`INSERT INTO data(x, y) SELECT max(x) + 1, ${y} FROM data;`, (err, res) => { console.log(err, res) });
	
	const query = `
		SELECT total_active_power as y, row2, date as x
		FROM sensorreadings
		WHERE row2 = ${pool.escape(req.query.panel)}
		ORDER BY date DESC
		LIMIT 560
	`;
	pool.query(query, (err, result) => {
		if (err) console.log(err);
		console.log(result);
	    res.send(result);
	})
    console.log('Something is happening.');
});


app.use('/', router);

app.listen(port);
console.log('Magic happens on port ' + port);
