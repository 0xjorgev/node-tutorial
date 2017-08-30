var express = require('express')
var bodyParser = require('body-parser')
var app = express()

var data = [{
  "name":"Julio Verne, 20 mil leguas de viaje submarino"
  ,"subject":"Tutorial"
  ,"ISBN":1123456789
  ,"active":true
  ,"price":11.56
},
{
  "name":"Julio Verne, Viaje al centro de la tierra"
  ,"subject":"Tutorial"
  ,"ISBN":1123456744
  ,"active":true
  ,"price":9.56
}]

//Middleware
const allowCrossDomain = function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('origins','*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('X-Powered-By', 'Don Julio' )
	next();
};

app.use(allowCrossDomain);
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

//Request tipo GET
// Toda la data, ubicado en la raiz
// Retorna toda la data disponible en JSON
app.get('/', function(req, res){
  res.send(data)
})

//Request Tipo get
//Retorna toda la data
//En la ruta localhost:3001/books
app.get('/books', function(req, res){
  res.status(200).json({message: 'Success', code: 200, data: data})
})

//Request tipo Get
//Retorna solo la data con el mismo ISBN enviado
//En la ruta localhost:3001/books/1123456744
app.get('/books/:ISBN', function(req, res){

  var isbn = req.params.ISBN;
  console.log(isbn)
  res.send(json.filter( (elem, index, self) => elem.ISBN == isbn) )
})

app.put('/books/:ISBN', function(req, res){
  var isbn = req.params.ISBN;
  var price = req.body.price;

  var tmpBook = json.filter( (elem, index, self) => elem.ISBN == isbn)
  tmpBook[0].price = price
  res.send('Success!')
})

//Request tipo post
//Crea un nuevo book
app.post('/books', function(req, res){

  var tmpBook = {
    'name' : req.body.name
    ,'subject' : req.body.subject
    ,'ISBN' : req.body.ISBN
    ,'active' : req.body.active
    ,'price' : req.body.price
  }
  data.push(tmpBook)
  res.send(`Object count:${data.length}`)
})

app.listen(3001, function(){
  console.log('Running on port: 3001')
})
